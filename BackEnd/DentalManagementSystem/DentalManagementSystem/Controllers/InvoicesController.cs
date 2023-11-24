using DentalManagementSystem.Data;
using DentalManagementSystem.Helpers;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class InvoicesController:ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InvoicesController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpGet("/Invoices")]
        public async Task<IActionResult> GetAll()
        {
            var invoices = await _context.Invoices.OrderByDescending(i => i.CreatedAt).Include(I => I.User).ToListAsync();
            if (!invoices.Any()) return BadRequest("there is no Invoices");
            return Ok(invoices);
        }

        [HttpGet("/Invoices/{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice is null) return BadRequest("Not Found this Invoice");
            return Ok(invoice);
        }


        [HttpPost("/Invoices")]
        public async Task<IActionResult> Add([FromBody]InvoicesVM invoicevm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Invoice Data");
            var invoice = new Invoice
            {
                CreatedAt = DateTime.Now,
                Invoice_No = invoicevm.Invoice_No,
                PaymentType = invoicevm.PaymentType,
                Status = invoicevm.Status,
                Total = invoicevm.Total,
                UserId = User.GetUserId()
            };
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
            return Created("/Invoices", invoice);
        }

        [HttpGet("/TotalIncome/Treatments")]
        public async Task<IActionResult> GetTotalIncomeFromTreatments()
        {
            var treatments = await _context.TreatmentPlans.Select(t => t.InvoiceNo).ToListAsync();
            var totalInvoices = await _context.Invoices.Where(i => treatments.Contains(i.Invoice_No)).ToListAsync();
            var response = new
            {
                Title = "Treatments",
                List = totalInvoices,
                Total = totalInvoices.Sum(i => i.Total)
            };
            return Ok(response);
        }

        [HttpGet("/invoices/{date1}&{date2}")]
        public async Task<IActionResult> GetDateToDate(DateTime date1, DateTime date2)
        {
            var invoices = await _context.Invoices.Where(p => p.CreatedAt >= date1 && p.CreatedAt <= date2).ToListAsync();
            if (!invoices.Any()) return BadRequest("No Invoices");
            return Ok(invoices);
        }


        [HttpGet("/Invoices/TotalIncome")]
        public async Task<IActionResult> GetTotalIncome()
        {
            var totalIncome = await _context.Invoices.SumAsync(x => x.Total);
            return Ok(totalIncome);
        }

        [HttpGet("/Invoices/Status")]
        public async Task<IActionResult> GetInvoicesWithStatus()
        {
            var invoices = await _context.Invoices.GroupBy(i => i.Status)
                .Select(g => new
                {
                    type = g.Key,
                    Quantity = g.Count()
                }).ToListAsync();
            if (!invoices.Any()) return BadRequest("NO invoices");
            return Ok(invoices);
        }

        [HttpPut("/Invoices/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]InvoicesVM invoicevm)
        {
            var targetInvoice = await _context.Invoices.FindAsync(id);
            if (targetInvoice is null) return BadRequest("Not Found This Invoice");
            if (!ModelState.IsValid) return BadRequest("Invalid invoice Data");
            targetInvoice.Status = invoicevm.Status;
            targetInvoice.PaymentType = invoicevm.PaymentType;
            targetInvoice.UserId = User.GetUserId();

            await _context.SaveChangesAsync();
            return NoContent();
        }

       

        [HttpDelete("/Invoices/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var targetInvoice = await _context.Invoices.FindAsync(id);
            if (targetInvoice is null) return BadRequest("Not Found this Invoice");
            if (!ModelState.IsValid) return BadRequest("Invalid Invoice Data");
            _context.Remove(targetInvoice);
            await _context.SaveChangesAsync();
            return Ok("Deleted Successfully");
        }
    }
}

using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
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
            var invoices = await _context.Invoices.OrderBy(I => I.Invoice_No).Include(I => I.User).ToListAsync();
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
                UserId = 5
            };
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
            return Created("/Invoices", invoice);
        }

        [HttpPut("/Invoices/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]InvoicesVM invoicevm)
        {
            var targetInvoice = await _context.Invoices.FindAsync(id);
            if (targetInvoice is null) return BadRequest("Not Found This Invoice");
            if (!ModelState.IsValid) return BadRequest("Invalid invoice Data");
            targetInvoice.Status = invoicevm.Status;
            targetInvoice.Invoice_No = invoicevm.Invoice_No;
            targetInvoice.PaymentType = invoicevm.PaymentType;
            targetInvoice.Total = invoicevm.Total;

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

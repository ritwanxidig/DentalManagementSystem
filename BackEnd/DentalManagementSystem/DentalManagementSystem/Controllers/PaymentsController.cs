using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class PaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentsController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var payments = await _context.Payments.OrderBy(p => p.InvoiceNo).ToListAsync();
            if (!payments.Any()) return BadRequest("No Payments");
            foreach (var payment in payments)
            {
                payment.CreatedAt = payment.CreatedAt.Date + payment.CreatedAt.TimeOfDay;
            }
            return Ok(payments);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]PaymentVM paymentvm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Data");
            var targetInvoice = await _context.Invoices.FirstOrDefaultAsync(i => i.Invoice_No == paymentvm.InvoiceNo);
            if (targetInvoice is null) return BadRequest("Ma Jiro Invoice!!!");
              var remaining = targetInvoice.Total - paymentvm.PaidAmount;
            if (remaining < 0)
            {
                remaining = 0;
                targetInvoice.Total = 0;
            }
            if(remaining > 0 ) targetInvoice.Total = remaining;
            if(remaining == 0)
            {
                targetInvoice.Status = "Paid";
            }


            _context.Invoices.Update(targetInvoice);
        
            var payment = new Payment
            {
                InvoiceNo = paymentvm.InvoiceNo,
                PaidAmount = paymentvm.PaidAmount,
                PaymentType = paymentvm.PaymentType,
                Remaining = remaining,
                CreatedAt = DateTime.Now
            };
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return Created("", payment);
        }


        [HttpGet("/Payments/{InvoiceNo}")]
        public async Task<IActionResult> GetWithInvoiceNo(string? invoiceNo)
        {
            var payments = await _context.Payments.Where(i => i.InvoiceNo == invoiceNo).ToListAsync();
            if (!payments.Any()) return BadRequest("No Payments for the selected payment");
            return Ok(payments);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var targetOne = await _context.Payments.FindAsync(id);
            if (targetOne is null) return BadRequest("Not found this payment");

            _context.Payments.Remove(targetOne);
            await _context.SaveChangesAsync();
            return Ok("Deleted Successfully");
        }
    }
}

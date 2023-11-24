using DentalManagementSystem.Data;
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
    //[Authorize]
    public class ServicesController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ServicesController(ApplicationDbContext context)
        {
            _context=context;
        }
        [HttpGet("/Services")]
        public async Task<IActionResult> GetAll()
        {
            var services = await _context.Services.OrderByDescending(s => s.CreatedAt).ToListAsync();
            if (!services.Any()) return BadRequest("There is no Services");
            return Ok(services);
        }

        [HttpGet("/Services/{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return BadRequest("Not found this service");
            return Ok(service);
        }

        [HttpGet("/Services/Quantity")]
        public async Task<IActionResult> GetSerivesWithEachQuantity()
        {
            var servicesQuantity = await _context.Services.Select(s => new
            {
                type = s.Name,
                Quantity = _context.TreatmentPlanService.Where(tps => tps.ServiceId == s.Id).Count()
            }).OrderByDescending(s => s.Quantity).Take(4).ToListAsync();



            if (!servicesQuantity.Any()) return BadRequest("No Services");
            return Ok(servicesQuantity);
        }

        [HttpPost("/Services")]
        public async Task<IActionResult> Add([FromBody]ServiceVM servicevm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Data");
            var service = new Service
            {
                Name = servicevm.Name,
                Description = servicevm.Description,
                Price = servicevm.Price,
                CreatedAt = DateTime.Now
            };
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return Created("/Services", service);
        }
        
        
        [HttpPut("/Services/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]ServiceVM servicevm)
        {
            var targetService = await _context.Services.FindAsync(id);
            if (targetService is null) return BadRequest("Not Found this Service");
            targetService.Description = servicevm.Description;
            targetService.Name = servicevm.Name;
            targetService.Price = servicevm.Price;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("/Services/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var targetService = await _context.Services.FindAsync(id);
            if (targetService is null) return BadRequest("Not Found this service");
            _context.Remove(targetService);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
        }
    }
}

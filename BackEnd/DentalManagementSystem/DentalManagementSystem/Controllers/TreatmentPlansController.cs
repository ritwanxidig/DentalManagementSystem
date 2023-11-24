using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TreatmentPlansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TreatmentPlansController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var treatmentPlans = await _context.TreatmentPlans
                .Include(tp => tp.TreatmentPlanServices)!.ThenInclude(tps => tps.Service)
                .OrderBy(tp => tp.Appointment!.AppointmentNumber)
                .Include(tp => tp.Appointment).ToListAsync();
            if (!treatmentPlans.Any()) return BadRequest("No Treatment Plans");
            return Ok(treatmentPlans);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            var treatmentPlan = await _context.TreatmentPlans.FindAsync(id);
            if (treatmentPlan is null) return BadRequest("Not Found this Treatment Plan");
            return Ok(treatmentPlan);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]TreatmentPlanVM treatmentPlanvm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Data");
            var treatmentPlan = new TreatmentPlan
            {
                AppointmentId = treatmentPlanvm.AppointmentId,
                TreatmentPlanServices = new List<TreatmentPlanService>(),
                InvoiceNo = treatmentPlanvm.InvoiceNo,
                CreatedAt = DateTime.Now,
            };
            if(treatmentPlanvm.Services is not null)
            {
                foreach (var service in treatmentPlanvm.Services)
                {
                    var treatmentPlanService = new TreatmentPlanService
                    {
                        ServiceId = service.Id,
                        Quantity = service.quantity
                        
                    };
                    treatmentPlan.TreatmentPlanServices.Add(treatmentPlanService);
                }
            }
            _context.TreatmentPlans.Add(treatmentPlan);
          
            await _context.SaveChangesAsync();
            return Created("/TreatmentPlans", treatmentPlan);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(int id, [FromBody]TreatmentPlanVM treatmentPlanvm)
        {
            var targetOne = await _context.TreatmentPlans.FindAsync(id);
            if (targetOne is null) return BadRequest("Not found this treatment");
            if (!ModelState.IsValid) return BadRequest("Invalid data");
            targetOne.AppointmentId = treatmentPlanvm.AppointmentId;
            targetOne.TreatmentPlanServices = new List<TreatmentPlanService>();
            if(treatmentPlanvm.Services is not null)
            {
                foreach (var service in treatmentPlanvm.Services)
                {
                    var treatmentPlanService = new TreatmentPlanService
                    {
                        Quantity = service.quantity,
                        ServiceId = service.Id
                    };
                    targetOne.TreatmentPlanServices.Add(treatmentPlanService);
                }
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var targetOne = await _context.TreatmentPlans.FindAsync(id);
            if (targetOne is null) return BadRequest("Not Found!!!");

            _context.TreatmentPlans.Remove(targetOne);
            await _context.SaveChangesAsync();
            return Ok("Deleted Successfully");
        }
    }
}

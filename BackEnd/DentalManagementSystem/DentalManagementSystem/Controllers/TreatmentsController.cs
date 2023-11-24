using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize]
    public class TreatmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TreatmentsController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var treatments = await _context.Treatments.Include(A => A.TreatmentPlan)
                .ThenInclude(A => A!.TreatmentPlanServices!).ThenInclude(tps => tps.Service)
                .OrderByDescending(x => x.CreatedAt).Include(t => t.TreatmentPlan)
                .ThenInclude(mps => mps!.Appointment).ThenInclude(a => a!.Doctor).ThenInclude(d => d!.User).OrderBy(x =>x.Id)
                .Include(t => t.Prescription).ThenInclude(p => p!.Patient).OrderByDescending(x => x.CreatedAt).ToListAsync();
            if (!treatments.Any()) return BadRequest("There is no Treatments");

            return Ok(treatments);
        }

        [HttpGet("{date1}&{date2}")]
        public async Task<IActionResult> GetDateToDate(DateTime date1, DateTime date2)
        {
            var treatments = await _context.Treatments.Include(A => A.TreatmentPlan)
                .ThenInclude(A => A!.TreatmentPlanServices!).ThenInclude(tps => tps.Service)
                .OrderByDescending(x => x.CreatedAt).Include(t => t.TreatmentPlan)
                .ThenInclude(mps => mps!.Appointment).ThenInclude(a => a!.Doctor).ThenInclude(d => d!.User).OrderBy(x => x.Id)
                .Include(t => t.Prescription).ThenInclude(p => p!.Patient).Where(t => t.CreatedAt >= date1 && t.CreatedAt <= date2).ToListAsync();
if (!treatments.Any()) return BadRequest("There is no Treatments");
            var response = treatments.Select(t => new
            {
                Doctor = t.TreatmentPlan!.Appointment!.Doctor!.User!.Name,
                Patient = t.TreatmentPlan!.Appointment!.Patient!.PatientName,
                PrescriptionCode = t.Prescription!.PrescriptionNumber,
                InvoiceNo = t.TreatmentPlan.InvoiceNo,
                TotalPrice = t.TreatmentPlan.TotalPrice,
                Date = t.CreatedAt
            });
            

            return Ok(response);
        }


        [AllowAnonymous]
        [HttpGet("TotalTreatments")]
        public async Task<IActionResult> GetTotalTreatments()
        {
            var totalTreatments = await _context.Treatments.CountAsync();
            return Ok(totalTreatments);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetAction(int id)
        {
            var treatment = await _context.Treatments.FindAsync(id);
            if (treatment == null) return BadRequest("Not Found this Treatment");
            return Ok(treatment);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] TreatmentVM treatmentvm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Treatment Data");
            var treatment = new Treatment
            {
                TreatmentPlanId = treatmentvm.TreatmentPlanId,
                ClinicalFeatures = treatmentvm.ClinicalFeatures,
                PrescriptionId = treatmentvm.PrescriptionId,
                Note = treatmentvm.Note,
                CreatedAt = DateTime.Now,
            };

            _context.Treatments.Add(treatment);
            await _context.SaveChangesAsync();
            return Created("/Treatments", treatment);
        }

        [HttpPut("/Treatments/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TreatmentVM treatmentvm)
        {
            var target = await _context.Treatments.FindAsync(id);
            if (target is null) return BadRequest("Not Found this Treatment");
            if (!ModelState.IsValid) return BadRequest("Invalid Treatment Data");
            target.ClinicalFeatures = treatmentvm.ClinicalFeatures;
            target.PrescriptionId = treatmentvm.PrescriptionId;
            target.Note = treatmentvm.Note;
            target.TreatmentPlanId = treatmentvm.TreatmentPlanId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("/Treatments/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var target = await _context.Treatments.FindAsync(id);
            if (target is null) return BadRequest("Not Found this Treatment");
            _context.Treatments.Remove(target);
            await _context.SaveChangesAsync();
            return Ok("Deleted Successfully");
        }
    }
}

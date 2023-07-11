using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TreatmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TreatmentsController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpGet("/Treatments")]
        public async Task<IActionResult> GetAll()
        {
            var treatments = await _context.Treatments.Include(A => A.Appointment).ThenInclude(A => A.Service).OrderBy(x => x.Id).Include(t => t.Appointment).ThenInclude(a => a.Patient).ToListAsync();
            if (!treatments.Any()) return BadRequest("There is no Treatments");
            return Ok(treatments);
        }

        [HttpGet("/Treatments/{id}")]
        public async Task<IActionResult> GetAction(int id)
        {
            var treatment = await _context.Treatments.FindAsync(id);
            if (treatment == null) return BadRequest("Not Found this Treatment");
            return Ok(treatment);
        }

        [HttpPost("/Treatments")]
        public async Task<IActionResult> Add([FromBody]TreatmentVM treatmentvm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Treatment Data");
            var treatment = new Treatment
            {
                AppointmentId = treatmentvm.AppointmentId,
                ClinicalFeatures = treatmentvm.ClinicalFeatures,
                Diagnosis = treatmentvm.Diagnosis,
                Note = treatmentvm.Note,
                CreatedAt = DateTime.Now

            };

            _context.Treatments.Add(treatment);
            await _context.SaveChangesAsync();
            return Created("/Treatments", treatment);
        }

        [HttpPut("/Treatments/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]TreatmentVM treatmentvm)
        {
            var target = await _context.Treatments.FindAsync(id);
            if (target is null) return BadRequest("Not Found this Treatment");
            if (!ModelState.IsValid) return BadRequest("Invalid Treatment Data");
            target.ClinicalFeatures = treatmentvm.ClinicalFeatures;
            target.Diagnosis = treatmentvm.Diagnosis;
            target.Note = treatmentvm.Note;
            target.AppointmentId = treatmentvm.AppointmentId;

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

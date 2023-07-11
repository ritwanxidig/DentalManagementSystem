using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Components.RouteAttribute;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PatientsController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpGet("/Patients")]
        public async Task<IActionResult> GetAll()
        {
            var patients = await _context.Patients.OrderBy(p => p.PatientName).ToListAsync();
            if (!patients.Any()) return BadRequest("there is no patients");
            return Ok(patients);
        }

        [HttpGet("/Patients/{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if(patient is not null)
            {
                return Ok(patient);
            }
            return BadRequest("Not Found This Patient");
        }


        [HttpPost("/Patients")]
        public async Task<IActionResult> Add([FromBody]PatientVM patientvm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Patient Data");
            var patient = new Patient
            {
                PatientName = patientvm.PatientName,
                Address = patientvm.Address,
                Age = patientvm.Age,
                CreatedAt = DateTime.Now,
                Description = patientvm.Description,
                Sex = patientvm.Sex,
            };
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return Created("/Patients", patient);
        }

        [HttpPut("/Patients/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]PatientVM patientvm)
        {
            var targetPatient = await _context.Patients.FindAsync(id);
            if (targetPatient is null) return BadRequest("Not found this patient to Update");
            if (!ModelState.IsValid) return BadRequest("Invalid Patient Data to Update");
            targetPatient.Address = patientvm.Address;
            targetPatient.Age = patientvm.Age;
            targetPatient.Description = patientvm.Description;
            targetPatient.Sex = patientvm.Sex;
            targetPatient.PatientName = patientvm.PatientName;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("/Patients/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var targetPatient = await _context.Patients.FindAsync(id);
            if (targetPatient is null) return BadRequest("Not found this patient");
            _context.Patients.Remove(targetPatient);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
        }
    }
}

using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Components.RouteAttribute;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize]
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
            var patients = await _context.Patients.
                OrderByDescending(p => p.CreatedAt)
                .Include(p => p.Appointments).ToListAsync();
            if (!patients.Any()) return BadRequest("there is no patients");
            return Ok(patients);
        }
        [AllowAnonymous]
        [HttpGet("Patients/TotalPatients")]
        public async Task<IActionResult> GetTotalPatients ()
        {
            var totalPatients = await _context.Patients.CountAsync();
            return Ok(totalPatients);
        }

        [HttpGet("/Patients/gender")]
        public async Task<IActionResult> GetPatientsWithGender()
        {
            var patients = await _context.Patients.GroupBy(p => p.Sex)
                  .Select(g => new
                  {
                      type = g.Key,
                      Quantity = g.Count()
                  }).ToListAsync();

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

        [HttpGet("/patients/{date1}&{date2}")]
        public async Task<IActionResult> GetDateToDate(DateTime date1, DateTime date2)
        {
            var patients = await _context.Patients
                .Include(p => p.Appointments)
                .Where(p => p.CreatedAt >= date1 && p.CreatedAt <= date2)
                .OrderByDescending(p => p.CreatedAt).ToListAsync();
            if (!patients.Any()) return BadRequest("No patients");
            var response = patients.Select(p => new
            {
                Name = p.PatientName,
                Age = p.Age,
                Sex = p.Sex,
                Appointments = p.Appointments!.Count(),
                Date = p.CreatedAt
            });
            return Ok(response);
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
                PhoneNo = patientvm.Phone_No
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
            targetPatient.PhoneNo = patientvm.Phone_No;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("/Patients/ChangeDescription/{id}")]
        public async Task<IActionResult> ChangeDescription(int id, [FromBody]ModifiedPatientVM modifiedPatientVM)
        {
            var targetPatient = await _context.Patients.FindAsync(id);
            if (targetPatient is null) return BadRequest("Not Found this patient");
            if (!ModelState.IsValid) return BadRequest("Invalid Data");
            targetPatient.Description = targetPatient.Description + modifiedPatientVM.CheifComplient;

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

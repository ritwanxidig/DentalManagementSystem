using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    public class PrescriptionsController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PrescriptionsController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var prescriptions = await _context.Prescriptions.Include(p => p.MedicinePrescriptions!)
                .ThenInclude(mp => mp.Medicine).OrderByDescending(p => p.CreatedAt)
                .Include(p => p.Patient).ToListAsync();
            if (!prescriptions.Any()) return BadRequest("Not Found any prescriptions");
            return Ok(prescriptions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            var targetOne = await _context.Prescriptions.FindAsync(id);
            if (targetOne is null) return BadRequest("Not Found !!!");
            return Ok(targetOne);
        }

        [HttpGet("/Prescriptions/Patients/{PatientId}")]
        public async Task<IActionResult> GetWithPatientId(int PatientId)
        {
            var targetPrescriptions = await _context.Prescriptions
                .Where(p => p.PatientId == PatientId)
                .OrderByDescending(p => p.CreatedAt).ToListAsync();
            if (!targetPrescriptions.Any()) return BadRequest("Not Found !!!");
            return Ok(targetPrescriptions);
        }

        [HttpGet("/Prescriptions/{date1}&{date2}")]
        public async Task<IActionResult> GetDateToDate(DateTime date1, DateTime date2)
        {
            var prescriptions = await _context.Prescriptions
                .Where(p => p.CreatedAt >= date1 && p.CreatedAt <= date2)
                .Include(p => p.Patient)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
            if (!prescriptions.Any()) return BadRequest("No Prescriptions");
            var response = prescriptions.Select(p => new
            {
                Code = p.PrescriptionNumber,
                Patient = p.Patient!.PatientName,
                Duration = p.Duration,
                Date = p.CreatedAt,
                Instructions = p.Instructions
            });
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]PrescriptionVM prescriptionVM)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Data");
            var patient = await _context.Patients.SingleOrDefaultAsync(p => p.Id == prescriptionVM.PatientId);
            if (patient is null) return BadRequest("Invalid Patient");
            var random = new Random();
           var randomNumeber = random.Next(1, 10001);
            var prescription = new Prescription
            {
                PrescriptionNumber = "RDC:"+patient.PatientName!.ToUpper()+randomNumeber,
                Duration = prescriptionVM.Duration,
                CreatedAt = DateTime.Now,
                Instructions = prescriptionVM.Instruction,
                PatientId = prescriptionVM.PatientId,
                MedicinePrescriptions = new List<MedicinePrescription>()
            };
            if (prescriptionVM.Medicines is not null)
            {
                foreach (var medicine in prescriptionVM.Medicines)
                {
                    var medicinePrescription = new MedicinePrescription
                    {
                        MedicineId = medicine.Id
                    };
                    prescription.MedicinePrescriptions.Add(medicinePrescription);
                }
            }
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();
            return Created("/Prescriptions", prescription);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]PrescriptionVM prescriptionVM)
        {
            var targetOne = await _context.Prescriptions.FindAsync(id);
            if (targetOne is null) return BadRequest("Not Found this Prescription");
            if (!ModelState.IsValid) return BadRequest("Invalid Data");
            var patient = await _context.Patients.SingleOrDefaultAsync(p => p.Id == prescriptionVM.PatientId);
            if (patient is null) return BadRequest("Invalid Patient");
            var random = new Random();
            var randomNumeber = random.Next(1, 10001);
            targetOne.PrescriptionNumber = $"RDC:{patient.PatientName!.ToUpper()}{randomNumeber}";
            targetOne.PatientId  = prescriptionVM.PatientId;
            
            targetOne.Duration = prescriptionVM.Duration;
            targetOne.Instructions = prescriptionVM.Instruction;

            
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var targetOne = await _context.Prescriptions.FindAsync(id);
            if (targetOne is null) return BadRequest("Not Found");

            _context.Prescriptions.Remove(targetOne);
            await _context.SaveChangesAsync();
            return Ok("Deleted Successfully");
        }
    }
}

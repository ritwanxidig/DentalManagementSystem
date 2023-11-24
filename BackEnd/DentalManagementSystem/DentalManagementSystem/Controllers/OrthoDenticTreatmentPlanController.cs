//using DentalManagementSystem.Data;
//using DentalManagementSystem.Models;
//using DentalManagementSystem.ViewModels;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//namespace DentalManagementSystem.Controllers
//{
//    [Route("[controller]")]
//    [ApiController]
//    //[Authorize]
//    public class OrthoDenticTreatmentPlanController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public OrthoDenticTreatmentPlanController(ApplicationDbContext context)
//        {
//            _context=context;
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetAll()
//        {
//            var treatmentPlans = await _context.OrthoDenticTreatmentPlans
//                .Include(tp => tp.Appointments)
//                .ToListAsync();

//            if (!treatmentPlans.Any()) return BadRequest("No treatmentPlans");
//            foreach (var treatmentPlan in treatmentPlans)
//            {
//                if (treatmentPlan.Appointments is not null)
//                {
//                    treatmentPlans.Select(tp => new
//                    {
//                        tp.Id,
//                        tp.NO_Appointments,
//                        CompletedAppointments = tp.Appointments!.Count(a => a.Status == "Completed")
//                    });
//                }

//            }
//            return Ok(treatmentPlans);
//        }

//        [HttpPost]
//        public async Task<IActionResult> Add([FromBody]OrthoDenticTreatmentPlanVM orthoDenticTreatmentPlanVM)
//        {
//            if (!ModelState.IsValid) return BadRequest("Invalid Data");
//            var orthoDenticTreatmentPlan = new OrthoDenticTreatmentPlan
//            {
//                PatientId = orthoDenticTreatmentPlanVM.PatientId,
//                ServiceId = orthoDenticTreatmentPlanVM.ServiceId,
//                DoctorId = 2,
//                Duration = orthoDenticTreatmentPlanVM.Duration,
//                InvoiceNo = orthoDenticTreatmentPlanVM.InvoiceNo,
//                NO_Appointments = orthoDenticTreatmentPlanVM.NO_Appointments,
//                CompletedAppointments = 0
//            };

//            _context.OrthoDenticTreatmentPlans.Add(orthoDenticTreatmentPlan);
//            await _context.SaveChangesAsync();
//            return Created("/OrthoDenticTreatmentPlans", orthoDenticTreatmentPlan);
//        }

//        [HttpDelete("{id}")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            var targetOne = await _context.OrthoDenticTreatmentPlans.FindAsync(id);
//            if (targetOne is null) return BadRequest("Not Found !!!");

//            _context.OrthoDenticTreatmentPlans.Remove(targetOne);
//            await _context.SaveChangesAsync();
//            return Ok("Deleted Successfully");
//        }
//    }
//}

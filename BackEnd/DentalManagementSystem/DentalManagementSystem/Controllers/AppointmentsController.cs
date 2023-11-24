using DentalManagementSystem.Data;
using DentalManagementSystem.Helpers;
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
    [Authorize]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context=context;
        }
        [HttpGet("/Appointments")]
        public async Task<IActionResult> GetAll()
        {
            var appointments = await _context.Appointments.Include(a => a.Doctor).ThenInclude(d => d.User)
                .OrderByDescending(a => a.CreatedAt).Include(A => A.Patient)
                .ToListAsync();
            if (!appointments.Any()) return BadRequest("Not Found appointments");
            return Ok(appointments);
        }

        [HttpGet("{date1}&{date2}")]
        public async Task<IActionResult> GetAllWithDateToDate(DateTime date1, DateTime date2)
        {
            var appointments = await _context.Appointments.Include(a => a.Doctor).ThenInclude(d => d.User)
                .OrderByDescending(a => a.CreatedAt).Include(A => A.Patient)
                .Where(a => a.CreatedAt >= date1 && a.CreatedAt <= date2)
                .ToListAsync(HttpContext.RequestAborted);
            if (!appointments.Any()) return BadRequest("Not Found appointments");
            var response = appointments.Select(a => new
            {
                Patient = a.Patient!.PatientName,
                Doctor = a.Doctor!.User!.Name,
                AppointmentNum = a.AppointmentNumber,
                Date = a.CreatedAt,


            });
            return Ok(response);
        }

        [HttpGet("/Appointments/specificDoctor")]
        public async Task<IActionResult> GetAllWithDoctor()
        {
            var appointments = await _context.Appointments.Include(a => a.Doctor).ThenInclude(d => d.User)
                .OrderByDescending(a => a.CreatedAt).Include(A => A.Patient).Where(a => a.DoctorId == User.GetDoctorId())
                .ToListAsync();
            if (!appointments.Any()) return BadRequest("Not Found appointments");
            return Ok(appointments);
        }
        [HttpGet("/Appointments/{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment is null) return BadRequest("Not Found this Appointment");
            return Ok(appointment);
        }
        [HttpGet("/TotalIncome/Appointments")]
        public async Task<IActionResult> GetTotalIncomeFromAppointments()
        {
            var appointments = await _context.Appointments.Select(A => A.Invoice_No).ToListAsync();
            if (!appointments.Any()) return BadRequest("No appointments");
            var totalAmounts = await _context.Invoices.Where(i => appointments.Contains(i.Invoice_No)).ToListAsync();
            var response = new
            {
                title = "Appointments",
                List = totalAmounts,
                Total = totalAmounts.Sum(i => i.Total)
            };
            return Ok(response);
        }

        [NonAction]
        internal int generateAppointmentNumber()
        {
            var currentDate = DateTime.Today.Date;
            var prevApps = _context.Appointments.Where(a => a.CreatedAt.Date == currentDate ).ToList();
            int appointmentNumber = prevApps.Count() + 1;
            return appointmentNumber;
        }

        [HttpGet("/TodayAppointments")]
        public async Task<IActionResult> GetTodayAppointment()
        {
            var todayApps = await _context.Appointments.Where(a => a.CreatedAt.Date == DateTime.Today.Date)
                .Include(a => a.Patient)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
            if (!todayApps.Any()) return BadRequest("No Appointments today");
            return Ok(todayApps);
        }

        [HttpGet("/PendingAppointments")]
        public async Task<IActionResult> GetPendingApps()
        {
            var PendingApps = await _context.Appointments.Where(a => a.CreatedAt.Date == DateTime.Today.Date)
                .Include(p => p.Patient).OrderBy(a => a.AppointmentNumber)
                .Where(a => a.Status == "Pending").Include(a => a.Doctor)
                .ToListAsync();
            if (!PendingApps.Any()) return BadRequest("No Pending Appointments Today");
            return Ok(PendingApps);
        }

        [HttpGet("/PendingAppointments/specificDoctor")]
        public async Task<IActionResult> GetPendingAppsWithDoctor()
        {
            var PendingApps = await _context.Appointments.Where(a => a.CreatedAt.Date == DateTime.Today.Date)
                .Include(p => p.Patient).OrderBy(a => a.AppointmentNumber)
                .Where(a => a.Status == "Pending").Include(a => a.Doctor).Where(a => a.DoctorId == User.GetDoctorId())
                .ToListAsync();
            if (!PendingApps.Any()) return BadRequest("No Pending Appointments Today");
            return Ok(PendingApps);
        }

        [AllowAnonymous]
        [HttpGet("/Appointments/TotalAppointments")]
        public async Task<IActionResult> GetTotalAppointments()
        {
            var totalApps = await _context.Appointments.CountAsync();
            return Ok(totalApps);
        }

        [HttpGet("/Appointments/Get/{status}")]
        public async Task<IActionResult> GetWithStatus(string status)
        {
            var PendingApps = await _context.Appointments.Include(p => p.Patient)
                .Where(a => a.DoctorId == User.GetDoctorId())
                .OrderByDescending(a => a.CreatedAt)
                .Where(a => a.Status!.ToLower() == status.ToLower()).Include(a => a.Doctor)
                .ToListAsync();
            if (!PendingApps.Any()) return BadRequest($"No {status.ToUpper()} Appointments");
            return Ok(PendingApps);
        }


        [HttpGet("/Appointments/WithOutDoctor/{status}")]
        public async Task<IActionResult> GetAllWithStatus(string status)
        {
            var PendingApps = await _context.Appointments.Include(p => p.Patient)
                .OrderByDescending(a => a.CreatedAt)
                .Where(a => a.Status!.ToLower() == status.ToLower()).Include(a => a.Doctor)
                .ToListAsync();
            if (!PendingApps.Any()) return BadRequest($"No {status.ToUpper()} Appointments");
            return Ok(PendingApps);
        }

        [HttpGet("/Appointments/doctor/patients")]
        public IActionResult GetNumberOfPatientsOfDoctor()
        {
            var distinctPatients =  _context.Appointments.Where(d => d.DoctorId == User.GetDoctorId()).Select(a => a.patientId).Distinct();
            int numberOfPatients = distinctPatients.Count();
            return Ok(numberOfPatients);
        }

        [HttpGet("/Appointments/doctor/Income")]
        public async Task<IActionResult> GetTotalIncomeOfSpecificDoctor()
        {
            decimal totalIncomeOfSpecificDoctor = await _context.Invoices
                  .Join(_context.Appointments,
                            invoice => invoice.Invoice_No,
                            appointment => appointment.Invoice_No,
                            (invoice, appointment) => new { Invoice = invoice, Appointment = appointment })
                    .Where(x => x.Appointment.DoctorId == User.GetDoctorId())
                    .SumAsync(x => x.Invoice.Total);

            decimal totalIncomeOfSpecificDoctor2 = await _context.Invoices
               .Join(_context.TreatmentPlans,
                         invoice => invoice.Invoice_No,
                         treatmentPlan => treatmentPlan.InvoiceNo,
                         (invoice, treatmentPlan) => new { Invoice = invoice, TreatmentPlan = treatmentPlan })
                 .Where(x => x.TreatmentPlan.Appointment!.DoctorId == User.GetDoctorId())
                 .SumAsync(x => x.Invoice.Total);
            return Ok(totalIncomeOfSpecificDoctor + totalIncomeOfSpecificDoctor2);
        }

        // Get Total Appointments with specific doctor
        [HttpGet("/Appointments/doctor/")]
        public async Task<IActionResult> GetTotalAppointmentsWithSpecificDoctor ()
        {
            var appointments = await _context.Appointments.Where(a => a.DoctorId == User.GetDoctorId()).ToListAsync();
            if (!appointments.Any()) return Ok(0);
            return Ok(appointments.Count());
        }
        // 
        //[HttpGet("/PendingAppointments/Doctors")]
        //public async Task<IActionResult> GetPendingAppsWithDoctor()
        //{
        //    var PendingApps = await _context.Appointments.Where(a => a.CreatedAt.Date == DateTime.Today.Date && a.DoctorId == User.GetDoctorId())
        //        .Include(p => p.Patient).OrderBy(a => a.AppointmentNumber)
        //        .Where(a => a.Status == "Pending").Include(a => a.Doctor)
        //        .ToListAsync();
        //    if (!PendingApps.Any()) return BadRequest("No Pending Appointments Today");
        //    return Ok(PendingApps);
        //}


        [HttpPost("/Appointments")]
        public async Task<IActionResult> Add([FromBody] AppointmentVM appointmentvm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Appointment Data");
            var previousApps = await _context.Appointments.Where(p => p.patientId == appointmentvm.patientId)
                .ToListAsync();
            var patientStatus = "";
            if (previousApps.Any())
            {
                patientStatus = "Old";
            }
            else
            {
                patientStatus = "New";
            }

            var prevApps2 = await _context.Appointments
                .Where(a => a.CreatedAt.Date == DateTime.Now.Date && a.DoctorId == appointmentvm.doctorId)
                .ToListAsync();


            var appointment = new Appointment
            {
                patientId = appointmentvm.patientId,
                DoctorId = appointmentvm.doctorId,
                UserId = User.GetUserId(),
                AppointmentNumber =  prevApps2.Count()+1,
                CreatedAt = DateTime.Now,
                TicketPrice = appointmentvm.TicketPrice,
                Invoice_No = appointmentvm.InvoiceNo,
                Status = "Pending",
                PatientStatus = patientStatus
            };
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
            return Created("/Appointments", appointment);
        }

        [HttpPut("/Appointments/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]AppointmentVM appointmentvm)
        {
            var targetAppointment = await _context.Appointments.FindAsync(id);
            if (targetAppointment is null) return BadRequest("Not Found this Appointment");
            if (!ModelState.IsValid) return BadRequest("Invalid Appointment Data to update");
            targetAppointment.TicketPrice = appointmentvm.TicketPrice;
            targetAppointment.Invoice_No = targetAppointment.Invoice_No;
            targetAppointment.patientId = appointmentvm.patientId;
            targetAppointment.DoctorId = appointmentvm.doctorId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("ChangeStatus/{id}")]
        public async Task<IActionResult> ChangeStatus(int id, [FromBody]ModifiedAppointmentVM modifiedAppointmentVM, int completedAppointments)
        {
            var targetAppointment = await _context.Appointments.FindAsync(id);
            if (targetAppointment is null) return BadRequest("Not Found this Appointment");
            targetAppointment.Status = modifiedAppointmentVM.Status;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("/Appointments/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var targetAppointment = await _context.Appointments.FindAsync(id);
            if (targetAppointment is null) return BadRequest("Not Found this Appointment");
            _context.Remove(targetAppointment);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
        }

    }
}

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
    public class AppointmentsController:ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context=context;
        }
        [HttpGet("/Appointments")]
        public async Task<IActionResult> GetAll()
        {
            var appointments = await _context.Appointments.Include(A => A.Service).OrderBy(a => a.AppointmentNumber).Include(A => A.Patient).ToListAsync();
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

        [HttpPost("/Appointments")]
        public async Task<IActionResult> Add([FromBody]AppointmentVM appointmentvm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Appointment Data");
            var appointment = new Appointment
            {
                patientId = appointmentvm.patientId,
                ServiceId = appointmentvm.ServiceId,
                UserId = 3, //TODO: get the User Logged
                AppointmentNumber = appointmentvm.AppointmentNumber,
                CreatedAt = DateTime.Now,
                Status = appointmentvm.Status,
                TicketPrice = appointmentvm.TicketPrice,
                InvoiceNo = appointmentvm.InvoiceNo,
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
            targetAppointment.Status = appointmentvm.Status;
            targetAppointment.TicketPrice = appointmentvm.TicketPrice;
            targetAppointment.InvoiceNo = appointmentvm.InvoiceNo;
            targetAppointment.AppointmentNumber = appointmentvm.AppointmentNumber;
            targetAppointment.patientId = appointmentvm.patientId;
            targetAppointment.ServiceId = appointmentvm.ServiceId;

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

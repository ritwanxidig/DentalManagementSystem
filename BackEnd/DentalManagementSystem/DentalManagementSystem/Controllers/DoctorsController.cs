using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class DoctorsController:ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DoctorsController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context=context;
            _webHostEnvironment=webHostEnvironment;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var doctors = await _context.Doctors!
                .Include(d => d.User)
                .ToListAsync(HttpContext.RequestAborted);
            if (!doctors.Any()) return BadRequest("No Doctors Found!!!");
            foreach (var doctor in doctors)
            {
                doctor.User!.Avatar = GetImage(doctor.User.Name!, "Users");
            }
          
            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            var doctor = await _context.Doctors
                .Include(d => d.User)
                .SingleOrDefaultAsync(d => d.Id==id);
            if (doctor is null)
                return BadRequest("Not Found this doctor");

            return Ok(doctor);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] DoctorVM doctorvm)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var user = await _context.Users.FindAsync(doctorvm.UserId);
            if (user is null) return BadRequest("Invalid User");
            var doctor = new Doctor
            {
                PhoneNo = doctorvm.PhoneNo,
                Speciality = doctorvm.Speciality,
                UserId = doctorvm.UserId,   

                CreatedAt = DateTime.Now
            };
            user.Avatar = GetImage(user.Name!, "Users");
            user.Role = "Doctor";
            _context.Add(doctor);
            await _context.SaveChangesAsync(HttpContext.RequestAborted);
            return Created("/Doctors", doctor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody]DoctorVM doctorvm)
        {
            var targetDoctor = await _context.Doctors
                .FindAsync(id);
            if (targetDoctor is null)
                return BadRequest("Not Found This Doctor");
            targetDoctor.PhoneNo = doctorvm.PhoneNo;
            targetDoctor.Speciality = doctorvm.Speciality;
            targetDoctor.UserId = doctorvm.UserId;
            await _context.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var targetDoctor = await _context.Doctors
                .FindAsync(id);
            if (targetDoctor is null)
                return BadRequest();
            _context.Remove(targetDoctor);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [NonAction]
        private string GetImage(string Identity, string folder)
        {
            string ImageUrl = string.Empty;
            string HostUrl = "https://localhost:7143";
            string Filepath = GetFilePath(Identity, folder);
            string Imagepath = Filepath + "\\image.png";
            if (!System.IO.File.Exists(Imagepath))
            {
                ImageUrl = HostUrl + "/uploads/common/noimage.png";
            }
            else
            {
                ImageUrl = HostUrl + $"/uploads/"+folder+"/"+ Identity + "/image.png";
            }
            return ImageUrl;
        }

        [NonAction]
        private string GetFilePath(string Identity, string folder)
        {
            return _webHostEnvironment.WebRootPath + $"\\Uploads\\{folder}\\" + Identity;
        }

    }
}

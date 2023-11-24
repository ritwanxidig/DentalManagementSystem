using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UsersController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context=context;
            _webHostEnvironment=webHostEnvironment;
        }

        [HttpGet("/Users")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users.OrderBy(u => u.Name).ToListAsync();
            if (users.Any())
            {
                foreach (var user in users)
                {
                    user.Avatar = GetImage(user.Name!, "Users");
                }
                return Ok(users);
            }
           
            return BadRequest("No Users Found");
        }

        [HttpGet("/Users/TotalUsers")]
        public async Task<IActionResult> GetTotalUsers()
        {
            var totalUsers = await _context.Users.CountAsync();
            return Ok(totalUsers);
        }

        [HttpGet("/User/{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user is null) return BadRequest();
            return Ok(user);
        }

        [HttpPost("/Users")]
        public async Task<IActionResult> Add([FromBody]UserVm uservm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Info");
            var user = new User
            {
                Name = uservm.Name,
                CreatedAt = DateTime.Now,
                Email = uservm.Email,
                Password = uservm.Password,
                Role = uservm.Role,
                Avatar = uservm.Avatar,
               
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Created("/Users", user);
        }
        [HttpPost("/Users/Patient")]
        public async Task<IActionResult> AddPatient([FromBody] UserVm uservm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Info");
            var user = new User
            {
                Name = uservm.Name,
                CreatedAt = DateTime.Now,
                Email = uservm.Email,
                Password = uservm.Password,
                Role = "Patient",
                Avatar = uservm.Avatar,

            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Created("/Users", user);
        }
        [HttpPut("/users/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]UserVm uservm)
        {
            var TargetUser = await _context.Users.FindAsync(id);
            if (TargetUser is null) return BadRequest("Not Found this user");
            if (!ModelState.IsValid) return BadRequest("Invalid Info");
            TargetUser.Name = uservm.Name;
            TargetUser.Email = uservm.Email; 
            TargetUser.Password = uservm.Password;
            TargetUser.Role = uservm.Role;
            TargetUser.Avatar = uservm.Avatar;

            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("/Users/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var targetUser = await _context.Users.FindAsync(id);
            if (targetUser is null) return BadRequest("Not Found this user");
            _context.Users.Remove(targetUser);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
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
                ImageUrl = HostUrl + $"/uploads/{folder}/"+ Identity + "/image.png";
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

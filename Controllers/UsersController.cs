using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpGet("/Users")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users.OrderBy(u => u.Name).ToListAsync();
            if (users.Any())
            {
                return Ok(users);
            }
            return BadRequest();
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
                Role = uservm.Role
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
    }
}

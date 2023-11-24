using DentalManagementSystem.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpPost("/Login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user is null) return BadRequest("Invalid Login Attempt, Invalid user");
            if (password != user.Password) return BadRequest("Invalid Login Attempt, Incorrect Password");

            string keyInput = "ASDFGHJKL:}{ POIUYTREWQZXCVBNM<>?+_)(*&^%$#@!)}";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyInput));

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new("FullName", user.Name!),
                new("email", user.Email!),
                new("Role", user.Role!)
            };

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken("MyApp", "FrontEnd", claims, notBefore:DateTime.Now, expires:DateTime.Now.AddMinutes(20), credentials);
            var handler = new JwtSecurityTokenHandler();
            var Jwt = handler.WriteToken(token);
            var result = new
            {
                token = Jwt
            };
            return Ok(result);

        }
    }
}

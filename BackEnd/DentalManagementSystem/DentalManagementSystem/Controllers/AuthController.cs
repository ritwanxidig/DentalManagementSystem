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
            _context = context;
        }
        public class LoginData
        {
            public string? email { get; set; }
            public string? password { get; set; }
        }

        [HttpPost("/Login")]
        public async Task<IActionResult> Login([FromBody] LoginData data)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == data.email);

            if (user is null) return BadRequest("Not Found this user! Invalid username");

            if (data.password != user.Password) return BadRequest("Incorrect Password");


            string keyInput = "ASDFGHJKL:}{ POIUYTREWQZXCVBNM<>?+_)(*&^%$#@!)}";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyInput));

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user!.Id.ToString()),
                new("FullName", user.Name!),
                new("email", user.Email!),
                new("Role", user.Role!)
            };
            // the user is doctor ?
            var doctor = await _context.Doctors.SingleOrDefaultAsync(d => d.UserId == user.Id);
            if(doctor is not null)
            {
                claims.Add(new("doctorId", doctor.Id.ToString()));
            }

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken("MyApp", "FrontEnd", claims, notBefore: DateTime.Now, expires: DateTime.Now.AddHours(5), credentials);
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

using DentalManagementSystem.Data;
using DentalManagementSystem.Models;
using DentalManagementSystem.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Microsoft.VisualBasic;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MedicinesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MedicinesController(ApplicationDbContext context)
        {
            _context=context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var medicines = await _context.Medicines
                .OrderBy(m => m.Name).ToListAsync();
            if (!medicines.Any()) return BadRequest("Not Found any medicines");
            return Ok(medicines);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            var targetOne = await _context.Medicines.FindAsync(id);
            if (targetOne is null) return BadRequest("Not Found");
            return Ok(targetOne);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]MedicineVM medicineVM)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Data, there is validation error");
            var medicine = new Medicine
            {
                Description = medicineVM.Description,
                Dosage = medicineVM.Dosage,
                Manufacturer = medicineVM.Manufacturer,
                Name = medicineVM.Name,
                CreatedAt = DateTime.Now
            };
            _context.Medicines.Add(medicine);
            await _context.SaveChangesAsync();
            return Created("", medicine);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]MedicineVM medicineVM)
        {
            var targetOne = await _context.Medicines.FindAsync(id);
            if (targetOne is null) return BadRequest("Not found");
            if (!ModelState.IsValid) return BadRequest("Invalid data");
            targetOne.Manufacturer = medicineVM.Manufacturer;
            targetOne.Name = medicineVM.Name;
            targetOne.Description = medicineVM.Description;
            targetOne.Dosage = medicineVM.Dosage;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var targetOne = await _context.Medicines.FindAsync(id);
            if (targetOne is null) return BadRequest("Not Found");

            _context.Medicines.Remove(targetOne);
            await _context.SaveChangesAsync();
            return Ok("Deleted Successfully");
        }
    }
}

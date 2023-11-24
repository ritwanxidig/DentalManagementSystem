using System.ComponentModel.DataAnnotations;

namespace DentalManagementSystem.Models
{
    public class Medicine
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Manufacturer { get; set; }


        public string? Dosage { get; set; }

        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }



    }
}

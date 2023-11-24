using System.Reflection.Metadata.Ecma335;

namespace DentalManagementSystem.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public string? Speciality { get; set; }

        public string? PhoneNo { get; set; }

        public DateTime CreatedAt { get; set; }


    }
}

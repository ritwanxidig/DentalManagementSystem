namespace DentalManagementSystem.Models
{
    public class Patient
    {
        public int Id { get; set; }

        public string? PatientName { get; set; }

        public int Age { get; set; }

        public string? Sex { get; set; }
            
        public string? Address { get; set; }

        public string? PhoneNo { get; set; }
            
        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public ICollection<Appointment>? Appointments { get; set; }


    }
}

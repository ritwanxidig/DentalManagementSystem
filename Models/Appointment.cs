namespace DentalManagementSystem.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public Patient? Patient { get; set; }   
        public int patientId { get; set; }

        public Service? Service { get; set; }
        public int ServiceId { get; set; }

        public int AppointmentNumber { get; set; }

        public decimal TicketPrice { get; set; }

        public int InvoiceNo { get; set; }

        public User? User { get; set; }
        public int UserId { get; set; }

        public string? Status { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}

namespace DentalManagementSystem.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public Patient? Patient { get; set; }
        public int patientId { get; set; }

        public int DoctorId { get; set; }
        public Doctor? Doctor { get; set; }

        public int AppointmentNumber { get; set; }

        public decimal TicketPrice { get; set; }

        public string? PatientStatus { get; set; }

        public string? Invoice_No { get; set; }

        public User? User { get; set; }
        public int UserId { get; set; }


        public string? Status { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}

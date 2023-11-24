namespace DentalManagementSystem.Models
{
    public class Treatment
    {
        public int Id { get; set; }

        public Appointment Appointment { get; set; }
        public int AppointmentId { get; set; }

        public string? ClinicalFeatures { get; set; }

        public string? Diagnosis { get; set; }

        public string? Note { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}

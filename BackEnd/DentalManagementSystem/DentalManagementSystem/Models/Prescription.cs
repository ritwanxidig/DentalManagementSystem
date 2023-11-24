using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace DentalManagementSystem.Models
{
    public class Prescription
    {
        [Key]
        public int Id { get; set; }

        public string? PrescriptionNumber { get; set; }

        public string? Instructions { get; set; }
        public string? Duration { get; set; }

        public int PatientId { get; set; }
        public Patient? Patient { get; set; }


        public List<MedicinePrescription>? MedicinePrescriptions { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}

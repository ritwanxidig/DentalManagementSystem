namespace DentalManagementSystem.Models
{
    public class Treatment
    {
        public int Id { get; set; }

        public TreatmentPlan? TreatmentPlan { get; set; }
        public int TreatmentPlanId { get; set; }

        public string? ClinicalFeatures { get; set; }

        public int? PrescriptionId { get; set; }
        public Prescription? Prescription { get; set; }

        public string? Note { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}

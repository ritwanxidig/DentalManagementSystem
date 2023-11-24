namespace DentalManagementSystem.ViewModels
{
    public class TreatmentVM
    {
        public int TreatmentPlanId { get; set; }

        public string? ClinicalFeatures { get; set; }

        public int? PrescriptionId { get; set; }

        public string? Note { get; set; }
    }
}

using DentalManagementSystem.Models;

namespace DentalManagementSystem.ViewModels
{
    public class OrthoDenticTreatmentPlanVM
    {
        public int ServiceId { get; set; }

        public int PatientId { get; set; }


        public int Duration { get; set; }

        public int NO_Appointments { get; set; }

        public string? InvoiceNo { get; set; }

    }
}

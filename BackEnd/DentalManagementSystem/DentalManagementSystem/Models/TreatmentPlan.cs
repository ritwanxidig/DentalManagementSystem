namespace DentalManagementSystem.Models
{
    public class TreatmentPlan
    {
        public int Id { get; set; }

        public int AppointmentId { get; set; }
        public Appointment? Appointment { get; set; }


        public List<TreatmentPlanService>? TreatmentPlanServices { get; set; }

        public decimal TotalPrice
        {
            get {

                return TreatmentPlanServices?.Sum(tps => tps.Total)??0; 
            }
            // Set as read-only property for ease of calculation
        }

        public string? InvoiceNo { get; set; }

        public DateTime CreatedAt { get; set; }


    }
}

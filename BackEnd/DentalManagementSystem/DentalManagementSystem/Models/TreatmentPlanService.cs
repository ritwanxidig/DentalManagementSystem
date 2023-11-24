namespace DentalManagementSystem.Models
{
    public class TreatmentPlanService
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        // ...

        public decimal Total
        {
            get
            {
                if (Service is null) return 0;
                return Service.Price * Quantity;
            }
        }

        public int TreatmentPlanId { get; set; }
        public TreatmentPlan? TreatmentPlan { get; set; }

        public int ServiceId { get; set; }
        public Service? Service { get; set; }
    }
}

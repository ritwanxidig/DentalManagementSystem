namespace DentalManagementSystem.Models
{
    public class Service
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal Price { get; set; }

        //public string? Duration { get; set; }

        public DateTime CreatedAt { get; set; }

        //public ICollection<TreatmentPlanService> TreatmentPlanServices { get; set; }
    }
}

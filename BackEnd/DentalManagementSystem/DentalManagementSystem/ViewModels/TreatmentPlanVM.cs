using DentalManagementSystem.Models;

namespace DentalManagementSystem.ViewModels
{
    public class TreatmentPlanVM
    {
        public int AppointmentId { get; set; }

        public List<ServiceDTO>? Services { get; set; }

        public string? InvoiceNo { get; set; }
    }

    public class ServiceDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal Price { get; set; }
        public int quantity { get; set; }
    }
}

using DentalManagementSystem.Models;

namespace DentalManagementSystem.ViewModels
{
    public class AppointmentVM
    {
        public int patientId { get; set; }

        public int ServiceId { get; set; }

        public int AppointmentNumber { get; set; }

        public decimal TicketPrice { get; set; }

        public int InvoiceNo { get; set; }

        public string? Status { get; set; }
    }
}

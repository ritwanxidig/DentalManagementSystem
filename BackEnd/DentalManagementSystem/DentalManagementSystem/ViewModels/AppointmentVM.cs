using DentalManagementSystem.Models;

namespace DentalManagementSystem.ViewModels
{
    public class AppointmentVM
    {
        public int patientId { get; set; }
        public int doctorId { get; set; }

        public decimal TicketPrice { get; set; }

        public string? InvoiceNo { get; set; }

    }

    public class ModifiedAppointmentVM 
    {
        public string? Status { get; set; }
    }
}

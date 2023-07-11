using DentalManagementSystem.Models;

namespace DentalManagementSystem.ViewModels
{
    public class InvoicesVM
    {
        public int Invoice_No { get; set; }

        public decimal Total { get; set; }

        public string? Status { get; set; }

        public string? PaymentType { get; set; }
    }
}

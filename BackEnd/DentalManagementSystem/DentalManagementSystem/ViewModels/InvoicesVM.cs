using DentalManagementSystem.Models;

namespace DentalManagementSystem.ViewModels
{
    public class InvoicesVM
    {
        public string? Invoice_No { get; set; }

        public decimal Total { get; set; }

        public string? Status { get; set; }

        public string? PaymentType { get; set; }
    }

    public class ModifiedInvoic
    {
        public string? Status { get; set; }
    }
}

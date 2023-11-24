namespace DentalManagementSystem.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public string? InvoiceNo { get; set; }

        public decimal PaidAmount { get; set; }

        public decimal Remaining { get; set; }

        public string? PaymentType { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}

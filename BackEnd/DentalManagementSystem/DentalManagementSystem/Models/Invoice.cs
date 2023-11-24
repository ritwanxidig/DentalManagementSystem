namespace DentalManagementSystem.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        public string? Invoice_No { get; set; }


        public ICollection<Service>? Services { get; set; }

        public decimal Total { get; set; }

        public string? Status { get; set; }

        public string? PaymentType { get; set; }

        public User? User { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}

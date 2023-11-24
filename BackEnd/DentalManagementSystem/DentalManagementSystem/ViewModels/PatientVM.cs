namespace DentalManagementSystem.ViewModels
{
    public class PatientVM
    {
        public string? PatientName { get; set; }

        public int Age { get; set; }

        public string? Sex { get; set; }

        public string? Address { get; set; }

        public string? Phone_No { get; set; }

        public string? Description { get; set; }
    }

    public class ModifiedPatientVM
    {
        public string? CheifComplient { get; set; }
    }
}

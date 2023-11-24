using DentalManagementSystem.Models;

namespace DentalManagementSystem.ViewModels
{
    public class PrescriptionVM
    {
        public int PatientId { get; set; }

        public string? Instruction { get; set; }

        public string? Duration { get; set; }

        public List<MedicineDTO>? Medicines { get; set; }


    }

    public class MedicineDTO : Medicine
    {
        public string? UniqId { get; set; }
    }
}

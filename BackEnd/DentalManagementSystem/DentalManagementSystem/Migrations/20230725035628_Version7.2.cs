using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DentalManagementSystem.Migrations
{
    public partial class Version72 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Doctor_DoctorId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctor_Users_UserId",
                table: "Doctor");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicinePrescription_Medicine_MedicineId",
                table: "MedicinePrescription");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicinePrescription_Prescription_PrescriptionId",
                table: "MedicinePrescription");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescription_Patients_PatientId",
                table: "Prescription");

            migrationBuilder.DropForeignKey(
                name: "FK_TreatmentPlan_Appointments_AppointmentId",
                table: "TreatmentPlan");

            migrationBuilder.DropForeignKey(
                name: "FK_TreatmentPlanService_TreatmentPlan_TreatmentPlanId",
                table: "TreatmentPlanService");

            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_Prescription_PrescriptionId",
                table: "Treatments");

            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_TreatmentPlan_TreatmentPlanId",
                table: "Treatments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TreatmentPlan",
                table: "TreatmentPlan");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prescription",
                table: "Prescription");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Medicine",
                table: "Medicine");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Doctor",
                table: "Doctor");

            migrationBuilder.RenameTable(
                name: "TreatmentPlan",
                newName: "TreatmentPlans");

            migrationBuilder.RenameTable(
                name: "Prescription",
                newName: "Prescriptions");

            migrationBuilder.RenameTable(
                name: "Medicine",
                newName: "Medicines");

            migrationBuilder.RenameTable(
                name: "Doctor",
                newName: "Doctors");

            migrationBuilder.RenameIndex(
                name: "IX_TreatmentPlan_AppointmentId",
                table: "TreatmentPlans",
                newName: "IX_TreatmentPlans_AppointmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Prescription_PatientId",
                table: "Prescriptions",
                newName: "IX_Prescriptions_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_Doctor_UserId",
                table: "Doctors",
                newName: "IX_Doctors_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TreatmentPlans",
                table: "TreatmentPlans",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prescriptions",
                table: "Prescriptions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Medicines",
                table: "Medicines",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Doctors",
                table: "Doctors",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Doctors_DoctorId",
                table: "Appointments",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Users_UserId",
                table: "Doctors",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicinePrescription_Medicines_MedicineId",
                table: "MedicinePrescription",
                column: "MedicineId",
                principalTable: "Medicines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicinePrescription_Prescriptions_PrescriptionId",
                table: "MedicinePrescription",
                column: "PrescriptionId",
                principalTable: "Prescriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Patients_PatientId",
                table: "Prescriptions",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TreatmentPlans_Appointments_AppointmentId",
                table: "TreatmentPlans",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TreatmentPlanService_TreatmentPlans_TreatmentPlanId",
                table: "TreatmentPlanService",
                column: "TreatmentPlanId",
                principalTable: "TreatmentPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_Prescriptions_PrescriptionId",
                table: "Treatments",
                column: "PrescriptionId",
                principalTable: "Prescriptions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_TreatmentPlans_TreatmentPlanId",
                table: "Treatments",
                column: "TreatmentPlanId",
                principalTable: "TreatmentPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Doctors_DoctorId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Users_UserId",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicinePrescription_Medicines_MedicineId",
                table: "MedicinePrescription");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicinePrescription_Prescriptions_PrescriptionId",
                table: "MedicinePrescription");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Patients_PatientId",
                table: "Prescriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_TreatmentPlans_Appointments_AppointmentId",
                table: "TreatmentPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_TreatmentPlanService_TreatmentPlans_TreatmentPlanId",
                table: "TreatmentPlanService");

            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_Prescriptions_PrescriptionId",
                table: "Treatments");

            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_TreatmentPlans_TreatmentPlanId",
                table: "Treatments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TreatmentPlans",
                table: "TreatmentPlans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prescriptions",
                table: "Prescriptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Medicines",
                table: "Medicines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Doctors",
                table: "Doctors");

            migrationBuilder.RenameTable(
                name: "TreatmentPlans",
                newName: "TreatmentPlan");

            migrationBuilder.RenameTable(
                name: "Prescriptions",
                newName: "Prescription");

            migrationBuilder.RenameTable(
                name: "Medicines",
                newName: "Medicine");

            migrationBuilder.RenameTable(
                name: "Doctors",
                newName: "Doctor");

            migrationBuilder.RenameIndex(
                name: "IX_TreatmentPlans_AppointmentId",
                table: "TreatmentPlan",
                newName: "IX_TreatmentPlan_AppointmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Prescriptions_PatientId",
                table: "Prescription",
                newName: "IX_Prescription_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_Doctors_UserId",
                table: "Doctor",
                newName: "IX_Doctor_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TreatmentPlan",
                table: "TreatmentPlan",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prescription",
                table: "Prescription",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Medicine",
                table: "Medicine",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Doctor",
                table: "Doctor",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Doctor_DoctorId",
                table: "Appointments",
                column: "DoctorId",
                principalTable: "Doctor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctor_Users_UserId",
                table: "Doctor",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicinePrescription_Medicine_MedicineId",
                table: "MedicinePrescription",
                column: "MedicineId",
                principalTable: "Medicine",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicinePrescription_Prescription_PrescriptionId",
                table: "MedicinePrescription",
                column: "PrescriptionId",
                principalTable: "Prescription",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prescription_Patients_PatientId",
                table: "Prescription",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TreatmentPlan_Appointments_AppointmentId",
                table: "TreatmentPlan",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TreatmentPlanService_TreatmentPlan_TreatmentPlanId",
                table: "TreatmentPlanService",
                column: "TreatmentPlanId",
                principalTable: "TreatmentPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_Prescription_PrescriptionId",
                table: "Treatments",
                column: "PrescriptionId",
                principalTable: "Prescription",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_TreatmentPlan_TreatmentPlanId",
                table: "Treatments",
                column: "TreatmentPlanId",
                principalTable: "TreatmentPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

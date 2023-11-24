using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DentalManagementSystem.Migrations
{
    public partial class Version8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicinePrescription_Medicines_MedicineId",
                table: "MedicinePrescription");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicinePrescription_Prescriptions_PrescriptionId",
                table: "MedicinePrescription");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicinePrescription",
                table: "MedicinePrescription");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Medicines");

            migrationBuilder.RenameTable(
                name: "MedicinePrescription",
                newName: "MedicinePrescriptions");

            migrationBuilder.RenameColumn(
                name: "ExpireDate",
                table: "Medicines",
                newName: "CreatedAt");

            migrationBuilder.RenameIndex(
                name: "IX_MedicinePrescription_PrescriptionId",
                table: "MedicinePrescriptions",
                newName: "IX_MedicinePrescriptions_PrescriptionId");

            migrationBuilder.RenameIndex(
                name: "IX_MedicinePrescription_MedicineId",
                table: "MedicinePrescriptions",
                newName: "IX_MedicinePrescriptions_MedicineId");

            migrationBuilder.AddColumn<string>(
                name: "InvoiceNo",
                table: "TreatmentPlans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicinePrescriptions",
                table: "MedicinePrescriptions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicinePrescriptions_Medicines_MedicineId",
                table: "MedicinePrescriptions",
                column: "MedicineId",
                principalTable: "Medicines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicinePrescriptions_Prescriptions_PrescriptionId",
                table: "MedicinePrescriptions",
                column: "PrescriptionId",
                principalTable: "Prescriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicinePrescriptions_Medicines_MedicineId",
                table: "MedicinePrescriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicinePrescriptions_Prescriptions_PrescriptionId",
                table: "MedicinePrescriptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicinePrescriptions",
                table: "MedicinePrescriptions");

            migrationBuilder.DropColumn(
                name: "InvoiceNo",
                table: "TreatmentPlans");

            migrationBuilder.RenameTable(
                name: "MedicinePrescriptions",
                newName: "MedicinePrescription");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Medicines",
                newName: "ExpireDate");

            migrationBuilder.RenameIndex(
                name: "IX_MedicinePrescriptions_PrescriptionId",
                table: "MedicinePrescription",
                newName: "IX_MedicinePrescription_PrescriptionId");

            migrationBuilder.RenameIndex(
                name: "IX_MedicinePrescriptions_MedicineId",
                table: "MedicinePrescription",
                newName: "IX_MedicinePrescription_MedicineId");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Medicines",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicinePrescription",
                table: "MedicinePrescription",
                column: "Id");

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
        }
    }
}

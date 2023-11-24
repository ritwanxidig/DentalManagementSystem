using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DentalManagementSystem.Migrations
{
    public partial class Version9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "Services",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrthoDenticTreatmentPlanId",
                table: "Appointments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OrthoDenticTreatmentPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    DoctorId = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    NO_Appointments = table.Column<int>(type: "int", nullable: false),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompletedAppointments = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrthoDenticTreatmentPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrthoDenticTreatmentPlans_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrthoDenticTreatmentPlans_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrthoDenticTreatmentPlans_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_OrthoDenticTreatmentPlanId",
                table: "Appointments",
                column: "OrthoDenticTreatmentPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_OrthoDenticTreatmentPlans_DoctorId",
                table: "OrthoDenticTreatmentPlans",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_OrthoDenticTreatmentPlans_PatientId",
                table: "OrthoDenticTreatmentPlans",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_OrthoDenticTreatmentPlans_ServiceId",
                table: "OrthoDenticTreatmentPlans",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_OrthoDenticTreatmentPlans_OrthoDenticTreatmentPlanId",
                table: "Appointments",
                column: "OrthoDenticTreatmentPlanId",
                principalTable: "OrthoDenticTreatmentPlans",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_OrthoDenticTreatmentPlans_OrthoDenticTreatmentPlanId",
                table: "Appointments");

            migrationBuilder.DropTable(
                name: "OrthoDenticTreatmentPlans");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_OrthoDenticTreatmentPlanId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "OrthoDenticTreatmentPlanId",
                table: "Appointments");
        }
    }
}

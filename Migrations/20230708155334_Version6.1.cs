using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DentalManagementSystem.Migrations
{
    public partial class Version61 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Treatments",
                newName: "Note");

            migrationBuilder.AddColumn<string>(
                name: "ClinicalFeatures",
                table: "Treatments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Diagnosis",
                table: "Treatments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClinicalFeatures",
                table: "Treatments");

            migrationBuilder.DropColumn(
                name: "Diagnosis",
                table: "Treatments");

            migrationBuilder.RenameColumn(
                name: "Note",
                table: "Treatments",
                newName: "Description");
        }
    }
}

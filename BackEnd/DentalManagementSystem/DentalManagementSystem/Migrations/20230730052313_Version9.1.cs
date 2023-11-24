using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DentalManagementSystem.Migrations
{
    public partial class Version91 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrthoDenticTreatments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrthoDenticTreatmentPlanId = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrthoDenticTreatments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrthoDenticTreatments_OrthoDenticTreatmentPlans_OrthoDenticTreatmentPlanId",
                        column: x => x.OrthoDenticTreatmentPlanId,
                        principalTable: "OrthoDenticTreatmentPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrthoDenticTreatments_OrthoDenticTreatmentPlanId",
                table: "OrthoDenticTreatments",
                column: "OrthoDenticTreatmentPlanId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrthoDenticTreatments");
        }
    }
}

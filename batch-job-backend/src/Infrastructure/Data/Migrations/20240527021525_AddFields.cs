using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace batch_job_backend.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BatchLaunchMonthDay",
                table: "BatchJobs",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "BatchLaunchWeedDay",
                table: "BatchJobs",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "LoopStep",
                table: "BatchJobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WorkHourEnd",
                table: "BatchJobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WorkHourStart",
                table: "BatchJobs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BatchLaunchMonthDay",
                table: "BatchJobs");

            migrationBuilder.DropColumn(
                name: "BatchLaunchWeedDay",
                table: "BatchJobs");

            migrationBuilder.DropColumn(
                name: "LoopStep",
                table: "BatchJobs");

            migrationBuilder.DropColumn(
                name: "WorkHourEnd",
                table: "BatchJobs");

            migrationBuilder.DropColumn(
                name: "WorkHourStart",
                table: "BatchJobs");
        }
    }
}

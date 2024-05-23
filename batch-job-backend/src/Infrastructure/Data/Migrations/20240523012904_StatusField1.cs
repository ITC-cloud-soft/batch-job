using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace batch_job_backend.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class StatusField1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "BatchJobs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "BatchJobs");
        }
    }
}

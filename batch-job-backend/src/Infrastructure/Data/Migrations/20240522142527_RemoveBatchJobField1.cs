using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace batch_job_backend.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveBatchJobField1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartWeekDay",
                table: "BatchJobs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StartWeekDay",
                table: "BatchJobs",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}

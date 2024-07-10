using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Identity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "247264ed-99df-4543-a895-8b20a88b90a4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6009e872-f9bf-43bd-a08b-02290b3af39e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2046d2d9-855d-468a-bef8-bcf2fa43b260", null, "Admin", "ADMIN" },
                    { "5dd15d71-487c-4935-a01e-88ac9a79aad4", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2046d2d9-855d-468a-bef8-bcf2fa43b260");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5dd15d71-487c-4935-a01e-88ac9a79aad4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "247264ed-99df-4543-a895-8b20a88b90a4", null, "User", "USER" },
                    { "6009e872-f9bf-43bd-a08b-02290b3af39e", null, "Admin", "ADMIN" }
                });
        }
    }
}

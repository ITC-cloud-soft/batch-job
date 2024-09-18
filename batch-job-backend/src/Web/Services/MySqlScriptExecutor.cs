namespace batch_job_backend.Infrastructure;

using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

public class MySqlScriptExecutor
{
    private readonly string _connectionString;

    public MySqlScriptExecutor(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public async Task ExecuteScriptAsync(string scriptPath)
    {
        var script = await File.ReadAllTextAsync(scriptPath);

        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        using var command = new MySqlCommand(script, connection);
        await command.ExecuteNonQueryAsync();
    }
}

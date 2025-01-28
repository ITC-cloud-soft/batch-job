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
        var sql = configuration.GetConnectionString("DefaultConnection")!;

        // 创建数据库（如果不存在）
        CreateDatabaseIfNotExists(sql);
        Console.WriteLine("sql connection string: " + sql);
        _connectionString = sql;
    }

    private void CreateDatabaseIfNotExists(string connectionString)
    {
        try
        {
            // 从连接字符串中移除数据库部分，以连接到服务器
            var builder = new MySqlConnectionStringBuilder(connectionString);
            var databaseName = builder.Database;
            builder.Database = ""; // 或者用 "sys" 等系统数据库

            using (var connection = new MySqlConnection(builder.ConnectionString))
            {
                connection.Open();
                // 检查数据库是否存在
                using (var command = new MySqlCommand($"CREATE DATABASE IF NOT EXISTS `{databaseName}`;", connection))
                {
                    command.ExecuteNonQuery();
                }
            }

            Console.WriteLine("Database checked/created successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error creating database: " + ex.Message);
        }
    }

    public async Task ExecuteScriptAsync(string scriptPath)
    {
        // 读取 SQL 脚本文件
        var script = await File.ReadAllTextAsync(scriptPath);

        // 连接到 MySQL 数据库并执行脚本
        await using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new MySqlCommand(script, connection);
        await command.ExecuteNonQueryAsync();

        Console.WriteLine("Database initialized successfully.");
    }
}

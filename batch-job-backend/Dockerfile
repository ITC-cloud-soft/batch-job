# 构建阶段
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-dotnet
WORKDIR /src

# 复制解决方案文件和配置文件
COPY batch-job-backend.sln .
COPY Directory.Build.props .
COPY Directory.Packages.props .

# 复制各子项目的项目文件
COPY src/Web/Web.csproj src/Web/
COPY src/Application/Application.csproj src/Application/
COPY src/Infrastructure/Infrastructure.csproj src/Infrastructure/
COPY src/Domain/Domain.csproj src/Domain/


# 清理 NuGet 缓存
RUN dotnet nuget locals all --clear

# 还原解决方案的所有依赖项
RUN dotnet restore

# 复制所有项目的源代码到容器
COPY src/ src/

# 确保源代码已经正确复制
RUN ls -la src/Web

# 设置工作目录到解决方案文件所在目录
WORKDIR /src

# 列出当前工作目录内容以验证 .sln 文件存在
RUN ls -la

# 构建项目
RUN dotnet build -c Release

# 发布 Web 项目，确保输出目录为 /app/publish
RUN dotnet publish src/Web/Web.csproj -c Release -o /app/publish

# 列出发布目录内容以验证文件已正确生成
RUN ls -la /app/publish

# 最终阶段
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build-dotnet /app/publish .

# 暴露应用程序端口
EXPOSE 8080
ENTRYPOINT ["dotnet", "Web.dll"]

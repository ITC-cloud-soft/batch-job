# 使用 .NET SDK 镜像构建后端（包括所有子项目）
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-dotnet
WORKDIR /src

# 复制解决方案文件和各子项目的项目文件，确保路径正确
COPY batch-job-backend.sln .
COPY Directory.Build.props .
COPY Directory.Packages.props .
COPY src/Web/Web.csproj src/Web/
COPY src/Application/Application.csproj src/Application/
COPY src/Infrastructure/Infrastructure.csproj src/Infrastructure/
COPY src/Domain/Domain.csproj src/Domain/

# 列出当前工作目录中的所有文件，以确保复制无误
RUN ls -la

# 清理 NuGet 缓存
RUN dotnet nuget locals all --clear

# 还原解决方案的所有依赖项
RUN dotnet restore

# 列出src目录内容，确保所有源代码都被复制
COPY src/ src/
RUN ls -la src/

# 发布 Web 项目，确保输出目录为 /app/publish
WORKDIR /src/Web
RUN dotnet publish -c Release -o /app/publish

# 构建前端应用程序
FROM node:18 AS build-frontend
WORKDIR /app/frontend

# 复制前端应用程序的源代码
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./

# 设置环境变量
ARG VITE_BASE_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}

# 构建前端应用程序
RUN npm run build

# 构建阶段
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-dotnet
WORKDIR /src

# 复制解决方案文件和配置文件
COPY batch-job-backend.sln .
COPY Directory.Build.props .
COPY Directory.Packages.props .

# 复制各子项目的项目文件
COPY batch-job-backend/src/Web/Web.csproj src/Web/
COPY batch-job-backend/src/Application/Application.csproj src/Application/
COPY batch-job-backend/src/Infrastructure/Infrastructure.csproj src/Infrastructure/
COPY batch-job-backend/src/Domain/Domain.csproj src/Domain/


# 清理 NuGet 缓存
RUN dotnet nuget locals all --clear

# 还原解决方案的所有依赖项
RUN dotnet restore

# 复制所有项目的源代码到容器
COPY batch-job-backend/src/ src/

# 确保源代码已经正确复制
RUN ls -la src/Web

# 设置工作目录到解决方案文件所在目录
WORKDIR /src

# 构建项目
RUN dotnet build -c Release

# 发布 Web 项目，确保输出目录为 /app/publish
RUN dotnet publish src/Web/Web.csproj -c Release -o /app/publish

# 最终阶段
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# 复制后端发布的文件
COPY --from=build-dotnet /app/publish .

# 复制前端构建的文件到 wwwroot
COPY --from=build-frontend /app/frontend/dist ./wwwroot

# 暴露端口并设置环境变量
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "Web.dll"]

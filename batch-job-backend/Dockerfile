# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy the solution file and restore the dependencies
COPY MySolution.sln ./
COPY src/Web/Web.csproj src/Web/
COPY src/Application/Application.csproj src/Application/
COPY src/Domain/Domain.csproj src/Domain/
COPY src/Infrastructure/Infrastructure.csproj src/Infrastructure/

RUN dotnet restore

# Copy the remaining files and build the application
COPY . .
RUN dotnet publish src/Web/Web.csproj -c Release -o /app/publish

# Stage 2: Run
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Web.dll"]

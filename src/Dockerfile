# ===== BUILD =====
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copia só o csproj primeiro (melhora cache)
COPY DashboardDotnet.csproj ./
RUN dotnet restore

# copia o restante
COPY . ./
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# ===== RUNTIME =====
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./

# Kestrel vai ouvir nessa porta dentro do container
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "DashboardDotnet.dll"]

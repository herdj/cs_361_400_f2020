FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 3000
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["CommWebApi.csproj", "./"]
RUN dotnet restore "CommWebApi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "CommWebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CommWebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CommWebApi.dll"]

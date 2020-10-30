FROM ubuntu:20.04

ENV DOTNET_CLI_TELEMETRY_OPTOUT=1

RUN apt-get update \
 && apt-get -y upgrade \
 && apt-get -y install apt-utils \
 && apt-get -y install wget apt-transport-https software-properties-common \
 && wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb \
 && dpkg -i packages-microsoft-prod.deb \
 && apt-get update \
 && apt-get -y install dotnet-sdk-3.1 \
 && apt-get -y install dotnet-runtime-3.1

CMD gunicorn --bind 0.0.0.0:$PORT wsgi

# TimeZone Data
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update -y
RUN apt-get install -y tzdata

# WebApi Server
RUN mkdir /usr/local/lib/TalentWebApi/
COPY ./TalentWebApi.Server/bin/Release/netcoreapp3.1/publish/ /usr/local/lib/TalentWebApi/

#ENV VARIABLES
ARG database_connection_string_arg=""
ARG aspnetcore_environment_arg=""

ENV DATABASE_CONNECTION_STRING=$database_connection_string_arg
ENV ASPNETCORE_ENVIRONMNET=$aspnetcore_environment_arg

COPY ./start-talent-web-api.sh /usr/local/lib/start-talent-web-api.sh
RUN chmod +x /usr/local/lib/start-talent-web-api.sh
CMD ["/usr/local/lib/start-talent-web-api.sh"]

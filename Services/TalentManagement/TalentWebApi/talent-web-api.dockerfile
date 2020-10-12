FROM ubuntu:20.04

# TimeZone Data
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update -y
RUN apt-get install -y tzdata

# WebApi Server
RUN mkdir /usr/local/lib/TalentWebApi/
COPY ./bin/Release/netcoreapp2.2/publish/ /usr/local/lib/TalentWebApi/

#ENV VARIABLES
ARG database_connection_string_arg=""

ENV DATABASE_CONNECTION_STRING=$database_connection_string_arg

COPY ./start-talent-web-api.sh /usr/local/lib/start-talent-web-api.sh
RUN chmod +x /usr/local/lib/start-talent-web-api.sh
CMD ["/usr/local/lib/start-talent-web-api.sh"]

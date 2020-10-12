#!/bin/bash

cd /usr/local/lib/TalentWebApi/ 

dotnet TalentWebApi.Server.dll "$DATABASE_CONNECTION_STRING"
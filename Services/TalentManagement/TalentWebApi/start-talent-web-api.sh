#!/bin/bash

cd /usr/local/lib/TalentWebApi/ 

dotnet TalentWebApi.dll "$DATABASE_CONNECTION_STRING" --urls http://0.0.0.0:80
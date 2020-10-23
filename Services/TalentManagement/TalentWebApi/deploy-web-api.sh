#!/bin/bash
set -e 

APP_TAG="web"
HEROKU_REGISTRY="registry.heroku.com/sharp-crayons-talent-web-api/$APP_TAG"
DATABASE_CONNECTION_STRING_ARG=""
APP_NAME="sharp-crayons-talent-web-api"
DOCKER_FILE="talent-web-api.dockerfile"

echo "Prune Docker"
docker container prune -f
docker image prune -f
docker volume prune -f

echo "Publish solution in Release configuration"
dotnet publish --configuration Release

echo "Build Docker image on $HEROKU_REGISTRY"
docker build -t $HEROKU_REGISTRY:latest --build-arg aspnetcore_environment_arg="Production" --build-arg database_connection_string_arg="$DATABASE_CONNECTION_STRING_ARG" -f ./$DOCKER_FILE .

echo "Push Docker image"
docker push $HEROKU_REGISTRY:latest

echo "Login to Heroku"
heroku login
heroku container:login

echo "Release image to Heroku"
heroku container:release $APP_TAG --app $APP_NAME

echo "Setup web dynos"
heroku ps:scale web=1 --app sharp-crayons-talent-web-api

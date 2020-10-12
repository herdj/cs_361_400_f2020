HEROKU_REGISTRY="registry.heroku.com/sharp-crayons-talent-web-api/web-api"
DATABASE_CONNECTION_STRING_ARG

echo "Publish solution in Release configuration"
dotnet publish --configuration Release

echo "Build Docker image on $HEROKU_REGISTRY"
docker build -t $HEROKU_REGISTRY:latest --build-arg database_connection_string_arg="$DATABASE_CONNECTION_STRING_ARG"  -f ./talent-web-api.dockerfile .

heroku login
heroku container:login
heroku container:push web-api
heroku container:release web-api
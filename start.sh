#!/bin/bash

clear

docker-compose down

echo "Iniciado a aplicação..."

docker-compose up -d

if [ "$1" = "logs" ]; then
    docker-compose logs -f api
fi

#!/bin/bash

# lista de schemas que devem ser gerados de acordo com as classes
yarn typescript-json-schema tsconfig.json 'CreateProdutorDTO' --required --out ./src/swagger/schemas/create-produtor.schema.json
yarn typescript-json-schema tsconfig.json 'UpdateProdutorDTO' --required --out ./src/swagger/schemas/update-produtor.schema.json
yarn typescript-json-schema tsconfig.json 'Produtor' --required --out ./src/swagger/schemas/produtor.schema.json

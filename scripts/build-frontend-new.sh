#!/bin/bash

MODE=$1

if [ "$MODE" = "build-share" ]; then
  bash ./build-share-new.sh
fi

cd ..

npm run build -w packages-frontend/data-fetch
# npm run build -w packages-frontend/subscription

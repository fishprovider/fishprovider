#!/bin/bash

MODE=$1

if [ "$MODE" = "build-share" ]; then
  bash ./build-share-new.sh
fi

cd ..

function frameworks() {
  npm run build -w packages-frontend/local &
  npm run build -w packages-frontend/store &
  wait

  npm run build -w packages-frontend/fish-api
  npm run build -w packages-frontend/offline-first
}

frameworks &
wait

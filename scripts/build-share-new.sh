#!/bin/bash

cd ..

npm run build -w packages-share/core &
npm run build -w packages-share/core-utils &
wait

npm run build -w packages-share/base-services

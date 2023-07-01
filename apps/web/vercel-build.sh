#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "dev" || "$VERCEL_GIT_COMMIT_REF" == "canary" || "$VERCEL_GIT_COMMIT_REF" == "release" ]]; then
  echo "✅ - Build started"
  exit 1
else
  echo "🛑 - Build ignored"
  exit 0
fi

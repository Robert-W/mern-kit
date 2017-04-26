#!/bin/bash

if [ "$NODE_ENV" = "production" ]; then
  node packages/server/server
else
  node scripts/nodemon.js
fi

#!/bin/bash

echo "Clearing the cache and building products..."
rm -rf dist
rm -rf types
rm -rf node_modules/.cache
rm -rf node_modules/.vite
find . -name '*.tsbuildinfo' -delete
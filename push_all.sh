#!/bin/bash

echo "==============================="
echo "Pushing Backend..."
echo "==============================="
cd ~/OneDrive/Desktop/check/CODESHERPA/backend || exit

git add .
git commit -m "Update Backend changes"
git push origin main

echo "==============================="
echo "Pushing Frontend..."
echo "==============================="
cd ~/OneDrive/Desktop/check/CODESHERPA/frontend || exit

git add .
git commit -m "Update Frontend changes"
git push origin main

echo "==============================="
echo "All changes pushed successfully!"
echo "==============================="

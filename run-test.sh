#!/bin/bash

echo "Running tests for nubian-dsa-connect"

echo "Starting ganache-cli"
npm run ganache:fork &

sleep 5

echo "Running tests"
npm run test

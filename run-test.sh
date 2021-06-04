#!/bin/bash

echo "Running tests for bxdfi-dsa-connect"

echo "Starting ganache-cli"
npm run ganache:fork &

sleep 5

echo "Running tests"
npm run test

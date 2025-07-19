#!/bin/bash

# Canister ID
ASSETS_CANISTER_ID="uodzj-4aaaa-aaaag-auexa-cai"

echo "Listing files in assets canister ($ASSETS_CANISTER_ID)..."

# Call list with empty record argument
dfx canister --network ic call "$ASSETS_CANISTER_ID" list '(record {})'

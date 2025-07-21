#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to format cycles in trillions
format_cycles() {
    local cycles=$1
    if [[ $cycles =~ ^[0-9]+$ ]]; then
        # Convert to trillions using bash arithmetic (avoiding bc dependency)
        local trillions_int=$((cycles / 1000000000000))
        local remainder=$((cycles % 1000000000000))
        local decimal=$(printf "%03d" $((remainder / 1000000000)))
        echo "${trillions_int}.${decimal}T"
    else
        echo "N/A"
    fi
}

# Function to extract canister ID from JSON (without jq)
extract_canister_id() {
    local json_content="$1"
    local canister_name="$2"
    
    # Look for the pattern: "canister_name": { "ic": "canister-id" }
    local line=$(echo "$json_content" | grep -A 2 "\"$canister_name\":" | grep "\"ic\":")
    
    if [ -n "$line" ]; then
        # Extract the canister ID between quotes after "ic":
        local canister_id=$(echo "$line" | sed 's/.*"ic":[[:space:]]*"\([^"]*\)".*/\1/')
        echo "$canister_id"
    else
        echo ""
    fi
}

# Function to get cycles for a canister
get_cycles() {
    local canister_id=$1
    local canister_name=$2
    
    echo -e "${BLUE}Checking cycles for ${canister_name} (${canister_id})...${NC}"
    
    # Get cycles balance using dfx
    local cycles_output=$(dfx canister --network ic status $canister_id 2>&1 | grep "Balance:" | awk '{print $2}' | tr -d ',_')
    
    if [ -n "$cycles_output" ]; then
        local formatted_cycles=$(format_cycles $cycles_output)
        echo -e "${GREEN}✓ ${canister_name}: ${formatted_cycles} cycles${NC}"
        echo "  Raw: $cycles_output cycles"
    else
        echo -e "${RED}✗ Failed to get cycles for ${canister_name}${NC}"
    fi
    echo ""
}

echo -e "${YELLOW}===========================================${NC}"
echo -e "${YELLOW}        IC Canister Cycles Check${NC}"
echo -e "${YELLOW}===========================================${NC}"
echo ""

# Check if canister_ids.json exists
if [ ! -f "canister_ids.json" ]; then
    echo -e "${RED}Error: canister_ids.json not found in current directory${NC}"
    exit 1
fi

# Read the entire JSON file
json_content=$(cat canister_ids.json)

# Extract canister IDs using bash string manipulation
backend_id=$(extract_canister_id "$json_content" "backend")
frontend_id=$(extract_canister_id "$json_content" "frontend")
users_id=$(extract_canister_id "$json_content" "users")

# Validate extracted IDs
if [ -z "$backend_id" ] || [ -z "$frontend_id" ] || [ -z "$users_id" ]; then
    echo -e "${RED}Error: Could not extract canister IDs from canister_ids.json${NC}"
    echo "Found:"
    echo "  Backend:  '$backend_id'"
    echo "  Frontend: '$frontend_id'"
    echo "  Users:    '$users_id'"
    exit 1
fi

echo -e "${BLUE}Found canister IDs:${NC}"
echo "  Backend:  $backend_id"
echo "  Frontend: $frontend_id"
echo "  Users:    $users_id"
echo ""

# Check cycles for each canister
get_cycles $backend_id "Backend"
get_cycles $frontend_id "Frontend" 
get_cycles $users_id "Users"

echo -e "${YELLOW}===========================================${NC}"
echo -e "${GREEN}Cycles check completed!${NC}"
echo -e "${YELLOW}===========================================${NC}" 
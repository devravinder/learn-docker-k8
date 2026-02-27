#!/bin/bash
# Fast Reset Script
# This script executes the init scripts against a running container to quickly reset the schema.

set -e

CONTAINER_NAME="oracle-19c-local"

echo "Resetting schema for container: $CONTAINER_NAME..."

# Execute the create user script inside the container
docker exec -i $CONTAINER_NAME /opt/oracle/scripts/startup/01_create_user.sh

# Execute the seed data script inside the container
docker exec -i $CONTAINER_NAME /opt/oracle/scripts/startup/02_seed_data.sh

echo "Fast reset complete!"

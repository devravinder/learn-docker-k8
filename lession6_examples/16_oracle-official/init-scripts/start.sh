
#!/bin/bash
# Wait for the database to be up and run the initialization SQL scripts.
# Make sure this file is executable: chmod +x oracle-init/setup.sh

set -e

: "${ORACLE_PWD:?ORACLE_PWD must be set in environment}"
: "${ORACLE_PDB:?ORACLE_PDB must be set in environment}"

MAX_WAIT=900
SLEEP_INTERVAL=5
elapsed=0

echo "Waiting for Oracle to be available..."
# Try connecting as SYS until success or timeout
while ! echo "SELECT 1 FROM DUAL;" | sqlplus -s sys/"$ORACLE_PWD" as sysdba | grep -q 1; do
  sleep $SLEEP_INTERVAL
  elapsed=$((elapsed + SLEEP_INTERVAL))
  if [ $elapsed -gt $MAX_WAIT ]; then
    echo "Timed out waiting for Oracle to start"
    exit 1
  fi
done

echo "Oracle is up. Running create_user.sql..."
sqlplus -s sys/"$ORACLE_PWD" as sysdba @/opt/oracle/scripts/setup/create_user.sql

# Optionally run seed script; if you prefer manual run, comment the next lines.
echo "Running seed_data.sql..."
sqlplus -s sys/"$ORACLE_PWD" as sysdba @/opt/oracle/scripts/setup/seed_data.sql

echo "Initialization finished."
#!/bin/bash
set -e

echo ">>> [01] Creating user $LOCAL_DB_USER in PDB $ORACLE_PDB"

# Key fix: use OS auth to connect to CDB, then switch container to PDB
sqlplus -s / as sysdba <<EOF
-- Switch into the PDB
ALTER SESSION SET CONTAINER = ${ORACLE_PDB};

-- Drop user if exists (clean reset support)
BEGIN
  FOR u IN (SELECT username FROM dba_users WHERE username = UPPER('${LOCAL_DB_USER}')) LOOP
    EXECUTE IMMEDIATE 'DROP USER ' || u.username || ' CASCADE';
  END LOOP;
END;
/

-- Create user
CREATE USER ${LOCAL_DB_USER} IDENTIFIED BY "${LOCAL_DB_PWD}";

-- Grant permissions
GRANT CONNECT, RESOURCE, DBA TO ${LOCAL_DB_USER};
ALTER USER ${LOCAL_DB_USER} QUOTA UNLIMITED ON USERS;

EXIT;
EOF

echo ">>> [01] User ${LOCAL_DB_USER} created successfully in ${ORACLE_PDB}"
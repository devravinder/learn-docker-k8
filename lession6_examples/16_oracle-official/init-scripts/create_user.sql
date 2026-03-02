-- create_user.sql
-- Run as SYS (this script will switch to the target PDB before creating the user)
SET ECHO ON
SET FEEDBACK ON
WHENEVER SQLERROR EXIT SQL.SQLCODE

-- Ensure we run in the PDB specified by ORACLE_PDB env (compose sets ORACLE_PDB=dcs_core_local)
-- If the PDB does not exist, this will error. Adjust ORACLE_PDB in compose if needed.
ALTER SESSION SET CONTAINER = dcs_core_local;
PROMPT Current Container set to dcs_core_local

-- Create user DCS with password Itest@123 (idempotent: drop if exists is optional)
BEGIN
  EXECUTE IMMEDIATE 'CREATE USER DCS IDENTIFIED BY "Itest@123"';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE = -01920 OR SQLCODE = -01918 OR SQLCODE = -01921 OR SQLCODE = -01919 THEN
      NULL; -- ignore name-related errors
    ELSE
      IF SQLCODE = -01921 THEN
        NULL;
      ELSIF SQLCODE = -01920 THEN
        NULL;
      ELSE
        RAISE;
      END IF;
    END IF;
END;
/

-- If user exists, try to alter the password to ensure it's set to the desired value
BEGIN
  EXECUTE IMMEDIATE 'ALTER USER DCS IDENTIFIED BY "Itest@123"';
EXCEPTION WHEN OTHERS THEN
  NULL;
END;
/

-- Grant privileges and quotas
-- Give minimal required privileges for an application user
GRANT CREATE SESSION TO DCS;
GRANT CREATE TABLE TO DCS;
GRANT CREATE SEQUENCE TO DCS;
GRANT CREATE VIEW TO DCS;
GRANT CREATE PROCEDURE TO DCS;
GRANT CREATE TRIGGER TO DCS;
GRANT CREATE TYPE TO DCS;
GRANT UNLIMITED TABLESPACE TO DCS;

-- Optionally grant connect role and resource (older DB versions); explicit grants above preferred
-- GRANT CONNECT, RESOURCE TO DCS;

-- Ensure DCS has quota on USERS tablespace (modify tablespace name to your environment if different)
BEGIN
  EXECUTE IMMEDIATE 'ALTER USER DCS QUOTA UNLIMITED ON USERS';
EXCEPTION WHEN OTHERS THEN
  DBMS_OUTPUT.PUT_LINE('Could not set quota on USERS: ' || SQLERRM);
END;
/

COMMIT;

PROMPT User DCS created/updated and privileges granted.
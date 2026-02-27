#!/bin/bash
set -e

echo ">>> [02] Seeding data for $LOCAL_DB_USER in PDB $ORACLE_PDB"

# Connect via sysdba and switch container — avoids TNS resolution issues
sqlplus -s / as sysdba <<EOF
ALTER SESSION SET CONTAINER = ${ORACLE_PDB};
ALTER SESSION SET CURRENT_SCHEMA = ${LOCAL_DB_USER};

-- ========================
-- TABLES
-- ========================

CREATE TABLE ${LOCAL_DB_USER}.employees (
    id          NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR2(100) NOT NULL,
    department  VARCHAR2(50),
    salary      NUMBER(10,2),
    hired_date  DATE DEFAULT SYSDATE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ${LOCAL_DB_USER}.departments (
    id    NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name  VARCHAR2(100) NOT NULL,
    location VARCHAR2(100)
);

CREATE TABLE ${LOCAL_DB_USER}.sample_table (
    id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name       VARCHAR2(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- PROCEDURES
-- ========================

CREATE OR REPLACE PROCEDURE ${LOCAL_DB_USER}.insert_sample(p_name IN VARCHAR2)
AS
BEGIN
    INSERT INTO ${LOCAL_DB_USER}.sample_table (name) VALUES (p_name);
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE ${LOCAL_DB_USER}.hire_employee(
    p_name       IN VARCHAR2,
    p_department IN VARCHAR2,
    p_salary     IN NUMBER
)
AS
BEGIN
    INSERT INTO ${LOCAL_DB_USER}.employees (name, department, salary)
    VALUES (p_name, p_department, p_salary);
    COMMIT;
END;
/

-- ========================
-- FUNCTIONS
-- ========================

CREATE OR REPLACE FUNCTION ${LOCAL_DB_USER}.get_sample_count RETURN NUMBER
AS
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count FROM ${LOCAL_DB_USER}.sample_table;
    RETURN v_count;
END;
/

CREATE OR REPLACE FUNCTION ${LOCAL_DB_USER}.get_avg_salary(p_dept IN VARCHAR2) RETURN NUMBER
AS
    v_avg NUMBER;
BEGIN
    SELECT AVG(salary) INTO v_avg
    FROM ${LOCAL_DB_USER}.employees
    WHERE department = p_dept;
    RETURN NVL(v_avg, 0);
END;
/

-- ========================
-- SEED DATA
-- ========================

INSERT INTO ${LOCAL_DB_USER}.departments (name, location) VALUES ('Engineering', 'Hyderabad');
INSERT INTO ${LOCAL_DB_USER}.departments (name, location) VALUES ('Marketing', 'Mumbai');
INSERT INTO ${LOCAL_DB_USER}.departments (name, location) VALUES ('HR', 'Bangalore');

EXEC ${LOCAL_DB_USER}.hire_employee('Alice Kumar', 'Engineering', 95000);
EXEC ${LOCAL_DB_USER}.hire_employee('Bob Sharma', 'Engineering', 87000);
EXEC ${LOCAL_DB_USER}.hire_employee('Carol Singh', 'Marketing', 72000);
EXEC ${LOCAL_DB_USER}.hire_employee('David Rao', 'HR', 65000);
EXEC ${LOCAL_DB_USER}.hire_employee('Eva Nair', 'Engineering', 102000);

EXEC ${LOCAL_DB_USER}.insert_sample('Initial Setup Row 1');
EXEC ${LOCAL_DB_USER}.insert_sample('Initial Setup Row 2');
EXEC ${LOCAL_DB_USER}.insert_sample('Initial Setup Row 3');

COMMIT;

EXIT;
EOF

echo ">>> [02] Seed data inserted successfully."
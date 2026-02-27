# Oracle Docker Container Setup

## Setup

```bash
 docker compose up -d
```

## Connecting

```bash
docker exec -it --user oracle oracle-19c-local bash
```

```bash
export ORACLE_SID=ORCLCDB
sqlplus / as sysdba
ALTER SESSION SET CONTAINER = LOCAL_DB;
```

```bash
SELECT * FROM local_user.employees WHERE ROWNUM <= 2;
```

## Connecting from App ( Dbeaver )

```bash
URL=jdbc:oracle:thin:@localhost:1521/LOCAL_DB
HOST=localhost
PORT=1521
USER=local_user
PWD=Itest@123

# or 

URL=jdbc:oracle:thin:@localhost:1521/ORCLCDB
HOST=localhost
PORT=1521
USER=system
PWD=Itest@123

```

## Cleanup

```bash
docker compose down -v
```

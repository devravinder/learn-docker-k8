# Official Oracle Image Setup

## Step 1 — Clone Oracle's official docker-images repo

```bash
git clone https://github.com/oracle/docker-images.git
# cd docker-images/OracleDatabase/SingleInstance/dockerfiles
```

## Step 2 — Download Oracle 19c binary from Oracle website (free account needed)

- visit [URL](https://www.oracle.com/database/technologies/oracle19c-linux-downloads.html)
- download the zip file `LINUX.X64_193000_db_home.zip`
- Copy the zip (DO NOT unzip) into `docker-images/OracleDatabase/SingleInstance/dockerfiles/19.3.0`
- or download the zip file directly into `docker-images/OracleDatabase/SingleInstance/dockerfiles/19.3.0`

## Step 3 — Build the image (~20-30 mins)

```bash
./buildContainerImage.sh -v 19.3.0 -e
 # This creates local image: oracle/database:19.3.0-ee
```

## Optional Step 4 - Publish the image

create the a private repo in docker hub `oracle19c`

```bash
docker tag oracle/database:19.3.0-ee devravinder/oracle19c:19.3.0-ee
```

```bash
docker login
```

```bash
docker push devravinder/oracle19c:19.3.0-ee
```

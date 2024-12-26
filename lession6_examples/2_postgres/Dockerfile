FROM postgres:latest

COPY init-script.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
# ENV POSTGRES_INITDB_ARGS="--file=/docker-entrypoint-initdb.d/init-script.sql" 

EXPOSE 5432



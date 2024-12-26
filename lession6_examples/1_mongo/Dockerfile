FROM mongo:latest

COPY init-script.js /docker-entrypoint-initdb.d/


ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin
ENV AUTH=enabled


EXPOSE 27017





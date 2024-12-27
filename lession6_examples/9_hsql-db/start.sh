
# one time
# docker build --tag hsql-local .

docker run -d -p 9001:9001 --name hsql-local hsql-local


# jdbc:hsqldb:hsql://hsql:hsql@localhost:9001/hsql
# jdbc:hsqldb:hsql://localhost:9001/hsql
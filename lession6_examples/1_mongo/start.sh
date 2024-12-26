
# one time
# docker build --tag mongo-local .

docker run -d -p 27017:27017 --name mongo-local mongo-local

# connection string
# mongodb://usename:password@host:port/db
# mongodb://dev:dev@localhost:27017/dev
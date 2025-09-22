
# one time
# docker build --tag postgres-local .

docker run -d -p 5432:5432 --name postgres-local postgres-local


# jdbc:postgresql://localhost:5432?user=postgres&password=postgres

# one time
# $ docker build --tag elastic-local .

docker run -d -p 9200:9200 --name elastic-local elastic-local

# visit http://localhost:9200
# visit http://elastic:elastic@localhost:9200  # with credentials

# to connect from another container
  # http://elastic:elastic@container-ip-address:9200
  # http://elastic:elastic@172.17.0.6:9200

# visit http://elastic:elastic@localhost:9200/_cat/indices?v



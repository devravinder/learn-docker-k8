
# one time
# $ docker build --tag elasticsearch-hq-ui .

docker run -d -p 5000:5000 --name elasticsearch-hq-ui elasticsearch-hq-ui

# open http://localhost:5000

# to connect to elastic search
# use credentials: http://user:passweord@container-ip:9200
# use credentials: http://ravinder:ravinder@172.17.0.6:9200

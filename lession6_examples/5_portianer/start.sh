
# only one time
# docker build -t portainer-ui .

docker run -d -p 8000:8000 -p 9000:9000  --name portainer-ui --restart=always -v ./data:/data -v /var/run/docker.sock:/var/run/docker.sock portainer-ui

# open browser and go to http://localhost:9000

# give user name 'admin' and password '123456789012' # we can give any
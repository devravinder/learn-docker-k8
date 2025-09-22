
# only one time
# docker build -t portainer .

# only one time
# docker volume create portainer_data

 docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v portainer_data:/data -v /var/run/docker.sock:/var/run/docker.sock portainer

# open browser and go to http://localhost:9000

# give user name 'admin' and password '123456789012' # we can give any
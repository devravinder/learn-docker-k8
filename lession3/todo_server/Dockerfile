FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app

# the below directories are used to store logs & db files... we need to make these directories persistent
RUN mkdir -p data_container/logs/error
RUN mkdir -p data_container/logs/info
RUN mkdir -p data_container/db/

COPY . .
EXPOSE 8080
RUN npm install
CMD ["npm", "run", "dev"]

# $ docker build -t todo_server_img .

#  named valume
# $ docker volume create todo_server_vol
# $ docker run -dp 8080:8080 -v todo_server_vol:/app/data_container --name todo_server todo_server_img

# (or)


# bind volume   ... useful for continuos development... to watch changes & to restart ( like using nodemon)
# $ docker run -dp 8080:8080 -v $(pwd):/app --name todo_server todo_server_img


######################### network

# $ docker network create todo_app

# $ docker run -dp 8080:8080 -v $(pwd):/app -e NODE_ENV=dev  --network todo_app --network-alias server  --name todo_server todo_server_img 


############################### without Dockerfile ####################

# docker run -dp 8080:8080 -w /app -v $(pwd):/app -e NODE_ENV=dev  --network todo_app --network-alias server  --name todo_server node:12-alpine  sh -c "npm install && npm run dev" 

# here we are creating container 'todo_server' from node:12-alpine image and running shell command [ -c flag for shell commands in string format]

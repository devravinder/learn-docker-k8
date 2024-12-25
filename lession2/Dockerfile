FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app

# the below directories are used to store logs & db files... we need to make these directories persistent
RUN mkdir -p data_container/logs/error
RUN mkdir -p data_container/logs/info
RUN mkdir -p data_container/db/

COPY . .
EXPOSE 8080
EXPOSE 9229


RUN npm install
# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "debug"]





############################################################


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


#############################################################################
################################ Debugging ####################################
 #  uncomment 'CMD ["npm", "run", "debug"]' in Dockerfile
 #  add "debug": "nodemon --inspect=0.0.0.0:9229 src/app.js"  in package.json
 #  expose port :9229
 #  build the image  [ $ docker build -t todo_server_img .]
 # run [ docker run -p 8080:8080 -p 9229:9229 -v $(pwd):/app --name todo_server todo_server_img ]



 # 2 ways to debugg

############# 1) debugging with Chrome Dev tools ###########
  # open in chrome     'chrome://inspect'
  # click on 'Open dedicated DevTools for Node'
  #  It'll automatically shows the sorce code in 'Node' tab -> open any file & keep breakpoints & debug



############# 2) debugging with VSC ###########
  # instll chrome debugger for vsc
  #  click on debug icon from left tab
  #  add an 'Docker attch node' debugger configuration...like below
#   {
#             "type": "node",
#             "request": "attach",
#             "name": "Docker: Attach to Node",
#             "address": "0.0.0.0",
#             "port": 9229,
#             "remoteRoot": "/app",
#             "localRoot": "${workspaceFolder}/others/learn/docker_k8",
#             "outFiles": [
#                 "${workspaceFolder}/others/learn/docker_k8"       
#             ],
#             "skipFiles": [
#                 "<node_internals>/**",
#                 "**/node_modules/**"
#             ],
#         }
#
# build & run the the container
# keep breakpoints in code & click on debugger in left tab
# ...then click on play symbol...by selecting the above debugger configuration

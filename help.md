
This project is implemented by following the docs: https://docs.docker.com/get-started/

every branch is a seperate tutorial(Lession)

every branch notes we can find in this file

Note: all the commands are with respect to project root folder ( execute all the commands in project folder )



----------- for CI/CD with github actions/worflows
    https://docs.docker.com/language/nodejs/configure-ci-cd/





#############################################################################################################
########################################## Lession - 1 ######################################################
#############################################################################################################


###########################################

 contents:-
 - basic Dockerfile configuration
 - creating images & containers 
 - port mapping
 - basic useful commands
 - sharing the images ( pushing to repo/docker_hub)
   

#############################################
*) building image from Dockerfile

   $ docker build -t image_title Dockerfile_folder_path   
    (or)  
   $ docker build -t todo_server_img .

   $ docker build -t kbdrreddy7/todo_server_img         # docker build -t docker_hub_userId/image_name

   $ docker build -t kbdrreddy7/todo_server_img:1.2     # docker build -t docker_hub_userId/image_name:tag_name

*) to  create & run container
    
    $ docker run todo_server_img        # automatic name will be assigned to the container

          $ dokcer run image_name
        /*
        Docker engine look for the image locally, if not found, it'll try pull from docker_hub,
        then it'll create container with a random name
        
        */

    $ docker run -d todo_server_img     # in detached mode ( in background )

    $ docker run -d --name todo_server todo_server_img    # assigning manual name to container


    ------------- create & run seperately

    $ docker create --name todo_server todo_server_img    #  $ docker create -p 80:8080 --name todo_server todo_server_img

    $ docker run todo_server                      # it'll run the container in detached mode


*)   useful commands

    $ docker image ls  # list images

    $ docker container ls  # list running containers

    $ docker container ls -a  # list all the containers

    $ docker ps         # list running process  ( running container is process )

    $ docker ps -a      # list all the process

    $ docker container stop container_id_or_name   # to stop container

    $ docker container start container_id  # to start container

    $ docker container logs  # to see container logs

    $ docker inspect container_id   # to inspect

    $ docker image history image_name     # to see the layers

    $ docker image history --no-trunc image_name   # to see the layers ...without text truncate

    $ docker attach container_id     # to attch the container input / output logs to the terminal

    /*
    Note:- 
      when you are in interactive mode (-it), if enter 'exit'..we'll exit from container,

      but when we are in attach 'exit' won't work,
      
      - a) to exit attach mode press -> ctrl+P ctrl+Q  // but this is not workin in Ubuntu
      
      - b) we can pass detach keys flag..to reset da keys
       https://stackoverflow.com/questions/25267372/correct-way-to-detach-from-a-container-without-stopping-it

        $ docker attach --detach-keys="ctrl-a,x"  container_id  # press CTRL+A and then X to exit
                                                                # this also not working in Ubuntu


     - c) pass "-sig-proxy=false" while attaching the press ctrl+c to exit attach mode

     https://stackoverflow.com/questions/48954683/docker-attach-why-cant-i-detach-from-my-docker-container

       $ docker attach --sig-proxy=false container_id
        ctrl+c

      ** if we press ctrl+c  without passing the --sig-proxy=false ... then it'll stop docker all the containers 
    
    */

    
    ------ executing commands in container

    $ docker exec container_id_or_name COMMAND COMMAND_ARG

    eg:-

    $ docker exec todo_server ls
    $ docker exec todo_server ls node_modules
    $ docker exec -it todo_server /bin/sh      # interactive termainal

    /* 
     cmd will exit from the container...if the command(app)/process is not running,
     but some times we need to be shell/command mode even if it is not running...for that we use "-it" flag

     eg:- /bin/sh is not a running process...but to keep interactive mode ....we passed -it

    */

  ------------------- deleting -----------------


    $ docker rm -vf $(docker ps -a -q)    # To delete all containers including its volumes 

           # $ docker ps -a -q  # gives running process container_ids

    $ docker rm -f $(docker ps -a -q)    # To delete all containers (not volumes ) 

    $ docker rmi -f $(docker images -a -q)  # To delete all the images

    $ docker container prune     # to remove all the stopped containers

    $ docker image prune     # to remove all the unused images

    $ docker rm container_id   # to remove container   

    $ docker rm -f container_id   # to remove container   force ( stop & remove )

    $ docker rmi image_name  # to remove docker images






*) in Dockerfile: EXPOSE 8080 means...the port is enabled/allowed for expose, but not mapped to external/host port
   mapping to host port: 3 ways
   --------------------------
  
   $ docker run -d -P todo_server_img               # docker engine will do auto port mapping  [ uppercase -P ]

   $ docker run -d -p 80:8080 todo_server_img       # manual port mapping   [ smallcase -p host_port:container_port ]

   $ docker run -d --network=host todo_server_img   # same port ( running container on host networks )



   [
      -p (or) -P means publish ( not port ), we can use '--publish' insteadof '-p' flag
      - publish port

   ]


--------------------------------- sharing / pushing to repo / hub ----------

   - first create an account in docker hub, then login from local systme terminal
      $ docker login -u kbdrreddy7

    2 ways to publish

   1) 
    $ docker build -t kbdrreddy7/todo_server_img  .  # here image name contains docker_hub userId
    $ dokcer push kbdrreddy7/todo_server_img

  2) if the local image name doesn't contain the docker userId

     $ docker build -t todo_server_img
     $ docker tag todo_server_img kbdrreddy7/todo_server_img

        #  docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
        # if we don't pass ant tag..it'll take latest
        # tag actually creates a reference image ( not actual) that points to a particual version ( tag ) of image 

    $ docker push  kbdrreddy7/todo_server_img


 ------------ to pull image
    $ docker pull kbdrreddy7/todo_server_img



 ############################### running container without Dockerfile ####################

$ docker run -dp 8080:8080 -w /app -e NODE_ENV=dev  --name todo_server node:12-alpine  sh -c "npm install && npm run dev" 

  - here we are creating container 'todo_server' from node:12-alpine image and running shell command [ -c flag for shell commands in string format]
   



#############################################################################################################
########################################## Lession - 2 ######################################################
#############################################################################################################


###########################################

 contents:-
 - Docker volumes
     a) named volumes
     b) bind volumes

 - continuos development with bind volumes
 

#############################################



*)  named volumes
    -------------------


    $docker volume create todo_server_vol     # to create named volume
   
   /*
   this will crate volume in: 
            /var/lib/docker/volumes
                                  /todo_server_vol/_data
   
   */

   - to attach the volume

   $ docker run -dp 8080:8080 -v todo_server_vol:/app/data_container --name todo_server todo_server_img



*) bind volumes
-------------

    $ docker run -dp 8080:8080 -v host_dir_path:/app/data_container --name todo_server todo_server_img




Note:- 
    actually named volumes / bind volumes won't create a copy of the volumes,
    but it'll mount the host destination volume to container volume

    ref: https://stackoverflow.com/questions/41386985/docker-volume-storage-duplication



===============

*) continuos development with bind volume

   - we need bind the code development directory to container working directory
   - then we need to use required libraries to watch the code changes & to restart the app
            eg:- nodemon in nodeJs



###########################

$ docker network create todo_app

$ docker run -dp 8080:8080 -v $(pwd):/app -e NODE_ENV=dev  --network todo_app --network-alias server  --name todo_server todo_server_img 


######################################## to run without docker file #################

$ docker run -dp 8080:8080 -w /app -v $(pwd):/app -e NODE_ENV=dev  --network todo_app --network-alias server  --name todo_server node:12-alpine  sh -c "npm install && npm run dev" 

# here we are creating container 'todo_server' from node:12-alpine image and running shell command [ -c flag for shell commands in string format]


================================================================================
============================== Debugging ==============================
 1) attach the debugger & expose the port
  add "debug": "nodemon --inspect=0.0.0.0:9229 src/app.js"  in package.json
  expose port :9229
  build the image  [ $ docker build -t todo_server_img .]
  run [ docker run -p 8080:8080 -p 9229:9229 -v $(pwd):/app --name todo_server todo_server_img ]



 2) debugging
  2 ways to debugg

  ========== 1) debugging with Chrome Dev tools ===========
   open in chrome     'chrome://inspect'
   click on 'Open dedicated DevTools for Node'
   It'll automatically shows the sorce code in 'Node' tab -> open any file & keep breakpoints & debug



  ========== 2) debugging with VSC ==========
   instll chrome debugger for vsc
    click on debug icon from left tab
    add an 'Docker attch node' debugger configuration...like below
   {
             "type": "node",
             "request": "attach",
             "name": "Docker: Attach to Node",
             "address": "0.0.0.0",
             "port": 9229,
             "remoteRoot": "/app",
             "localRoot": "${workspaceFolder}/others/learn/docker_k8",
             "outFiles": [
                 "${workspaceFolder}/others/learn/docker_k8"       
             ],
             "skipFiles": [
                 "<node_internals>/**",
                 "**/node_modules/**"
             ],
         }

 build & run the the container,
 keep breakpoints in code & click on debugger in left tab
 ...then click on play symbol...by selecting the above debugger configuration





#############################################################################################################
########################################## Lession - 3 ######################################################
#############################################################################################################


###########################################

 contents:-
 - network & network aliases
    container apps interaction over the docker network

 - debugging network with netshoot   

#############################################


$ docker network create todo_app   #  to create network

# running containers on a specific network

$ docker run -dp 8080:8080 -v $(pwd):/app -e NODE_ENV=dev  --network todo_app --network-alias server  --name todo_server todo_server_img 

# $ docker run -dp 7070:7070 -v $(pwd):/app -e NODE_ENV=dev  --network todo_app --network-alias proxy  --name todo_proxy todo_proxy_img 


/*
 in above examples both containers running on 
    'todo_app' network with host names server & proxy

   we can access one container from other with host name


      eg:
         to access todo_app port 8080 from todo_proxy
         we can use http://server:8080

*/


------------------------- debugging network

$ docker run -it --network todo_app nicolaka/netshoot

$ dig server

$ dig proxy


------
 these are useful for micro services interactions & to connect database

#############################################################################################################
########################################## Lession - 4 ######################################################
#############################################################################################################


###########################################

 contents:-
 - docker-compose basic configuration

#############################################


 

------------------- basic docker-compose commands -------------

$ docker-compose up         # to start all the services

$ docker-compose stop

$ docker-compose restart

$ docker-compose up -d      # -d detached mode   # to start all the services

$ docker-compose logs -f    # -f follows ...like continus logs ( attched )

$ docker-compose logs -f service_name

$ docker-compose down       # to stop all the services


-----------------------------------------------------------

1) when we run 
     $ docker-compose up 

        *) it'll create containers with the service name
        *) it'll create the mentioned named volumes (or) mount the bind volumes
        *) it'll create the network 
                                if specified with specified name
                                else app_folder_name_default

        *) if we run without -d flag, 
                    - all the logs we can see,
                    - ctrl + c will stop all the services

        *) f we run with -d flag,
                    - all the services will be started in detached mode



2) when we run
    $ docker-compose down

        *) it'll stop & delete all the container & networks
        *) by default it won't delete volumes
                    to delete volumes
                        $ docker-compose down --volumes
# Help

This project is implemented by following [docs](https://docs.docker.com/get-started/)

- Each branch represents a separate tutorial (`Lesson`)
- Notes for each branch are documented here
- Run all commands from **project root folder**

CI/CD [reference](https://docs.docker.com/language/nodejs/configure-ci-cd/)

---

## Lesson 1

### Contents

- Basic Dockerfile configuration  
- Creating images & containers  
- Port mapping  
- Useful commands  
- Sharing images (Docker Hub)

---

### Build Image

```bash
docker build -t image_title Dockerfile_folder_path
docker build -t todo_server_img .
docker build -t kbdrreddy7/todo_server_img
docker build -t kbdrreddy7/todo_server_img:1.2
````

---

### Create & Run Container

```bash
docker run todo_server_img
docker run -d todo_server_img
docker run -d --name todo_server todo_server_img
```

Notes:

- Docker checks locally
- If not found → pulls from hub
- Random name assigned if not given

---

### Create & Run Separately

```bash
docker create --name todo_server todo_server_img
docker run todo_server
```

---

### Useful Commands

```bash
docker image ls
docker container ls
docker container ls -a
docker ps
docker ps -a
docker container stop <id>
docker container start <id>
docker container logs <id>
docker inspect <id>
docker image history image_name
docker image history --no-trunc image_name
docker attach <id>
```

---

### Attach Mode Notes

- `exit` works only with `-it`
- Detach:

```bash
docker attach --sig-proxy=false <id>
Ctrl + C
```

---

### Execute Inside Container

```bash
docker exec todo_server ls
docker exec todo_server ls node_modules
docker exec -it todo_server /bin/sh
```

---

### Deleting

```bash
docker rm -vf $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -a -q)
docker container prune
docker image prune
docker rm <id>
docker rm -f <id>
docker rmi image_name
```

---

### Port Mapping

```bash
docker run -d -P todo_server_img
docker run -d -p 80:8080 todo_server_img
docker run -d --network=host todo_server_img
```

---

### Push to Docker Hub

```bash
docker login -u kbdrreddy7
```

#### Method 1

```bash
docker build -t kbdrreddy7/todo_server_img .
docker push kbdrreddy7/todo_server_img
```

#### Method 2

```bash
docker build -t todo_server_img
docker tag todo_server_img kbdrreddy7/todo_server_img
docker push kbdrreddy7/todo_server_img
```

Pull:

```bash
docker pull kbdrreddy7/todo_server_img
```

---

### Run Without Dockerfile

```bash
docker run -dp 8080:8080 \
-w /app \
-e NODE_ENV=dev \
--name todo_server \
node:12-alpine \
sh -c "npm install && npm run dev"
```

---

## Lesson 2

### Contents

- Docker volumes

  - Named
  - Bind
- Continuous development

---

### Named Volumes

```bash
docker volume create todo_server_vol
```

Location:

```bash
/var/lib/docker/volumes/todo_server_vol/_data
```

Attach:

```bash
docker run -dp 8080:8080 \
-v todo_server_vol:/app/data_container \
--name todo_server \
todo_server_img
```

---

### Bind Volumes

```bash
docker run -dp 8080:8080 \
-v host_dir:/app/data_container \
--name todo_server \
todo_server_img
```

---

### Continuous Development

```bash
docker network create todo_app

docker run -dp 8080:8080 \
-v $(pwd):/app \
-e NODE_ENV=dev \
--network todo_app \
--network-alias server \
--name todo_server \
todo_server_img
```

---

### Debugging

Expose port `9229`
Add in `package.json`:

```json
"debug": "nodemon --inspect=0.0.0.0:9229 src/app.js"
```

Run:

```bash
docker run -p 8080:8080 -p 9229:9229 \
-v $(pwd):/app \
--name todo_server \
todo_server_img
```

#### Chrome

```bash
chrome://inspect
```

#### VS Code

Attach debugger config:

```json
{
  "type": "node",
  "request": "attach",
  "name": "Docker Attach",
  "address": "0.0.0.0",
  "port": 9229,
  "remoteRoot": "/app",
  "localRoot": "${workspaceFolder}"
}
```

---

## Lesson 3

### Contents

- Docker networks
- Network aliases
- Netshoot debugging

---

### Network

```bash
docker network create todo_app
```

Run:

```bash
docker run -dp 8080:8080 \
-v $(pwd):/app \
-e NODE_ENV=dev \
--network todo_app \
--network-alias server \
--name todo_server \
todo_server_img
```

Access: [visit](http://server:8080)

---

### Debug Network

```bash
docker run -it --network todo_app nicolaka/netshoot
dig server
dig proxy
```

---

## Lesson 4

### Contents

- Docker Compose basics

---

### Docker Compose Commands

```bash
docker-compose up
docker-compose up -d
docker-compose stop
docker-compose restart
docker-compose logs -f
docker-compose logs -f service_name
docker-compose down
docker-compose down --volumes
```

---

### Compose Behavior

- Creates containers with service names
- Creates volumes
- Creates network
- Without `-d`

  - logs visible
  - `Ctrl + C` stops services
- With `-d`

  - detached mode

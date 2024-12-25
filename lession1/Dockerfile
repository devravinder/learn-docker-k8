FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
EXPOSE 8080
RUN npm install
CMD ["npm", "run", "dev"]

# $ docker build -t basic_app .
# $ docker run -dp 80:8080 --name basic_app basic_app

# $ docker run -dp 8080:8080 - -e NODE_ENV=dev --name todo_server todo_server_img

# RUN vs CMD https://stackoverflow.com/questions/37461868/difference-between-run-and-cmd-in-a-dockerfile
FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app

COPY . .
EXPOSE 9090
RUN npm install
CMD ["npm", "run", "start"]

# $ docker build -t todo_client_img .


# bind volume   ... useful for continuos development
# $ docker run -dp 9090:9090 -v $(pwd):/app --network todo_app --network-alias client  --name todo_client todo_client_img

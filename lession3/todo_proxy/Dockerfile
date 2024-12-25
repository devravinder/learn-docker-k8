FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app

COPY . .
EXPOSE 7070
RUN npm install
CMD ["npm", "run", "dev"]

# $ docker build -t todo_proxy_img .

# bind volume   ... useful for continuos development
# $ docker run -dp 7070:7070 -v $(pwd):/app -e NODE_ENV=dev  --network todo_app --network-alias proxy  --name todo_proxy todo_proxy_img 
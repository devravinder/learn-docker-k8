# Use Node.js as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy files and install dependencies
COPY app ./
RUN npm install -g serve


# Expose the port
EXPOSE 3000

# Start the server
CMD ["serve", "."]

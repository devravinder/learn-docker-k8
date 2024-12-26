FROM portainer/portainer-ce:latest

# RUN mkdir -p /data


# no use # portainer won't support passing username and password as environment variables
ENV PORTAINER_ADMIN_USERNAME=admin
ENV PORTAINER_ADMIN_PASSWORD=admin

# refresh / poll interfal for agent ( 60 seconds )
ENV AGENT_POLL_INTERVAL=60

# Expose required ports
EXPOSE 8000
EXPOSE 9000

# Set volume for persistent data
# VOLUME /data   # pass manually while running the container

# Add labels for better container management
LABEL maintainer="Ravinder Reddy"
LABEL version="1.0"
LABEL description="Portainer CE with default credentials"

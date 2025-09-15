# Imp

1. host.docker.internal is not available in linux, but in windows & mac
   - to make it available pass the below env to docker conatiner

    extra_hosts:
    - "host.docker.internal:host-gateway"
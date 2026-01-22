# Imp

1. host.docker.internal is not available in linux, but in windows & mac
   - to make it available pass the below env to docker conatiner

    extra_hosts:
    - "host.docker.internal:host-gateway"

2. to stop docker

   ```bash
    sudo systemctl stop docker.socket
    sudo systemctl stop docker.service
   ```

3. to check status
   `sudo systemctl status docker`

4. to disable/enbale on stystem start

   ```bash
   sudo systemctl disable docker.socket
   sudo systemctl disable docker.service
   ```

5. to start docker
    `sudo systemctl start docker`

6. if dns resolve issue is coming  add the below data in `/etc/systemd/resolved.conf`

   - ```bash
      nameserver 8.8.8.8
      nameserver 1.1.1.1
     ```

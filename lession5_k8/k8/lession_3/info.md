# Replicas & Dynamic Scaling

- Build the app & dockerize it
- Create Deployment & Service manifests
- Deploy to the Kind cluster
- Inspect & Check Status
- Acess the app
- Access Logs & debug
- Dynamic Scaling
- Cleanup

Build the app & dockerize it:-

- create simple node-exress app
- write dockerfile
- build the image ( with username prefix )
  - `docker build -t devravinder/node-express-app .`

- push to docker hub
  - `docker push devravinder/node-express-app`

Create Deployment & Service manifests:-

- create Deployment manifest
  - create deployment.yaml

- create Service manifest
  - create service.yaml

Deploy to the Kind cluster:-

- `kubectl apply -f deployment.yaml`
- `kubectl apply -f service.yaml`

- Note:-
  - Ensure the port 30001 is not already in use on the node.
  - If you are running the cluster on a cloud provider, verify that the port is allowed in your firewall or security groups.

Inspect & Check Status:-

- `kubectl get pods`    # to get pods
- `kubectl get services` # to get services

- `kubectl describe deployment node-express-app` # inspect the deployment
- `kubectl describe service node-express-app-service`
- `kubectl describe pod <POD_NAME>`   # get pod name using `kubectl get pods`
- `kubectl logs <POD_NAME>`

Acess the app:-

- we can access the appication like `http:<node-ip>:<node-port>/`
- in our case the node is docker container...so container ip is the node ip
- we can get node ip using
  - get the node name ( container name ) & inspect the node ( with docker inspect )
    - `kubectl get nodes` # to get node name ( container name )
    - `docker inspect <NODE_NAME>` # inspect the node
    - or to get only ip address
    - `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <NODE_NAME>`

  - we can get node-ip from portainer
  - we can get node-ip in lens
- visit `http://<node-ip>:<node-port>/` in browser (eg: http: 172.17.0.6:30001/ )

Access Logs & debug:-

- to see node logs
  - get node name ( container name )
  - `kubectl get nodes`
  - `docker logs <NODE_NAME>`

- to see pod logs
  - `kubectl get pods` # get pod name
  - `kubectl logs <POD_NAME>`
  - `kubectl logs <pod-name> -f` # to follow logs
  - `kubectl logs <pod-name> -c <container-name>` # f your pod has multiple containers

- execute bash/shell in pod
  - `kubectl exec <pod-name> -it -- /bin/bash`
  - `kubectl exec <pod-name> -- <command> <args>`

- we can do all the above actions using k8Lens

Dynamic Scaling:-

- `kubectl scale --replicas=3 deployment/node-express-app`
- `kubectl scale --replicas=3 deployment/<deployment-name>`

Cleanup:-

- `kubectl delete -f deployment.yaml`
- `kubectl delete -f service.yaml`
- or
- `kubectl delete all --all` # pods, services, deployments

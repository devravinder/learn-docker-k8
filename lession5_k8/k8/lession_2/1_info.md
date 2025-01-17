# Simple App Deployment
- Build an appliation
- Dockerize it
- Set up Kubernetes cluster with Kind
- Create Kubernetes manifests (Deployment and Service)
- Deploy to the Kind cluster
- Check the status ( optional )
- Acess the app
- Inspect the deployments
- Delete the deployments

## Pre-requisites
- Docker
- Kind
- kubectl
- NodeJs / Java or any other language of your choice ( to build app )
   - we use 'serve', a npm package to serve static files - this is our app
   - first run the 'serve' locally & serve app folder - understand how it works
   

- Build the app:-
  - create some html files
  - use 'serve' pacakge to serve static files
  - Note:- we can use any application ( Spring Boot or Node-express )


- Dockerize the app:-
  - write dockerfile
  - build the image
     - `docker build -t basic-app .`

  - test the image ( optional )
     - `docker run --name basic-app -p -d 3000:3000 basic-app`


- Set up Kubernetes cluster:-
  - `kind create cluster --name local-cluster`

  - load the existing image into the cluster ( if image exists in local system ) (optional)
     - `kind load docker-image basic-app --name local-cluster`
     - if we don't load image, it will try to pull it from docker hub


- Create Kubernetes manifests:-
  - create deployment manifest
      - create deployment.yaml
      - or
      - `kubectl create deployment basic-app --image basic-app --port 3000`

  - create service manifest
      - create service.yaml
      - or
      - `kubectl create service basic-app --type=LoadBalancer --port 3000`

  - Note:- 
     - don't use '_' for the name in Yaml files ( i.e basic_app )...it will give error
     - use '-' for the names ( i.e basic-app )

     - also we can combine both deployment & service manifests to signle Yaml file ( not recommended )


- Deploy to the Kind cluster:-
  - `kubectl apply -f deployment.yaml`
  - `kubectl apply -f service.yaml`

- Check the status:-
  - `kubectl get all`  # to get all resources
  - `kubectl get pods` # to get pods
  - `kubectl get svc` or `kubectl get services`  # to get services


- Acess the app:-
  - `kubectl port-forward svc/basic-app-service 3000:3000`  # if we are using load balancer ( type: LoadBalancer )
  - visit `http://localhost:3000/`

  - Note:- 
    - if we get any error 
       - do inspect the pod/deployment/service
       - see the logs of the pod
       - change the deployment & service manifests
       - and deploy again ( forcefully..if needed )


  - Note:- 
    - to run port-forwarding in background, use `&` at the end, then after the start press Ctrl + C
      - `kubectl port-forward svc/basic-app-service 3000:3000 &`

    - or use tmux



- Inspect the deployments:-
  - `kubectl describe deployment basic-app`
  - `kubectl describe service basic-app-service`
  - `kubectl describe pod <POD_NAME>`   # get pod name using `kubectl get pods`
  - `kubectl logs <POD_NAME>`

- Delete the deployments:-
  - `kubectl delete -f deployment.yaml`
  - `kubectl delete -f service.yaml`
  - or
  - `kubectl delete deployment basic-app`
  - `kubectl delete service basic-app-service`

  - or
  - `kubectl delete all --all` # pods, services, deployments
  - `kind delete cluster --name local-cluster`  # delete the cluster using kind





## LoadBalancer vs NodePort
  - LoadBalancer and NodePort are two types of Kubernetes services that expose your application to external traffic.

NodePort:- 
 - A NodePort service exposes the application on a static port (the NodePort) on all Kubernetes worker nodes' IPs. 
 - Traffic can be accessed via <NodeIP>:<NodePort>.

 - How It Works:-

   - Kubernetes allocates a port in the range 30000–32767 (default range) on each node.
   - External traffic sent to this port on any node is forwarded to the appropriate Pod.
   - Use Case:

      - Useful for local testing or environments where external load balancing isn't required.
      - Traffic must go through the node's IP and the allocated NodePort.

      - Pros:

        - Simple to configure.
        - No dependency on external infrastructure.

      - Cons:

        - Not suitable for production-grade deployments in most cases.
        - The application becomes exposed directly on the node, which can be less secure.
        - Requires manual management if multiple services need distinct NodePorts.


LoadBalancer:-
  - A LoadBalancer service provisions an external load balancer (if supported by the infrastructure provider) to expose the application to the internet.

  - How It Works:

    - A cloud provider's load balancer (e.g., AWS ELB, GCP Load Balancer, Azure Load Balancer) is automatically created and routes traffic to the appropriate NodePort services.
    - The load balancer gets a public IP, making the service accessible via <LoadBalancerIP>:<ServicePort>.
    - Use Case:

      - Ideal for production environments where external clients need to access the application.
      - Automatically integrates with cloud provider infrastructure.
      - Pros:

        - Provides a production-grade, cloud-integrated solution.
        - Automatically handles external traffic routing and load balancing.
      - Cons:

        - Requires a cloud provider that supports external load balancers.
        - Can incur additional costs for the load balancer infrastructure.



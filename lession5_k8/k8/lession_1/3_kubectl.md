1. Creating resources & deploying without configuration files:-

  - deployment manifest
        - `kubectl create deployment basic-app --image basic-app --port 3000`

  - service manifest
        - `kubectl create service basic-app --type=LoadBalancer --port 3000`


2. Deploy to the Kind cluster:-
  - `kubectl apply -f deployment.yaml`
  - `kubectl apply -f service.yaml`


3. Check the status:-
  - `kubectl get all`  # to get all resources
  - `kubectl get pods` # to get pods
  - `kubectl get svc` or `kubectl get services`  # to get services

4. Port-forwarding:-
  - `kubectl port-forward svc/basic-app-service 3000:3000`  # if we are using load balancer ( type: LoadBalancer )


5. Inspect the deployments:-
  - `kubectl describe deployment basic-app`
  - `kubectl describe service basic-app-service`
  - `kubectl describe pod <POD_NAME>`   # get pod name using `kubectl get pods`
  - `kubectl logs <POD_NAME>`

6. Delete the deployments:-
  - `kubectl delete -f deployment.yaml`
  - `kubectl delete -f service.yaml`
  - or
  - `kubectl delete deployment basic-app`
  - `kubectl delete service basic-app-service`

  - or
  - `kubectl delete all --all` # pods, services, deployments

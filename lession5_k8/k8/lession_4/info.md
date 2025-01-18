# Stateful Sets & Communication of Pods ( Secrets & ConfigMaps )

Build app Docker Image:-
  - `docker build --tag devravinder/express-mongo-app -f app_Dockerfile .`

Build Mongo DB Image:-
  - `docker build --tag devravinder/mongo -f mongo_Dockerfile .`

Deploy Secrets & ConfigMaps:-
  - `kubectl apply -f secrets.yaml`
  - `kubectl apply -f configmap.yaml`

Deploy Mongo DB:-
  - `kubectl apply -f mongo.yaml` # PV, PVC, deployment & service

Deploy Node Express App:-
  - `kubectl apply -f express-deployment.yaml`
  - `kubectl apply -f express-service.yaml`


Port-forwarding:-
  - `kubectl port-forward svc/express-app-service 3000:3000` # for service   ( use this for load balancer )
  - `kubectl port-forward pod/<pod-name> <local-port>:<pod-port>` # for port

Persistent Volume Debugging:- 
  - enter into the mongo pod
     - `kubectl exec -it <pod-name> -- bash`
     - `df -h /data/data`  # this gives actual path where data is stored 


Cleanup:-
  - `kubectl delete all --all`
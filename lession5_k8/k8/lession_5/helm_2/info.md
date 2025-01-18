# Creating a App ( Resource ) using Existing Helm Chart
- in this example we are running basic node-express app
- we are using
    - repo: https://github.com/devravinder/rare-helm-charts
    - chart: simple-node-express


Add Repository:-
  - `helm repo add rare https://helm-charts.paravartech.com`
  - `helm repo update`
  - `helm search repo simple-node-express`

Dry run:-
 - `helm install --dry-run release-1 rare/simple-node-express`

Install Chart:-
 - `helm install release-1 rare/simple-node-express`

View the Deployment:-
 - `kubectl get all`


Access the App:-
 - `kubectl port-forward svc/release-1 3000:4000` # if we are using load balancer ( only in local )


Clean up:-
 - `helm uninstall release-1` 


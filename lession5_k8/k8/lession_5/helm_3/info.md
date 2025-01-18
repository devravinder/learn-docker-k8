# Creating Own Chart & Publishing
- Create Docker Image
- Create a new chart directory
- Package the chart
- Dry run
- Install Chart
- View the Deployment
- Access the App
- Upgrade the Chart
- Rollback
- Clean up
- Publish the Chart

Create Docker Image:-
  - `docker build -t devravinder/node-express-app:1.0.0 .`
  - `docker push devravinder/node-express-app:1.0.0`

Create a new chart directory ( run only once ):-
  - `helm create simple-node-express-chart`  # generate defautl files
  - edit Chart.yaml ( if needed, in our case keep as it is )
  - add values in values.yaml
  - add deployment.yaml & service.yaml under templates
  - delete unwanted files
  - Note:-
     - don't create again with the same name, it'll overwrite the edited files


Package the chart:-
 - `helm package simple-node-express-chart`
 - Note:-
    - repack only if we change templates


Dry run:-
 - `helm install --dry-run release-1 ./simple-node-express-chart`

Install Chart:-
 - `helm install release-1 ./simple-node-express-chart`

View the Deployment:-
 - `kubectl get all`


Access the App:-
 - `kubectl port-forward svc/release-1 3000:4000` # if we are using load balancer ( only in local )


Upgrade the Chart:-
  - rebuild the image ( change the code ...if needed )
    - `docker build -t devravinder/node-express-app:2.0.0 .`
    - `docker push devravinder/node-express-app:2.0.0`
  - Update values.yaml with new image, update version & appVersion in chart.yaml
  - `helm upgrade --dry-run release-1 ./simple-node-express-chart`
  - `helm upgrade release-1 ./simple-node-express-chart`
  - `kubectl port-forward svc/release-1 3000:4000` # if we are using load balancer ( only in local )


Rollback:-
  - `helm history release-1` # get the revision no
  - `helm rollback release-1 <revision-no>`
     - `helm rollback release-1 1`
  - `kubectl port-forward svc/release-1 3000:4000` # if we are using load balancer ( only in local )

  - Note:- 
     - rollback works only with same release name ( i.e only if we upgrade )
     - if we upgrade a release...it'll create a new realease...and terminate the old release
     - if we release a new release...it'll be a complete new realease...along with old release


    

Clean up:-
 - `helm uninstall release-1` 

Publish the Chart:-
 - we are publishing the chart through docker hub to artifacthub
 - `helm registry login registry.hub.docker.com`
 - `helm push simple-node-express-chart-1.0.0.tgz oci://registry.hub.docker.com/devravinder`
 - go to artifacthub
   - add repository
     - kind: oci (container images )
     - url: oci://registry.hub.docker.com/devravinder

 - Testing:-
   - to install from oci registry
      - `helm install rl-1 oci://registry.hub.docker.com/devravinder/simple-node-express-chart`
      - or
      - `helm install rl-1 oci://registry.hub.docker.com/devravinder/simple-node-express-chart --version 1.0.0`
      - `kubectl port-forward svc/release-1 3000:4000` # if we are using load balancer ( only in local )


Other Useful Commands:-
 - `helm list` # to see all the installed charts
 - `helm history <release-name> [flags]`
 - `helm status release-1`
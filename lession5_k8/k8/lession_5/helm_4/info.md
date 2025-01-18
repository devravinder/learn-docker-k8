# Setting up Repository & Publishing the Chart
Note:- 
  - it should be done in seperate git repository
  - this lession code is implemented in the project ( https://github.com/devravinder/rare-helm-charts )
  - this is also part of the devops/docker_k8/lession5_k8/k8/lession_5/helm_4


Create Docker Image (optional):-
  - `docker build -t devravinder/node-express-app:1.0.0 .`
  - `docker push devravinder/node-express-app:1.0.0`

Create a new chart directory ( run only once ):-
  - `helm create simple-node-express`  # generate defautl files
  - edit Chart.yaml ( if needed, in our case keep as it is )
  - add values in values.yaml
  - add deployment.yaml & service.yaml under templates
  - delete unwanted files
  - Note:-
     - don't create again with the same name, it'll overwrite the edited files

Add Repository information:-
  - in simple-node-express/Chart.yaml, add keywords, home, source & maintainers
   
Add artifacthub details:   
  - add artifacthub-repo.yml in the root directory
  - add necessary details



Package the chart:-
 - `helm package simple-node-express`
 - Note:-
    - repack only if we change templates

Create or Update index.yaml:-
  - `helm repo index .`
  - Note:-
     - index.yaml shoulbe created after packaging the chart, not before
     - artifacthub-repo.yml & index.yamls required...if we are publishing using http/https repositories
  


Push to Git:-
  - `git add .`
  - `git commit -m "commit message"`
  - `git remote add origin https://github.com/devravinder/rare-helm-charts`
  - `git push -u origin master`

Enable Github Pages:-
  - under repository settings, enable "github pages"
  - choose "master branch" & root folder
  - after the pages is enabled, take the URL

Add Reposiory in Artifacthub:-
  - in arttifacthub & add repository
     - Repository Name: simple-node-express
     - Repository URL: https://github.com/devravinder/rare-helm-charts
                - or custom domain name ( https://helm-charts.paravartech.com )
     - Kind: "Helm"

     - Note:-
       - if we are using custom domain name
          - add CNAME in DNS settings in domain name provider ( maintainer, i.e Sqarespace )
          - add CNAME file in the repository root folder
          - 

Verify the chart:-
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

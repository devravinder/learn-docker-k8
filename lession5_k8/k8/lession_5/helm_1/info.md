# [Helm](https://helm.sh)

Helm:-

- is a powerful package manager for Kubernetes
- why:-
  - Simplifies Deployments: Helm automates the creation, configuration, and management of Kubernetes manifests.
  - Reusable Templates: It allows for parameterized deployments using values files.
  - Version Control: Helm charts make it easy to roll back to previous application states.
  - Community Support: A vast repository of public charts is available, which you can customize to your needs.

Chart:-

- is a collection files...that are used to create kubernetes manifests ( resources )
- when we install a chart using helm
  - it creates a manifests
  - then it passes these manifests to kubernetes...and create resources

Repositories:-

- Helm charts are stored in repositories (e.g., ArtifactHub, Bitnami).
- You can add repositories to your Helm CLI and install charts directly from them.

Helm Templates Language Features:-

- it uses GO lang under the hood
- Objects:-
  - these are to hold ( to pass ) some values to templates to generate the manifests
  - builit in templates are:-
    - Release
    - Files
    - Subcharts
    - etc
  - user passed values will be access from Values object ( passed from values.yaml )

- Functions:-
  - to perform actions on objects
- Pipelines:-
  - to perform actions on objects, works like UNIX pipelines

- Builtin Functions & Operators:-
  - to perform actions on objects
  - eg:
    - upper - to convert string to uppercase
    - eq - to check equality

## Useful Commands

- `Search`
  - to serach for a chart from the repos or hub
  - `helm search repo <keyword>`
    - this will search in local repos
    - to work this locally we need to add the repos
  - `helm search hub <keyword>`
    - this will search in hub - [artifact](https://artifacthub.io)
    - no need to add repos locally

- `repo add`
  - to add a repo to Helm CLI
  - `helm repo add <repo_name> <repo_url>`
  - eg: helm repo add bitnami <https://charts.bitnami.com/bitnami>
  - we can add more than one repos

- `repo list`
  - to list all the repos added to Helm CLI
  - `helm repo list`

- `repo update`
  - to update all the repos added to Helm CLI
  - `helm repo update`

- `install`
  - to install a chart
    - installing a charts creates manifests & K8 resources
    - to deploy applications ( using pre-configured templates or custom templates )
  - `helm install <release-name> <chart> [flags]`
    - we can pass options
      - `--values <values.yaml>` # override default values
      - `--namespace <namespace>`
      - `-f <values.yaml>` # custom values
  - eg: `helm install my-nginx bitnami/nginx`

- `list`
  - to list all the installed charts
  - `helm list [flags]`

- `history`
  - to view the history of a release
  - `helm history <release-name> [flags]`
  - eg: `helm history my-nginx`

- `upgrade`
  - to update the application with newer versions of the chart or configuration changes without downtime.
  - `helm upgrade <release-name> <chart> [flags]`
  - eg: `helm upgrade my-nginx bitnami/nginx --values custom-values.yaml`
    - Upgrades the my-nginx release with new chart configurations from custom-values.yaml

- `uninstall`
  - to clean up resources from your Kubernetes cluster
  - `helm uninstall <release-name> [flags]`
    - we can pass options
  - eg: `helm uninstall my-nginx`

## Working with Charts

Pre-requisites:-

- go through the lession_1 ( 2_info.md )

Files & Structure:-

- Chart.yaml
- values.yaml
- templates
- requirements.yaml

Creation:-

- to create a new chart
- `helm create <chart-name>`
- eg: helm create my-chart

Values & Override:-

- Use values.yaml for default configurations
- Override values with --set and custom YAML files

## TPL

- helpers.tpl, conditionals, loops, and functions.

## Dependency Management

- Define and manage chart dependencies.
- Use helm dependency update.

## Chart Testing

- Use tools like helm lint and helm unittest.

## CI/CD with Helm

- Automate Helm deployments in pipelines using GitHub Actions, GitLab CI/CD, or Jenkins.  

## Publishing to ArtfictHub

- oci registry ( docker hub )
- HTTP/HTTPS repositories (github pages)

## Own Repositories (Optional)

- Set up and host your own Helm repository
- Push charts to repositories using tools like ChartMuseum or GitHub Pages
  
# Kubernetes

Container orchestration:-
  - is the process of automating the deployment, management, scaling, and networking of containers throughout their lifecycle

Kubernetes:- is an open-source container orchestraton tool / software


## Core Components:-
Pod:- 
  - is the smallest deployable unit in K8
  - can have one or more containers
  - all the Pod containers share the same network & storage
  - these Pods can can be creted & destroyed at any time ( dynamically )

Node:- 
  - is a physical or virtual machine on which Pod are hosted
  - can have one or more Pods
  - each Node conatains
     - Kubelet: which manges Pod lifecycle & assignes the resources to Pods
     - Kube Proxy: which manages network rules
     - Container Runtime: like docker


Cluster:-
  - is a group of nodes that work together to run containerized applications managed by K8.
  - each cluster has at least one Master node( Control Plane ) & one or more Worker nodes
  - Master Node handles the cluster's operations
  - clusters also can be scaled up or down based on demand


Namespaces:-
  - is a logical grouping of resources within a single cluster
  - useful in multi-user environments where different teams 
  - or applications need to operate independently without interference

---------------------------------------------------------------------------------------------------------------------
Moster Node vs Worker Node:-

Master Node:-
   - is the control plane of a Kubernetes cluster. 
   - It is responsible for managing the cluster's state, scheduling workloads, and handling the overall orchestration of the system
   - are less powerful than worker nodes, they just manges the worker nodes
   - Components:-
      - API Server:
          - acts as the entry point for all API requests to the cluster
          - facilitates communication between cluster managing clients and the control plane
                - cluster managing clients = kubectl, helm, etc

      - Controller Manager:
         - manages the cluster
         - monitors the state of the cluster and makes adjustments to maintain desired states 
             - eg: ensuring that the correct number of replicas for a service are running

      - Scheduler:
         - assigns pods to worker nodes based on resource availability and other constraints ( policies)
         - helps in optimizing workload distribution
           - eg: if one cluster has two master nodes...then scheduler handles worker nodes assignment to masters

      - etcd: 
        - A distributed key-value store that holds all configuration data and state information of cluster
        - ensures data persistence and consistency.
        - etcd = editable text configuration distributed

      - Cloud Controller Manager (optional): Manages cloud-specific integration.




Worker Node:-
  - is responsible for running the actual application workloads in the form of pods
  - Components:-
     - Kubelet: which manges Pod lifecycle & assignes the resources to Pods
     - Kube Proxy: which manages network rules
     - Container Runtime: like docker

  - worker nodes are more powerful generally, as they handles Pods.


## Resources:-
- Basic Resources: Pods, Deployments, Services, ConfigMaps, and Secrets.
- Advanced Resources: StatefulSets, DaemonSets, Jobs, CronJobs, and Ingress.

  [ Resource means an object in k8 that performs or gives specific functionality based on some config ]

Pod:- 
  - is the smallest deployable unit in K8
  - can have one or more containers
  - all the Pod containers share the same network & storage
  - these Pods can can be creted & destroyed at any time ( dynamically )

Deployment:-
  - is a resource ( higher-level abstraction ) that manages the lifecycle of pods based on config
  - It allows users to define the desired state for their applications ( for pods )
  - used to automate scaling, rolling updates, rollbacks, and self-healing of pods ( based on config )

Service:-
  - is k8 resource that enable communication to the pods to the outside world or other pods within the cluster
  - it provides stable networking and load balancing 
  - Pods are ephemeral and can change IPs; Services provide a consistent endpoint.
  - Types:-
     - ClusterIP (default): Accessible only within the cluster.
     - NodePort: Exposes the service on a static port on each worker node.
     - LoadBalancer: Integrates with cloud load balancers for external traffic.
     - ExternalName: Maps the service to an external DNS name.


ConfigMap:-
  - is used to store non-sensitive configuration data in key-value pairs
  - it decouples application configuration from the application code
  - Configuration can be injected into pods as environment variables, command-line arguments, or mounted as files


Secret:-
  - Similar to ConfigMaps but specifically for storing sensitive information
  - help manage sensitive data without exposing it directly in application code or configuration files
  - Ensures sensitive data is encrypted

------------------------------------------------------------------------------------------------------------------

StatefulSet:-
 - is specific a type of Deployment that  is used to manage stateful applications ( eg: databases, redis )
 - It ensures that each pod in the set has 
       - a unique, stable identity, and persistent storage.
       - i.e 
          - Sticky Identity: Stable pod names (e.g., app-0, app-1).
          - Stable storage: PersistentVolumeClaims (PVCs) are tied to pods even after rescheduling.
          - Ordered startup and shutdown (pods are created/deleted in sequence).
 - this enables stable network & persistent storage


DaemonSet:-
  - is a type of Deployment that is used to run a single instance of a pod on each node in the cluster
  - When a new node is added to the cluster, the DaemonSet automatically schedules the specified pod on that node.
  - useful for deploying background processes or services that need to run on every node
  - useful for running background tasks, system-level services, or monitoring tools
      - eg: Log collectors, Monitoring agents (e.g., Prometheus Node Exporter), Network plugins or storage daemons.


Job:-
  - is a specific type of Deployment that is used to execute one-time task
       - eg: backup, restore, and migration
  - one job can have multiple pods
  - it terminates the pods after the completion of the job
  - Jobs can be configured 
      - to automatically retries on failure (based on configuration, util certain criteria is met).
      - to executes a specified number of times (e.g., 1 or more parallel jobs)
  - They ensure that tasks are completed reliably
     - deal for tasks like database migrations or batch data processing
     - Generate reports, send bulk emails.
  

CronJob:-
  - is a specific type of Deployment that is used to schedule periodic tasks
  - useful to automate recurring tasks
       - eg: backups, monitoring, or data processing
  - we can schedule jobs at specific intervals (e.g., daily, weekly).
       - cron syntax for scheduling
       - eg:  */5 * * * * * (every 5 minutes)
  
Ingres:-
  - is a resource to manage external HTTP/HTTPS access to services within the cluster
  - provides advanced routing for incoming traffic based on URLs, paths, or hostnames ( config )
  - acts as a reverse proxy for your applications
  - supports load balancing, SSL/TLS termination, and virtual hosting
  - Requires an *Ingress Controller* (e.g., NGINX, Traefik) to implement the rules defined in Ingress resources.


## Kubectl
 - (CLI) tool for interacting with Kubernetes clusters. 
 - It allows users to deploy applications, manage cluster resources, and perform various administrative tasks
 - we can create a resource using kubectl command line tool
      - with config file ( YAML file ) [ recommended ]
      - without file ( firectly from cmd )


 ## Storage in Kubernetes
  - K8 provides robust framework for storage management
  - allowing applications to store and retrieve data beyond the lifetime of a pod
### key components:-
     - Volumes
     - Persistent Volumes (PVs)
     - Persistent Volume Claims (PVCs)
     - Storage Classes

Volumes ( Storage ):-
  - A Volume is a directory that is accessible to containers in a Pod.
  - It provides a way for containers to share data and persist data beyond the lifecycle of individual containers
  - these volumes can be mounted into pods.

  - Types:-
     - ephemeral volumes: volumes are deleted when the Pod is terminated ( temporary storage )
     - persistent volumes: data is preserved even after Pods are restarted


  - persistent volumes can be: local storage, cloud-based storage, network-attached storage

  - Common Volume Types:
    - emptyDir:
       - a temporary directory that is created when a pod is assigned to a node.
       - it exists as long as the pod is running.
    - hostPath
       - mounts a file or directory from the host node’s filesystem into a pod.
    - configMap and secret: 
       - store configuration or sensitive information for pods.

    - nfs, awsElasticBlockStore, gcePersistentDisk, azureDisk:
       - Cloud-specific volumes for persistent storage.

    - PersistentVolumeClaim (PVC)
       - Used to request persistent storage dynamically or statically.


Persistent Volumes (PVs):-
  - is a storage in the cluster that has been provided by an administrator or dynamically by Storage Classes. 
  - PVs are independent of the Pods that use them.
  - PVs have their own lifecycle and can be reused by different Pods
  - suitable for applications requiring persistent data storage eg: databases


Persistent Volume Claims (PVCs):- 
  - is a request for storage by a user. 
  - it specifies the size and access modes required for the storage.
  - it is bound to a PV that matches these requirements
  - Binding: 
      - K8 finds a matching PV that meets its requirements and binds them together, allowing the Pod to use the claimed storage


Storage Classes:- 
  - A Storage Class provides a way to describe different types of storage available in the cluster.
      - e.g., SSD vs. HDD, fast vs. slow
  - They allow for dynamic provisioning of PVs when a PVC is created
     - based on predefined parameters
          - performance characteristics 
          - replication policies

     - they can specify different parameters like reclaimPolicy, volumeBindingMode, etc.

  - Usage: Administrators can define multiple Storage Classes for different types of workloads, enabling users to request specific storage types through PVCs

### Other Storage Components:-

Dynamic Provisioning:- 
 - When a PVC is created, if the requested storage class allows for dynamic provisioning, Kubernetes will automatically create a corresponding PV based on the class’s configuration.
 - This eliminates the need for administrators to manually create PVs ahead of time.
 - i.e K8 creates & gives


StatefulSets:- 
 - StatefulSets are used for applications that require stable, unique network identifiers, persistent storage, and ordered deployment and scaling. 
 - StatefulSets use PVCs to ensure that each pod has its own persistent storage, making them suitable for databases or stateful applications.
 - these are Pods

Access Modes:- 
   - Access modes determine how a volume can be mounted by pods. Common access modes include:
   - types:
        - ReadWriteOnce (RWO): The volume can be mounted as read-write by a single node.
        - ReadOnlyMany (ROX): The volume can be mounted as read-only by many nodes.
        - ReadWriteMany (RWX): The volume can be mounted as read-write by many nodes.


Backup and Restore:- 
 - K8 does not have native backup and restore solutions,
 - but various tools (e.g., Velero, Kasten) can be used to manage backups of persistent data in K8.



## Helm
 - is a powerful package manager for Kubernetes 
 - it simplifies the process of deploying and managing applications on a Kubernetes cluster. 
 - It allows you to define, install, and upgrade Kubernetes resources through reusable templates called Helm charts.
 - users can manage their applications without needing to remember complex Kubernetes commands
 

### Key Concepts:-

Chart:-
  - is collection of files ( YAML files ) that define & package resources needed to deploy an application.
  - we can define Kubernetes resources such as Deployments, Services, ConfigMaps, and Secrets. 
  - This packaging allows for consistent and repeatable deployments across different environments
  - A Helm chart includes:
      - Chart.yaml: Metadata about the chart, such as its name, version, and dependencies
      - values.yaml: Default configuration values.
      - templates/: A directory containing Kubernetes manifest templates.
      - Other optional files like README.md or NOTES.txt.
      - Charts: Stores any chart dependencies defined in Chart.yaml


Release:-
  - A release is a specific instance of a Helm chart deployed to a Kubernetes cluster. 
  - Each release has a unique name ( version ).
  - Example: Installing a Helm chart twice creates two releases, each with its own configuration and resources.

  - Version Control:-
      - Helm maintains a history of releases for each application, 
      - tis enables easy rollbacks to previous versions if an update fails or introduces issues. 
      - This feature is particularly useful in production environments where stability is critical.

Repositories:-
  - Helm charts are stored in repositories (e.g., ArtifactHub, Bitnami).
  - You can add repositories to your Helm CLI and install charts directly from them.


Values:- 
  - values.yaml contains default configurations that can be overridden when installing or upgrading a chart.
  - Overrides can be provided through custom files or command-line arguments.
  - this enables us to customize the configuration
       - users can override default configurations based on specific deployment needs 
          - e.g., different settings for development vs. production





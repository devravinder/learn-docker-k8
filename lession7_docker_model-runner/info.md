# Docker Model Runner
- is plugin that can be uded to run llms locally using docker
  -  (only uses volumes & loads to memory on demand)


## Installation
```bash
    sudo apt-get update
    sudo apt-get install docker-model-plugin
```
  to test `docker model version`



## [Commads](https://docs.docker.com/reference/cli/docker/model/list/) 

1. pull mode model
   `docker model pull ai/smollm2`

2. to run model
   `docker model run ai/smollm2` # interactive
   `docker model run ai/smollm2 "tell a joke"` # one time

3. list models
   `docker model list`

4. to see running model
    `docker model ps`


### (Accessing with REST)[https://docs.docker.com/ai/model-runner/api-reference/]
   - to access with REST api, it should be in running state

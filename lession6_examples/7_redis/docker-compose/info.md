5. to run docker compose files
   1. to start infra  
      1. $ ```docker compose -f ./infra.yaml  up -d```
      2. $ ```docker compose --profile ui -f ./infra.yaml  ps```  // run ui profile  
         also we can run multiple profiles  ```--profile ui --profile db```

   2. to stop infra  
      1. $ ```docker compose -f ./infra.yaml  down```
      2. $ ```docker compose --profile ui -f ./infra.yaml  ps```
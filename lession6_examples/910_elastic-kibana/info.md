

- visit: http://localhost:5601/
- for data: http://localhost:5601/app/management


## Query
 - visit: http://localhost:5601/ > menu > Data management > Dev tools
    - or http://localhost:5601/app/dev_tools#/console

  - eg:-
   ```
     GET my_index/_search
    {
        "query": {
            "match_all": {}
        }
    }
   ```
   ```
     GET my_index/_search
    {
        "query": {
            "match": {
            "name": "John Doe"
                }
            }
    }

   ```
   ```
     GET my_index/_search
    {
        "query": {
            "match": {
            "city": "London"
            }
        }
    }

   ```
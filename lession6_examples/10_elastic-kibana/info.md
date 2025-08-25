

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
   ```
     GET my_index/_search
    {
        "query": {
            "range": {
            "age": {
                "gte": 30
            }
            }
        }
    }

   ```
   ```
    GET my_index/_search
    {
        "_source": ["name", "city"],
        "query": {
            "match_all": {}
        }
    }

   ```

## Mutation
- eg:
   ```
    POST my_index/_doc
    {
    "name": "Robert King",
    "age": 37,
    "city": "Chicago",
    "occupation": "Business Analyst"
    }

   ```
   ```
     PUT my_index/_doc/11
    {
    "name": "Laura Adams",
    "age": 26,
    "city": "Madrid",
    "occupation": "Software Engineer"
    }

   ```

  - Partil update
   ```
    POST my_index/_update/11
    {
        "doc": {
            "age": 28,
            "city": "Barcelona"
        }
    }

   ```
  - Add new field
   ```
     POST my_index/_update/11
        {
        "doc": {
            "salary": 75000
        }
        }

   ```

   - Upsert
   ```
   POST my_index/_update/15
    {
    "doc": {
        "name": "Elena Carter",
        "age": 32,
        "city": "Rome"
    },
    "doc_as_upsert": true
    }

   ```
curl -X POST "http://localhost:9200/my_index/_bulk" -H "Content-Type: application/json" -d'
{"index": {"_id": "1"}}
{"name": "John Doe", "age": 30, "city": "New York", "occupation": "Engineer"}
{"index": {"_id": "2"}}
{"name": "Jane Smith", "age": 25, "city": "London", "occupation": "Doctor"}
{"index": {"_id": "3"}}
{"name": "Alice Brown", "age": 28, "city": "Paris", "occupation": "Artist"}
{"index": {"_id": "4"}}
{"name": "Michael Johnson", "age": 35, "city": "Berlin", "occupation": "Teacher"}
{"index": {"_id": "5"}}
{"name": "Emily Davis", "age": 22, "city": "Tokyo", "occupation": "Student"}
{"index": {"_id": "6"}}
{"name": "David Wilson", "age": 40, "city": "Sydney", "occupation": "Software Developer"}
{"index": {"_id": "7"}}
{"name": "Sophia Martinez", "age": 27, "city": "Barcelona", "occupation": "Designer"}
{"index": {"_id": "8"}}
{"name": "James Anderson", "age": 33, "city": "Toronto", "occupation": "Manager"}
{"index": {"_id": "9"}}
{"name": "Olivia Thomas", "age": 29, "city": "San Francisco", "occupation": "Marketing Specialist"}
{"index": {"_id": "10"}}
{"name": "William Moore", "age": 31, "city": "Amsterdam", "occupation": "Consultant"}
'

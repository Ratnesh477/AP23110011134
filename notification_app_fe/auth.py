import requests

url = "http://20.207.122.201/evaluation-service/auth"

payload = {
    "email": "ratnesh_gudipudi@srmap.edu",
    "name": "ratnesh gudipudi",
    "rollNo": "AP23110011134",
    "accessCode": "QkbpxH",
    "clientID": "df12464a-6ffe-4e06-8034-4737cac6138f",
    "clientSecret": "ZywrFMusWfeFfHbZ"
}

res = requests.post(url, json=payload)
print(res.json())
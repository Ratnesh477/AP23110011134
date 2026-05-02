import requests

LOG_URL = "http://20.207.122.201/evaluation-service/logs"

import os
TOKEN = os.getenv("ACCESS_TOKEN")

def Log(stack, level, package, message):
    payload = {
        "stack": stack.lower(),
        "level": level.lower(),
        "package": package.lower(),
        "message": message
    }

    headers = {
        "Authorization": f"Bearer {TOKEN}"
    }

    try:
        requests.post(LOG_URL, json=payload, headers=headers)
    except:
        pass
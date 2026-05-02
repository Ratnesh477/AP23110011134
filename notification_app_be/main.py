import requests
import sys, os

sys.path.append(os.path.abspath("../logging_middleware"))
from logger import Log

URL = "http://20.207.122.201/evaluation-service/notifications"
import os
TOKEN = os.getenv("ACCESS_TOKEN")
headers = {
    "Authorization": f"Bearer {TOKEN}"
}

priority_map = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
}

from datetime import datetime

def parse_time(ts):
    return datetime.strptime(ts, "%Y-%m-%d %H:%M:%S")

def fetch_notifications():
    Log("backend", "info", "handler", "Fetching notifications")

    res = requests.get(URL, headers=headers)

    if res.status_code != 200:
        Log("backend", "error", "handler", "API failed")
        return []

    return res.json()["notifications"]

import heapq

def get_top_10(notifications):
    Log("backend", "debug", "service", "Processing notifications")

    heap = []

    for n in notifications:
        priority = priority_map[n["Type"]]
        time = parse_time(n["Timestamp"])

        heapq.heappush(heap, (priority, time, n))

        if len(heap) > 10:
            heapq.heappop(heap)

    return [x[2] for x in sorted(heap, reverse=True)]

def main():
    Log("backend", "info", "handler", "Application started")

    notifications = fetch_notifications()

    if not notifications:
        Log("backend", "warn", "handler", "No notifications found")
        return

    top = get_top_10(notifications)

    print("\n🔥 TOP 10 NOTIFICATIONS:\n")

    for i, n in enumerate(top, 1):
        print(f"{i}. [{n['Type']}] {n['Message']} - {n['Timestamp']}")

    Log("backend", "info", "handler", "Execution completed")

if __name__ == "__main__":
    main()
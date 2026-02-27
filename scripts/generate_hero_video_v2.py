#!/usr/bin/env python3
"""Generate a new hero video — cinematic fulfillment center / logistics operations."""

import fal_client
import os
import requests

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

fal_client.api_key = os.environ["FAL_KEY"]

PROMPT = """A continuous, seamlessly looping cinematic tracking shot inside a massive modern fulfillment center warehouse.
The camera glides smoothly forward through aisles of organized shelving and conveyor belts.
Cardboard parcels and packages flow along the conveyor belt system in an endless stream.
Warm overhead industrial LED lighting bathes the clean, modern facility.
Workers in the distance scan packages and sort them into different shipping lanes.
The facility is spotless, efficient, and high-tech — representing world-class logistics operations.
Professional cinematic quality with shallow depth of field and warm color grading.
The camera movement is a steady, smooth dolly forward through the space.
The motion flows in a perpetual loop with no beginning or end.
The first and last frames should be visually identical for perfect seamless looping.
16:9 wide cinematic composition. No text or logos."""

print("Starting hero video v2 generation with Kling V3 Pro...")
print(f"  Aspect ratio: 16:9 (landscape)")
print(f"  Duration: 15 seconds")
print(f"  Audio: OFF")
print(f"  Cost: $3.36")
print()

result = fal_client.subscribe(
    "fal-ai/kling-video/v3/pro/text-to-video",
    arguments={
        "prompt": PROMPT,
        "duration": "15",
        "aspect_ratio": "16:9",
        "generate_audio": False,
        "cfg_scale": 0.5,
    },
    with_logs=True,
    on_queue_update=lambda update: (
        print(f"  Status: {update.status}")
        if hasattr(update, 'status') else None
    ),
)

video_url = result["video"]["url"]
print(f"\nVideo generated! URL: {video_url}")

# Download
output_path = os.path.join(os.path.dirname(__file__), "output", "hero_v2_raw.mp4")
print(f"Downloading to {output_path}...")
response = requests.get(video_url)
with open(output_path, "wb") as f:
    f.write(response.content)

size_mb = os.path.getsize(output_path) / (1024 * 1024)
print(f"Downloaded: {size_mb:.1f} MB")
print("DONE")

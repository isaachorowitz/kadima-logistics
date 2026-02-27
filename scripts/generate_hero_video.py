#!/usr/bin/env python3
"""Generate a 15-second looping hero background video using Kling V3 Pro via fal.ai."""

import fal_client
import os
import requests

# Load env
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

fal_client.api_key = os.environ["FAL_KEY"]

PROMPT = """A continuous, seamlessly cyclical aerial drone shot following a modern semi-truck driving along a wide highway through an industrial logistics corridor at golden hour.
The truck passes large warehouses and distribution centers on both sides.
The camera maintains a steady, smooth forward glide slightly above and behind the truck, creating a perpetual following motion.
Warm golden sunlight bathes the scene with cinematic lens flare.
The road stretches endlessly ahead. Other trucks appear in the distance.
Professional cinematic quality, shallow depth of field, warm color grading.
The motion flows smoothly in a perpetual loop with no beginning or end.
The first and last frames should be visually identical for perfect looping.
Vertical 9:16 portrait composition — the road and truck fill the center with sky above and road below."""

print("Starting hero video generation with Kling V3 Pro...")
print(f"  Aspect ratio: 9:16 (portrait)")
print(f"  Duration: 15 seconds")
print(f"  Audio: OFF")
print(f"  Estimated cost: $3.36")
print()

result = fal_client.subscribe(
    "fal-ai/kling-video/v3/pro/text-to-video",
    arguments={
        "prompt": PROMPT,
        "duration": "15",
        "aspect_ratio": "9:16",
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
output_path = os.path.join(os.path.dirname(__file__), "output", "hero_raw.mp4")
print(f"Downloading to {output_path}...")
response = requests.get(video_url)
with open(output_path, "wb") as f:
    f.write(response.content)

size_mb = os.path.getsize(output_path) / (1024 * 1024)
print(f"Downloaded: {size_mb:.1f} MB")
print("DONE")

#!/usr/bin/env python3
"""Upscale the hero video from 1080p to 4K using fal.ai video upscaler."""

import fal_client
import os
import requests

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

fal_client.api_key = os.environ["FAL_KEY"]

# Use the raw 1080p Kling output (before our compression)
INPUT_VIDEO = os.path.join(os.path.dirname(__file__), "output", "hero_v2_raw.mp4")
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "output", "hero_4k_raw.mp4")

print("Uploading 1080p video to fal.ai for 4K upscale...")
video_url = fal_client.upload_file(INPUT_VIDEO)
print(f"  Uploaded: {video_url}")

print("\nStarting 2x upscale (1080p → 4K)...")
print("  Model: fal-ai/video-upscaler (RealESRGAN)")
print("  Scale: 2x (1920x1080 → 3840x2160)")
print("  Estimated cost: ~$0.50")

result = fal_client.subscribe(
    "fal-ai/video-upscaler",
    arguments={
        "video_url": video_url,
        "scale": 2,
    },
    with_logs=True,
    on_queue_update=lambda update: (
        print(f"  Status: {update.status}")
        if hasattr(update, 'status') else None
    ),
)

output_url = result["video"]["url"]
print(f"\nUpscaled video URL: {output_url}")

print(f"Downloading to {OUTPUT_PATH}...")
response = requests.get(output_url)
with open(OUTPUT_PATH, "wb") as f:
    f.write(response.content)

size_mb = os.path.getsize(OUTPUT_PATH) / (1024 * 1024)
print(f"Downloaded: {size_mb:.1f} MB")
print("DONE")

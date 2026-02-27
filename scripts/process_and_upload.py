#!/usr/bin/env python3
"""Compress images to WebP and upload to Cloudinary."""

import cloudinary
import cloudinary.uploader
from PIL import Image
import os

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

cloudinary.config(
    cloud_name=os.environ["CLOUDINARY_CLOUD_NAME"],
    api_key=os.environ["CLOUDINARY_API_KEY"],
    api_secret=os.environ["CLOUDINARY_API_SECRET"],
    secure=True,
)

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')
os.makedirs(PUBLIC_DIR, exist_ok=True)

PROJECT = "kadima-logistics"

images = [
    {
        "src": "why-kadima.png",
        "webp": "why-kadima.webp",
        "folder": f"{PROJECT}/sections",
        "public_id": "why-kadima",
        "quality": 82,
        "max_width": 1200,  # 2x display size for ~600px container
    },
    {
        "src": "dhl-spotlight.png",
        "webp": "dhl-spotlight.webp",
        "folder": f"{PROJECT}/sections",
        "public_id": "dhl-spotlight",
        "quality": 80,
        "max_width": 1200,
    },
    {
        "src": "og-image.png",
        "webp": None,  # OG stays as PNG
        "folder": f"{PROJECT}/og-images",
        "public_id": "og-main",
        "quality": 95,  # High quality for OG
        "max_width": 1200,
    },
]

results = {}

for img_info in images:
    src_path = os.path.join(OUTPUT_DIR, img_info["src"])
    print(f"\n{'='*50}")
    print(f"Processing: {img_info['src']}")

    # Open and get info
    img = Image.open(src_path)
    print(f"  Original: {img.size[0]}x{img.size[1]}")

    # Resize if needed (maintain aspect ratio)
    if img.size[0] > img_info["max_width"]:
        ratio = img_info["max_width"] / img.size[0]
        new_size = (img_info["max_width"], int(img.size[1] * ratio))
        img = img.resize(new_size, Image.Resampling.LANCZOS)
        print(f"  Resized to: {new_size[0]}x{new_size[1]}")

    # Save as WebP (or PNG for OG)
    if img_info["webp"]:
        out_path = os.path.join(PUBLIC_DIR, img_info["webp"])
        # Convert RGBA to RGB for WebP if needed
        if img.mode == 'RGBA':
            bg = Image.new('RGB', img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg
        img.save(out_path, "WEBP", quality=img_info["quality"], method=6)
        upload_path = out_path
    else:
        out_path = os.path.join(PUBLIC_DIR, img_info["src"])
        img.save(out_path, "PNG", optimize=True)
        upload_path = out_path

    size_kb = os.path.getsize(out_path) / 1024
    print(f"  Compressed: {out_path} ({size_kb:.0f} KB)")

    # Upload to Cloudinary
    print(f"  Uploading to Cloudinary: {img_info['folder']}/{img_info['public_id']}...")
    result = cloudinary.uploader.upload(
        upload_path,
        folder=img_info["folder"],
        public_id=img_info["public_id"],
        resource_type="image",
        overwrite=True,
        quality="auto:best",
        fetch_format="auto",
    )
    url = result["secure_url"]
    print(f"  Cloudinary URL: {url}")
    results[img_info["public_id"]] = url

print(f"\n{'='*50}")
print("ALL UPLOADS COMPLETE")
print(f"{'='*50}")
for name, url in results.items():
    print(f"  {name}: {url}")

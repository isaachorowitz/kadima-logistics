#!/usr/bin/env python3
"""Generate all site images using Google Gemini (google-genai SDK)."""

from google import genai
from google.genai import types
import base64
import os
import sys

# Load env
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)


def generate_image(prompt, filename, description):
    """Generate an image with Gemini and save it."""
    print(f"\n{'='*60}")
    print(f"Generating: {description}")
    print(f"Output: {filename}")
    print(f"{'='*60}")

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        if response.candidates and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if part.inline_data and part.inline_data.data:
                    # inline_data.data is already bytes
                    img_bytes = part.inline_data.data
                    if isinstance(img_bytes, str):
                        img_bytes = base64.b64decode(img_bytes)

                    output_path = os.path.join(OUTPUT_DIR, filename)
                    with open(output_path, "wb") as f:
                        f.write(img_bytes)
                    size_kb = os.path.getsize(output_path) / 1024
                    print(f"  SUCCESS: {output_path} ({size_kb:.0f} KB)")
                    return True
                elif hasattr(part, 'text') and part.text:
                    print(f"  Text: {part.text[:200]}")

        print(f"  WARNING: No image data returned for {description}")
        return False

    except Exception as e:
        print(f"  ERROR: {e}")
        return False


# --- Image 1: WhyKadima Section (4:3 warehouse/logistics operations) ---
generate_image(
    prompt="""Generate an image: A professional commercial photograph of a modern logistics warehouse interior.
The scene shows a clean, well-organized distribution center with workers in high-visibility vests
checking inventory on tablets near neatly stacked pallets. Warm overhead LED lighting creates
an inviting atmosphere. Conveyor belts and shelving systems are visible in the background.
The color palette emphasizes warm whites, navy blue accents, and touches of green from safety vests.
Professional corporate photography quality. Clean, modern, and trustworthy.
Aspect ratio: 4:3 landscape. The image should feel premium and inspire confidence in logistics operations.
No text or watermarks.""",
    filename="why-kadima.png",
    description="WhyKadima section — warehouse/logistics operations photo"
)


# --- Image 2: DHL Spotlight Background (DHL-style delivery scene) ---
generate_image(
    prompt="""Generate an image: A professional commercial photograph of a bright yellow delivery truck
parked at a modern warehouse loading dock during golden hour. The truck is positioned at a
slight angle showing the side and front. The loading dock has clean concrete and organized
package carts nearby. Warm golden sunlight creates dramatic shadows and a professional feel.
The scene conveys reliability, global reach, and efficient delivery operations.
Professional commercial photography with shallow depth of field.
Aspect ratio: approximately 5:4 (slightly taller than wide landscape).
No text, logos, or watermarks on the image itself. Just the truck and environment.""",
    filename="dhl-spotlight.png",
    description="DHL Spotlight section — delivery truck at loading dock"
)


# --- Image 3: OG Image (1200x630 social sharing) ---
generate_image(
    prompt="""Generate an image: A professional Open Graph social sharing graphic image.
Background: Deep navy blue (#0D1F3C) with subtle abstract geometric grid pattern in emerald green (#10B981) at low opacity.
Center text: "KADIMA" in large, bold, clean sans-serif font in white. Below it in smaller text: "LOGISTICS" in emerald green (#10B981).
Below the brand name: "Cut Shipping Costs 20-30%" in white, medium weight.
At the bottom: "Free Shipping Audit | DHL · UPS · FedEx · USPS" in small white text at 70% opacity.
The overall design is clean, corporate, and modern. Minimal. No photographs — pure graphic design.
A subtle emerald green gradient glow emanates from behind the text.
Aspect ratio: 1.91:1 (wide landscape, like 1200x630 pixels).
Professional, premium feel. Like a Fortune 500 company's social card.""",
    filename="og-image.png",
    description="OG social sharing image (1200x630)"
)


print("\n" + "="*60)
print("ALL IMAGE GENERATION COMPLETE")
print("="*60)

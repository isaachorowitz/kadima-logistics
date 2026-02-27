---
name: ziplyne-magic-video
description: >
  AI-powered video generation pipeline for websites using fal.ai models.
  Hero videos use Kling V3 Pro (15-second perfectly looping, no audio, $0.224/sec).
  Other videos use Seedance 1.5 Pro (with audio, 4-12 seconds).
  Compresses with ffmpeg, uploads to Mux for streaming delivery.

  Use this skill whenever the user mentions: website videos, video generation, hero video,
  background video, video loops, looping video, Mux upload, video for website, AI video,
  text-to-video, product video, promo video, video background, video banner, or
  "ZipLyne-Magic-Video". This is SEPARATE from ZipLyne-Magic-Create (images).
---

# ZipLyne-Magic-Video

An AI-powered video pipeline that generates high-quality videos using fal.ai models,
optimizes them for web delivery, and uploads to Mux for streaming.

## Required Environment Variables

**Always verify these are set before running. Ask the user if missing.**

```
FAL_KEY=             # fal.ai API key (for Kling and Seedance video generation)
MUX_TOKEN_ID=        # Mux access token ID
MUX_TOKEN_SECRET=    # Mux access token secret
```

---

## Core Philosophy

**Always ask questions before generating videos.** Video generation is expensive and slow.

1. What is the video for? (hero background loop, product showcase, social media, promo)
2. What aspect ratio? (16:9 landscape, 9:16 portrait, 1:1 square)
3. What is the mood/style? (cinematic, corporate, energetic, calm, dramatic)
4. What industry / brand / visual identity?
5. For hero videos: What motion works best? (aerial, slow orbit, flowing particles, etc.)

---

## Two Models, Two Purposes

This skill uses two distinct models on fal.ai. **Never mix them up.**

### Model 1: Kling V3 Pro — Hero Background Videos ONLY

| Attribute | Value |
|-----------|-------|
| **Endpoint** | `fal-ai/kling-video/v3/pro/text-to-video` |
| **Purpose** | Hero section background video loops |
| **Duration** | Always **15 seconds** |
| **Audio** | Always **OFF** (`generate_audio: false`) |
| **Cost** | $0.224 per second = **$3.36 per 15s video** |
| **Output** | 1080p, no sound |
| **Loop** | Must loop perfectly — prompt engineering is critical |
| **Aspect Ratio** | 16:9 (default), 9:16 for mobile heroes |

**This model produces video WITHOUT sound.** That's perfect for hero backgrounds,
which are always muted in CSS anyway. Every hero video is exactly 15 seconds — no exceptions.

### Model 2: Seedance 1.5 Pro — Everything Else

| Attribute | Value |
|-----------|-------|
| **Endpoint** | `fal-ai/bytedance/seedance/v1.5/pro/text-to-video` |
| **Purpose** | Promo videos, product demos, service showcases, social clips |
| **Duration** | 4-12 seconds (configurable) |
| **Audio** | On by default (native audio generation — dialogue, SFX, ambient) |
| **Cost** | ~$0.26 per 5s video (720p with audio) |
| **Resolution** | 480p or 720p |
| **Aspect Ratio** | 16:9, 9:16, 1:1 |

Seedance 1.5 generates synchronized audio alongside video — dialogue, sound effects,
ambient sound, and even music. It uses a dual-branch diffusion transformer that renders
both modalities in the same latent space, so lip-sync and foley are naturally aligned.

---

## Step 1: Determine What to Generate

**Always ask the user which type of video they need.**

| If they want... | Use | Settings |
|-----------------|-----|----------|
| Hero background loop | Kling V3 Pro | 15s, no audio, 16:9, loop-optimized prompt |
| Mobile hero background | Kling V3 Pro | 15s, no audio, 9:16, loop-optimized prompt |
| Promo/product video | Seedance 1.5 Pro | 8-12s, audio ON, 16:9 or 9:16 |
| Service page clip | Seedance 1.5 Pro | 5-8s, audio optional |
| Social media clip | Seedance 1.5 Pro | 5-8s, audio ON, 9:16 for stories/reels |
| Explainer/demo | Seedance 1.5 Pro | 8-12s, audio ON |

---

## Step 2A: Generate Hero Video with Kling V3 Pro

### Python Implementation

```python
import fal_client
import os
import requests

fal_client.api_key = os.environ["FAL_KEY"]

def generate_hero_video(prompt, aspect_ratio="16:9"):
    """
    Generate a 15-second looping hero background video using Kling V3 Pro.
    Always: 15 seconds, no audio, optimized for perfect looping.
    Cost: $3.36 per video.
    """
    result = fal_client.subscribe(
        "fal-ai/kling-video/v3/pro/text-to-video",
        arguments={
            "prompt": prompt,
            "duration": "15",              # ALWAYS 15 seconds for hero videos
            "aspect_ratio": aspect_ratio,  # "16:9" or "9:16"
            "generate_audio": False,       # ALWAYS false — hero videos are muted
            "cfg_scale": 0.5,              # Default; 0=creative freedom, 1=strict adherence
        },
        with_logs=True,
        on_queue_update=lambda update: (
            print(f"  Status: {update.status}")
            if hasattr(update, 'status') else None
        ),
    )

    video_url = result["video"]["url"]
    print(f"  Video URL: {video_url}")
    return video_url


def download_video(url, output_path):
    """Download the generated video from fal.ai."""
    response = requests.get(url)
    with open(output_path, "wb") as f:
        f.write(response.content)
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"  Downloaded: {output_path} ({size_mb:.1f} MB)")
    return output_path
```

### JavaScript Implementation

```javascript
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

const result = await fal.subscribe("fal-ai/kling-video/v3/pro/text-to-video", {
  input: {
    prompt: "YOUR PROMPT HERE",
    duration: "15",
    aspect_ratio: "16:9",
    generate_audio: false,
    cfg_scale: 0.5,
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});

console.log(result.data.video.url);
```

### Prompt Engineering for PERFECT LOOPS

The most critical part of hero videos is seamless looping. The viewer should never notice
where the video restarts. Use these techniques in every hero video prompt:

**Loop-Friendly Prompt Template:**
```
A continuous, seamlessly cyclical [SCENE DESCRIPTION].
The motion flows smoothly in a perpetual loop with no beginning or end.
[CAMERA MOVEMENT] maintains a steady, repeating rhythm.
[LIGHTING DESCRIPTION]. [MOOD/ATMOSPHERE].
Professional cinematic quality, [STYLE].
The first and last frames should be visually identical for perfect looping.
```

**Best motion types for looping:**
- Slow continuous orbit/rotation around a subject
- Flowing particles, smoke, or liquid
- Gentle parallax drift over a landscape
- Slowly panning across an endless scene
- Abstract flowing shapes and gradients
- Water, clouds, or atmospheric effects in constant motion
- Slow dolly through a space that repeats naturally

**Avoid these — they break loops:**
- Walking/running (start/stop is obvious)
- Sudden camera direction changes
- Events with clear beginnings/endings
- Static scenes with no motion
- Quick movements or transitions

**Example hero prompts by industry:**

*Trucking/Logistics:*
```
A continuous, seamlessly looping aerial drone shot of a modern highway at golden hour.
Semi-trucks flow smoothly along the road in an endless stream.
The camera maintains a steady, gentle forward glide above the highway.
Warm golden light, slight lens flare. Professional cinematic quality.
The motion is perpetual and cyclical with no visible start or end point.
```

*Technology:*
```
A continuous, seamlessly looping abstract visualization of flowing data streams
and neural network connections. Glowing blue and purple particles flow through
interconnected nodes in an endless cycle. The camera slowly orbits around the
center. Dark background, soft ethereal glow. Modern, clean, futuristic.
The animation loops perfectly with no visible cut point.
```

*Real Estate:*
```
A continuous, seamlessly looping slow aerial orbit around a luxury modern home
at dusk. Warm interior lights glow through floor-to-ceiling windows. The camera
maintains a steady circular path. Soft twilight sky, professional cinematic quality.
The orbit completes a full circle for perfect seamless looping.
```

---

## Step 2B: Generate Other Videos with Seedance 1.5 Pro

### Python Implementation

```python
import fal_client
import os

fal_client.api_key = os.environ["FAL_KEY"]

def generate_promo_video(prompt, duration="8", aspect_ratio="16:9",
                         resolution="720p", generate_audio=True):
    """
    Generate a promo/service/product video using Seedance 1.5 Pro.
    Supports native audio generation (dialogue, SFX, ambient).
    """
    result = fal_client.subscribe(
        "fal-ai/bytedance/seedance/v1.5/pro/text-to-video",
        arguments={
            "prompt": prompt,
            "duration": str(duration),         # "4", "5", "6", "8", "10", "12"
            "aspect_ratio": aspect_ratio,      # "16:9", "9:16", "1:1"
            "resolution": resolution,          # "480p" or "720p"
            "generate_audio": generate_audio,  # True for audio, False for silent
        },
        with_logs=True,
        on_queue_update=lambda update: (
            print(f"  Status: {update.status}")
            if hasattr(update, 'status') else None
        ),
    )

    video_url = result["video"]["url"]
    seed = result.get("seed")
    print(f"  Video URL: {video_url}")
    print(f"  Seed: {seed}")
    return video_url
```

### JavaScript Implementation

```javascript
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

const result = await fal.subscribe("fal-ai/bytedance/seedance/v1.5/pro/text-to-video", {
  input: {
    prompt: "YOUR PROMPT HERE",
    duration: "8",
    aspect_ratio: "16:9",
    resolution: "720p",
    generate_audio: true,
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});

console.log(result.data.video.url);
```

### Seedance Audio Prompting

Seedance 1.5 generates audio natively. Include audio cues directly in your prompt:

```
A barista carefully pours steamed milk into a latte, creating a rosetta pattern.
The espresso machine hisses softly in the background. Ambient coffee shop chatter
and light acoustic guitar music create a warm, inviting atmosphere.
"Here you go, one rosetta latte" the barista says with a smile.
```

**Audio tips:**
- Describe ambient sounds: "the hum of traffic", "birds chirping", "rain on windows"
- Include dialogue in quotes for lip-synced speech
- Mention music: "upbeat electronic music", "soft piano score"
- Supports English and Chinese natively; other languages auto-translate to English

---

## Step 3: Video Compression

After downloading from fal.ai, compress for optimal web delivery before uploading to Mux.

### For Hero Background Loops (Kling output)

```bash
# Aggressive compression, no audio, optimized for seamless looping
ffmpeg -y -i hero_raw.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 24 \
  -an \
  -movflags +faststart \
  -pix_fmt yuv420p \
  -vf "scale=1920:-2" \
  hero_compressed.mp4
```

Target: **< 5MB** for a 15-second 1080p hero loop.

### For Promo Videos (Seedance output)

```bash
# Good quality with audio preserved
ffmpeg -y -i promo_raw.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 22 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -pix_fmt yuv420p \
  promo_compressed.mp4
```

### Compression Reference

| CRF | Quality | Use Case |
|-----|---------|----------|
| 20 | Excellent | Promo/showcase videos with audio |
| 22 | Very good | General web video |
| 24 | Good | Background loops (file size priority) |
| 26 | Acceptable | Very aggressive compression |

**Always use `-movflags +faststart`** — this is critical for web video. It moves the
metadata to the front of the file so playback can begin before the full download.

---

## Step 4: Upload to Mux

Mux handles encoding, CDN delivery, and adaptive streaming automatically.

### Python Upload (Direct Upload)

```python
import requests
import os
import time

MUX_TOKEN_ID = os.environ["MUX_TOKEN_ID"]
MUX_TOKEN_SECRET = os.environ["MUX_TOKEN_SECRET"]
MUX_AUTH = (MUX_TOKEN_ID, MUX_TOKEN_SECRET)

def upload_to_mux(file_path):
    """Upload a local video file to Mux via direct upload."""

    # Step 1: Create direct upload URL
    resp = requests.post(
        "https://api.mux.com/video/v1/uploads",
        json={
            "new_asset_settings": {
                "playback_policy": ["public"],
                "mp4_support": "standard",
            },
            "cors_origin": "*",
        },
        auth=MUX_AUTH,
    )
    resp.raise_for_status()
    upload_data = resp.json()["data"]
    upload_url = upload_data["url"]
    upload_id = upload_data["id"]

    # Step 2: PUT the file
    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
    print(f"  Uploading {file_size_mb:.1f} MB to Mux...")
    with open(file_path, "rb") as f:
        requests.put(upload_url, data=f, headers={"Content-Type": "video/mp4"})

    # Step 3: Wait for asset to be ready
    print("  Processing...")
    time.sleep(5)

    for _ in range(60):
        check = requests.get(
            f"https://api.mux.com/video/v1/uploads/{upload_id}",
            auth=MUX_AUTH,
        )
        asset_id = check.json()["data"].get("asset_id")
        if asset_id:
            break
        time.sleep(3)

    if not asset_id:
        print("  WARNING: asset_id not yet available. Check Mux dashboard.")
        return {"upload_id": upload_id, "status": "processing"}

    for _ in range(60):
        asset_resp = requests.get(
            f"https://api.mux.com/video/v1/assets/{asset_id}",
            auth=MUX_AUTH,
        )
        asset = asset_resp.json()["data"]
        if asset["status"] == "ready":
            break
        elif asset["status"] == "errored":
            print(f"  ERROR: {asset.get('errors')}")
            return None
        print(f"  Status: {asset['status']}...")
        time.sleep(5)

    playback_id = asset["playback_ids"][0]["id"]
    return {
        "asset_id": asset_id,
        "playback_id": playback_id,
        "status": "ready",
        "urls": {
            "hls": f"https://stream.mux.com/{playback_id}.m3u8",
            "mp4_high": f"https://stream.mux.com/{playback_id}/high.mp4",
            "mp4_medium": f"https://stream.mux.com/{playback_id}/medium.mp4",
            "thumbnail": f"https://image.mux.com/{playback_id}/thumbnail.png",
            "gif_preview": f"https://image.mux.com/{playback_id}/animated.gif",
        },
    }
```

### Or Upload From fal.ai URL Directly (Skip Download)

```python
def upload_url_to_mux(video_url):
    """Create a Mux asset directly from a fal.ai video URL (no local download needed)."""
    resp = requests.post(
        "https://api.mux.com/video/v1/assets",
        json={
            "input": [{"url": video_url}],
            "playback_policy": ["public"],
            "mp4_support": "standard",
        },
        auth=MUX_AUTH,
    )
    resp.raise_for_status()
    asset = resp.json()["data"]
    # ... then poll for ready status (same as above)
```

---

## Step 5: Embed Video in Website

### Hero Background Loop (Kling output → Mux)

```html
<section class="hero" style="position: relative; overflow: hidden; min-height: 80vh;">
  <video
    autoplay
    loop
    muted
    playsinline
    poster="https://image.mux.com/{PLAYBACK_ID}/thumbnail.png?time=3"
    style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;"
  >
    <source src="https://stream.mux.com/{PLAYBACK_ID}/high.mp4" type="video/mp4">
  </video>
  <!-- Content overlay -->
  <div style="position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; min-height: 80vh;">
    <h1 style="color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.6);">Your Headline</h1>
  </div>
</section>
```

**Key attributes for hero loops:**
- `autoplay` — starts immediately
- `loop` — repeats forever (this is why the 15s video must loop perfectly)
- `muted` — required for autoplay in all browsers; also why Kling's no-audio is perfect
- `playsinline` — prevents fullscreen on iOS

### Promo/Content Video with Mux Player (Seedance output)

```html
<script src="https://cdn.jsdelivr.net/npm/@mux/mux-player"></script>

<mux-player
  stream-type="on-demand"
  playback-id="{PLAYBACK_ID}"
  metadata-video-title="Company Promo"
  accent-color="#FF0000"
  style="width: 100%; aspect-ratio: 16/9;"
></mux-player>
```

### React Components

```jsx
// Hero background loop
function HeroVideo({ playbackId, children }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh' }}>
      <video
        autoPlay loop muted playsInline
        poster={`https://image.mux.com/${playbackId}/thumbnail.png?time=3`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
      >
        <source src={`https://stream.mux.com/${playbackId}/high.mp4`} type="video/mp4" />
      </video>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </section>
  );
}

// Promo video with player
import MuxPlayer from '@mux/mux-player-react';

function PromoVideo({ playbackId, title }) {
  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      metadataVideoTitle={title}
      style={{ width: '100%', aspectRatio: '16/9' }}
    />
  );
}
```

---

## Cost Summary

| Model | Use | Duration | Audio | Cost per Video |
|-------|-----|----------|-------|---------------|
| Kling V3 Pro | Hero loop | 15s | OFF | **$3.36** |
| Seedance 1.5 Pro | Promo (5s) | 5s | ON | **~$0.26** |
| Seedance 1.5 Pro | Promo (8s) | 8s | ON | **~$0.42** |
| Seedance 1.5 Pro | Promo (12s) | 12s | ON | **~$0.62** |
| Seedance 1.5 Pro | Silent clip | 5s | OFF | **~$0.13** |

**Always inform the user of the cost before generating.** Especially for Kling hero videos
at $3.36 each — get the prompt right before burning credits.

---

## Important Behavioral Rules

1. **ALWAYS ask before generating.** Confirm the prompt, model choice, and cost.
2. **Hero videos are ALWAYS 15 seconds with Kling V3 Pro, no audio.**
3. **Non-hero videos use Seedance 1.5 Pro** — ask if they want audio.
4. **Generate one video first.** Show the user before batch-generating more.
5. **Verify the loop.** For hero videos, check that the loop transition is smooth.
6. **Use `-movflags +faststart`** in ffmpeg — non-negotiable for web video.
7. **Compress before uploading to Mux** — saves upload time and Mux processing.
8. **Track everything.** Keep a manifest: prompt, model, fal.ai URL, Mux asset ID, playback ID.
9. **Poster images matter.** Always set a poster/thumbnail for the video element.
10. **Tell the user the cost** before each generation. Hero = $3.36, promos vary.

---

## Script Files

- `scripts/generate_video.py` — Generate videos via fal.ai (both models)
- `scripts/compress_video.py` — Compress and optimize video with ffmpeg
- `scripts/upload_mux.py` — Upload to Mux and get playback URLs

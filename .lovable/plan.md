# Scheduler + Channels (auto-posting)

Two additions: videos that produce themselves at a chosen time, and a Channels page listing your social accounts where finished videos get posted automatically.

## 1. Real scheduler in Studio

- Pick a date and time per production (already in the form) — now it actually drives the work.
- At the scheduled moment, the app prepares the video by itself: every scene image and narration is generated in the background, without anyone clicking.
- The final assembly step (turning stills + voice into the video file) runs in the browser on this setup, so the last step completes automatically the next time the app is open — it picks up any due video and finishes it, uploads it, and marks it ready. If a tab is open at the scheduled time, the whole thing happens hands-off.
- Studio gets a clear timeline: Scheduled for <time> -> Preparing -> Assembling -> Ready -> Posted, plus a "Produce now" override and the existing Download.

Honest limitation: this runtime cannot encode video on the server, so full server-side rendering is not possible. Everything except the final encode is automatic; the encode needs the app open. If you want it fully unattended, that requires an external rendering service and I would need an account for one.

## 2. Channels page

New "Channels" tab beside Sources / Chat / Studio.

- Add a social account: platform (YouTube, TikTok, Instagram, X, Facebook, LinkedIn), display name/handle, and whether auto-post is on.
- Each account can have a posting target: a webhook URL (works today with Zapier, Make, n8n, or your own endpoint) which receives the finished video link, title, description and tags.
- Toggle auto-post per account, delete accounts, and see the post history per video: pending, posted, failed with the reason.
- When a video reaches Ready, every auto-post account fires automatically; failures can be retried from the page.

Direct YouTube/TikTok/Instagram publishing needs each platform's developer app and your approval to connect it. The webhook route works immediately; tell me which platform you want connected directly and I will add it.

## Technical notes

- New tables: `channels` (platform, handle, webhook_url, auto_post, active) and `posts` (video_id, channel_id, status, external_url, error, posted_at), both owner-locked with RLS and grants.
- `videos.status` gains `preparing`; scheduled rows stay `scheduled` until due.
- Cron endpoint `src/routes/api/public/hooks/scheduled-videos.ts`, authenticated with the cron secret, runs every 5 minutes: finds due scheduled videos, generates their scene images and narration, and flips them to `assembling`.
- Client auto-runner in Studio: polls for `assembling` rows, runs the existing browser renderer, uploads to the media bucket, sets `ready`.
- On `ready`, a server fn signs a 7-day URL and POSTs it to each auto-post channel webhook, recording a row in `posts`.
- Reuses existing `buildScene`, `signAssets`, `setVideoStatus`, `renderVideo`.

# Import Genie Buddy AI

Bring the public GitHub project `bestmarket/genie-buddy-ai` into this project. It is already a Lovable-style app, so everything transfers directly — no rewrite needed.

## What the app is

A YouTube-channel content assistant with sign-in, where each user has:

- A channel workspace with a channel profile
- Sources (notes/reference material) they add
- AI-generated video ideas, then scripts with scenes
- A studio that turns scripts into videos (queued, with progress and status), plus scheduling and a media library

Screens: landing page, sign in / sign up, and the signed-in app with Chat, Sources, and Studio.

## What I will do

1. Copy the full app over: all pages, components, styling, chat and studio logic, and AI helpers.
2. Turn on Lovable Cloud so accounts, data and file storage work here.
3. Recreate the database exactly as in the source: profiles, projects, sources, ideas, scripts, videos — each locked to its owner — plus the new-user profile trigger and a private `media` storage area with owner-only access.
4. Wire up AI generation (writing, ideas, scripts, video assets) through the built-in AI, so no external keys are needed.
5. Check it end to end: sign up, create a channel, add a source, generate ideas and a script, and open the studio.

## Technical notes

- Same stack (TanStack Start v1, React 19, Tailwind v4, shadcn), so dependencies and config come over as-is; TanStack package versions stay pinned to this project's template.
- Auth is Supabase-backed via the existing `_authenticated` route gate — preserved unchanged.
- Migrations `0000_import_channel_genie_schema.sql` and `0001_add_video_style.sql` are applied as a Cloud migration, including grants, RLS policies and storage policies.
- AI calls go through the Lovable AI Gateway using `LOVABLE_API_KEY`; no third-party API keys are required.
- The source repo has no cron/webhook endpoints and no external providers to reconnect.

## Existing data

The repository contains no data export. After the preview is up, if this app already has real users and channels elsewhere, you can send CSV/JSON exports of the tables and I will import them.

# Alumni Platform — Phase 1 (MVP core loop)

A multi-tenant alumni community platform: one codebase serves many
branded communities (each org gets its own subdomain, logo, and colors).

## What's built right now

- **Auth** — passwordless magic-link sign-in (Supabase Auth)
- **Onboarding** — new users create a profile tied to their org
- **Member directory** — searchable, filterable by graduation year
- **Feed** — org-wide posts (like a wall)
- **Groups** — create a group, join it, post inside it
- **Branding** — admins can set community name, logo, and colors
- **Multi-tenancy** — subdomain routing (`acme.yourplatform.com`) +
  database-level row security so one org can never see another's data

## What's NOT built yet (later phases)

- Comments UI (table exists in the DB, just needs a component)
- Events/RSVP, direct messaging, email digests (Phase 2)
- Granular per-group permissions, PWA push (Phase 3)
- Stripe billing, admin dashboard (Phase 4)

## How to actually run this (step by step)

You said you don't know the technical side — here's every step.

### 1. Create your accounts (both free to start)
- **Supabase**: https://supabase.com → "New project". Save the
  database password it gives you somewhere safe.
- **Vercel**: https://vercel.com → sign up with GitHub (this is where
  the app will actually live once deployed).

### 2. Set up the database
1. In your Supabase project, go to the **SQL Editor**.
2. Open `supabase/schema.sql` from this project, copy all of it,
   paste it into the SQL editor, and click **Run**.
   This creates every table (organizations, profiles, groups, posts,
   comments) and locks each one down so tenants can't see each
   other's data.

### 3. Connect the app to Supabase
1. In Supabase: **Project Settings → API**. You'll see a Project URL
   and two keys (`anon` and `service_role`).
2. Copy `.env.example` to a new file named `.env.local`.
3. Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   from that page.

### 4. Create your first organization (tenant)
In Supabase's **Table Editor → organizations**, add a row manually:
- `name`: e.g. "Springfield High Alumni"
- `subdomain`: e.g. "springfield" (lowercase, no spaces)

That's your first pilot community. In local dev you'll visit it at
`springfield.localhost:3000`.

### 5. Run it locally (to test before going live)
This needs Node.js installed (https://nodejs.org — get the LTS version).
Then, in a terminal, inside this project folder:
```
npm install
npm run dev
```
Visit `http://springfield.localhost:3000` in your browser.

### 6. Deploy it for real (so your pilot community can use it)
1. Push this project to a GitHub repo.
2. In Vercel: **Add New Project** → import that repo.
3. Add the same environment variables from `.env.local` in Vercel's
   project settings.
4. Set `NEXT_PUBLIC_ROOT_DOMAIN` to your real domain once you buy one
   (e.g. `yourplatform.com`), and configure wildcard DNS
   (`*.yourplatform.com`) pointing at Vercel so every org subdomain
   works automatically.
5. Deploy. Your pilot community can then sign in at
   `springfield.yourplatform.com`.

### 7. First admin
The first person who signs up for an org needs `role` manually set to
`admin` in the `profiles` table (Supabase Table Editor) so they can
access `/settings` and customize branding.

## Project structure
```
app/                  pages (Next.js App Router)
  page.tsx            org-wide feed
  directory/          member directory
  groups/[id]/        single group feed
  profile/[id]/       member profile
  settings/           admin branding controls
  login/, onboarding/ auth flow
  api/auth/callback/  magic-link exchange
components/           shared UI (post composer, post list)
lib/                  supabase clients, tenant resolution, org loader
middleware.ts         subdomain -> tenant header injection
supabase/schema.sql   full database schema + row-level security
```

## Next steps (in order)
1. Get this deployed and create 2-3 test posts/groups yourself.
2. Find one real pilot community (a small alumni chapter or club) and
   onboard them manually — create their org row, invite a few people.
3. Watch how they actually use it for a couple weeks.
4. Come back and we'll build Phase 2 (events, messaging, email digests)
   based on what they actually ask for — not before.

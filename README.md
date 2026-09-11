# MechNest
Website at: https://mech-nest.com

## Supabase admin setup

The app supports Supabase-backed administrator accounts and shared CAD uploads.

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql).
3. In Authentication, create an email/password user.
4. Copy that user's ID and run:

```sql
insert into public.profiles (id, is_admin)
values ('YOUR_AUTH_USER_ID', true);
```

5. Copy `.env.example` to `.env.local` and add the project URL and anon key.
6. Restart the development server with `npm start`.

Without Supabase environment variables, the app uses the local development fallback account shown in the Admin panel. That fallback is not suitable for production.

## Publish to the website

From the project folder, run:

```bash
cp .env.example .env.local
# Edit .env.local with the Supabase URL and anon key
npm run deploy
```

The deploy script builds the app and publishes the `build` folder to the `gh-pages` branch. In GitHub, open **Settings → Pages** and set the source to the `gh-pages` branch and `/ (root)`. The custom domain is preserved by [`public/CNAME`](public/CNAME).

After deployment, open `https://mech-nest.com`. If the domain is not connected yet, add the GitHub Pages DNS records at your domain provider and wait for DNS propagation.
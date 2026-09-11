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
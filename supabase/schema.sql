create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create table public.designs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  team_number text not null,
  team_name text not null default '',
  description text not null,
  image_url text not null default '',
  team_url text not null default '',
  cad_url text not null default '',
  cad_file_path text not null default '',
  season text not null,
  drivetrain text not null,
  tags text[] not null default '{}',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.designs enable row level security;

create policy "Anyone can read designs"
  on public.designs for select
  using (true);

create policy "Admins can add designs"
  on public.designs for insert
  with check (
    auth.uid() = created_by
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

insert into storage.buckets (id, name, public)
values ('cad-files', 'cad-files', true)
on conflict (id) do nothing;

create policy "Anyone can read CAD files"
  on storage.objects for select
  using (bucket_id = 'cad-files');

create policy "Admins can upload CAD files"
  on storage.objects for insert
  with check (
    bucket_id = 'cad-files'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );
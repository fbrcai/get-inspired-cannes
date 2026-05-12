-- Run this in your Supabase SQL editor

-- Gallery table
create table if not exists gallery (
  id                uuid        primary key default gen_random_uuid(),
  image_url         text        not null,
  inspiration       text        not null,
  inspiration_words text,
  charity_name      text,
  charity_logo      text,
  email             text,
  name              text,
  created_at        timestamptz default now()
);

alter table gallery enable row level security;

create policy "Public can read gallery"
  on gallery for select using (true);

create index if not exists gallery_created_at_idx
  on gallery(created_at desc);

-- Storage bucket
insert into storage.buckets (id, name, public)
  values ('photos', 'photos', true)
  on conflict (id) do nothing;

-- Drop and recreate storage policies cleanly
drop policy if exists "Anyone can upload photos" on storage.objects;
drop policy if exists "Photos are publicly readable" on storage.objects;
drop policy if exists "Service role can upload generated images" on storage.objects;
drop policy if exists "Public upload to photos bucket" on storage.objects;
drop policy if exists "Public read from photos bucket" on storage.objects;
drop policy if exists "Service role full access" on storage.objects;

create policy "Public upload to photos bucket"
  on storage.objects for insert
  with check (bucket_id = 'photos');

create policy "Public read from photos bucket"
  on storage.objects for select
  using (bucket_id = 'photos');

create policy "Service role full access"
  on storage.objects
  using (bucket_id = 'photos');

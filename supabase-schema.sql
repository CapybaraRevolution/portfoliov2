-- Comments Table Schema for Supabase
-- Run this in your Supabase SQL editor after creating a new project

-- Create comments table
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  item_id text not null,
  author text not null check (char_length(author) <= 50),
  content text not null check (char_length(content) <= 2000),
  mood text check (mood in ('excited', 'loved', 'happy', 'sad', 'thumbsy') or mood is null),
  client_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for better performance
create index if not exists comments_item_id_idx on comments (item_id);
create index if not exists comments_created_at_idx on comments (created_at desc);

-- Enable Row Level Security (RLS)
alter table comments enable row level security;

-- Create policy to allow all operations for now (you can restrict later)
create policy "Enable all operations for comments" on comments
  for all using (true) with check (true);

-- Optional: Create a function to get comments for an item
create or replace function get_comments_for_item(item_id_param text)
returns table (
  id uuid,
  item_id text,
  author text,
  content text,
  mood text,
  created_at timestamp with time zone
) as $$
begin
  return query
  select 
    c.id,
    c.item_id,
    c.author,
    c.content,
    c.mood,
    c.created_at
  from comments c
  where c.item_id = item_id_param
  order by c.created_at desc;
end;
$$ language plpgsql;
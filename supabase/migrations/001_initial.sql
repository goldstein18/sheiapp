-- Run in Supabase SQL Editor or via supabase db push after linking the project.
-- Creates tables for profiles, questionnaires, courses, goals, promos, and family tree.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  phone text,
  full_name text,
  first_name text,
  last_name_paternal text,
  last_name_maternal text,
  birthdate date,
  gender text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.questionnaire_responses (
  id uuid primary key default gen_random_uuid (),
  user_id uuid not null references auth.users (id) on delete cascade,
  version text not null default '1',
  text_section jsonb,
  color_section jsonb,
  updated_at timestamptz not null default now(),
  unique (user_id, version)
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid (),
  title text not null,
  description text,
  category text not null,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.user_course_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  progress_percent int not null default 0 check (
    progress_percent >= 0
    and progress_percent <= 100
  ),
  completed_at timestamptz,
  last_accessed_at timestamptz default now(),
  primary key (user_id, course_id)
);

create table if not exists public.goal_templates (
  id text primary key,
  title text not null,
  sort_order int not null default 0
);

create table if not exists public.user_goals (
  user_id uuid not null references auth.users (id) on delete cascade,
  goal_id text not null references public.goal_templates (id) on delete cascade,
  completed boolean not null default false,
  primary key (user_id, goal_id)
);

create table if not exists public.promo_cards (
  id uuid primary key default gen_random_uuid (),
  title text not null,
  description text,
  card_type text not null default 'story',
  sort_order int not null default 0,
  active boolean not null default true
);

create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid (),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  relation text not null,
  generation_label text,
  parent_id uuid references public.family_members (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_family_members_user on public.family_members (user_id);

insert into
  public.goal_templates (id, title, sort_order)
values
  ('profile', 'Perfil inicial completo', 1),
  ('quiz', 'Cuestionario AS-27', 2),
  ('plan', 'Define tu plan de acción', 3) on conflict (id) do nothing;

insert into
  public.promo_cards (title, description, card_type, sort_order)
values
  (
    'Tu ruta personalizada',
    'Descubre el siguiente paso recomendado para tu perfil.',
    'video',
    1
  ),
  (
    'Impulsa tu carrera',
    'Historias de usuarios que cambiaron su futuro con Shei.',
    'story',
    2
  ),
  (
    'Aliado del mes',
    'Conoce la beca exclusiva con nuestros partners.',
    'ad',
    3
  );

insert into
  public.courses (title, description, category, sort_order)
values
  (
    'Liderazgo consciente',
    'Fundamentos para equipos modernos.',
    'Negocios',
    1
  ),
  (
    'Intro a la IA aplicada',
    'Herramientas prácticas para tu día a día.',
    'Tecnología',
    2
  ),
  (
    'Design thinking creativo',
    'Resuelve problemas de forma creativa.',
    'Creatividad',
    3
  ),
  (
    'Comunicación efectiva',
    'Presenta ideas con claridad.',
    'Negocios',
    4
  ),
  (
    'Productividad digital',
    'Organiza tu flujo de trabajo.',
    'Tecnología',
    5
  ),
  (
    'Marca personal',
    'Construye tu historia profesional.',
    'Creatividad',
    6
  );

-- Same reasoning as session_track_enum.sql: an enum keeps the allowed values
-- part of the schema, so `pnpm db:types` generates a union type instead of a
-- plain string.

create type public.session_level as enum (
  'beginner',
  'intermediate',
  'advanced'
);

-- Added nullable first: each existing row needs its own distinct value (see
-- the backfill below), so a single column-wide DEFAULT would be wrong for
-- every row but one. The column is locked to NOT NULL only once every row
-- has been backfilled.
alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions set level = 'beginner' where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced' where id = 'server-components-deep-dive';
update public.sessions set level = 'intermediate' where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'advanced' where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner' where id = 'closing-panel';

alter table public.sessions
  alter column level set not null;

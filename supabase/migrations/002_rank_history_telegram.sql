create table rank_history(id uuid primary key default gen_random_uuid(), player_id uuid not null references profiles on delete cascade, mode_id uuid not null references pvp_modes, previous_tier_id uuid references rank_tiers, new_tier_id uuid not null references rank_tiers, changed_by uuid references profiles, notified_at timestamptz, created_at timestamptz default now());
create index on rank_history(player_id, created_at desc);
alter table rank_history enable row level security;
create policy pub_history on rank_history for select using (true);
create policy staff_history_upd on rank_history for update using (is_staff()) with check (is_staff());
create function log_rank_change() returns trigger language plpgsql security definer as $$
begin
  if tg_op='INSERT' or old.tier_id is distinct from new.tier_id then
    insert into rank_history(player_id,mode_id,previous_tier_id,new_tier_id,changed_by)
    values(new.player_id,new.mode_id,case when tg_op='UPDATE' then old.tier_id end,new.tier_id,auth.uid());
    insert into audit_logs(actor_id,action,target,details) values(auth.uid(),'rank_change',new.player_id::text,jsonb_build_object('mode',new.mode_id,'tier',new.tier_id));
  end if; return new;
end $$;
create trigger player_rank_history after insert or update on player_ranks for each row execute function log_rank_change();
-- Sanity: tiers must be in order Bronze III(1) ... Elite I(12)
-- select name, sort_order from rank_tiers order by sort_order;

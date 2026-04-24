import {
  Activity,
  CalendarDays,
  Clock3,
  Fingerprint,
  LogOut,
  Mail,
  Shield,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button } from '../components/Button';
import { useLogout } from '../features/auth/api/use-logout';
import type { OutletContext } from '../types/outlet-context';
import { formatLocalTime } from '../utils/formatDate';

type ProfileStatProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
};

function ProfileStat({ icon, label, value, hint }: ProfileStatProps) {
  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-900/55 p-4 shadow-[0_0_24px_-16px_rgba(182,160,255,0.35)] ring-1 ring-white/5 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.25em]">
            {label}
          </p>
          <p className="mt-1 truncate font-extrabold font-headline text-white text-xl">
            {value}
          </p>
          {hint && <p className="mt-1 text-slate-400 text-sm">{hint}</p>}
        </div>
      </div>
    </div>
  );
}

export function UserPage() {
  const { user } = useOutletContext<OutletContext>();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const displayName = user.name?.trim() || 'User';

  const createdAtLabel = useMemo(
    () => formatLocalTime(user.createdAt),
    [user.createdAt],
  );

  const updatedAtLabel = useMemo(
    () => formatLocalTime(user.updatedAt),
    [user.updatedAt],
  );

  const memberForDays = useMemo(() => {
    const createdDate = new Date(user.createdAt);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - createdDate.getTime();
    return Math.max(1, Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)));
  }, [user.createdAt]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,160,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(111,155,255,0.14),transparent_28%),linear-gradient(180deg,rgba(13,14,19,0.98),rgba(13,14,19,1))]" />
      <div className="absolute top-8 left-10 h-44 w-44 rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute right-4 bottom-8 h-56 w-56 rounded-full bg-tertiary/10 blur-[130px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-4xl border border-slate-800/60 bg-slate-950/60 shadow-[0_0_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/5 backdrop-blur-md">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,255,139,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(182,160,255,0.08),transparent_26%)]" />

              <div className="relative flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-secondary">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-label text-xs uppercase tracking-[0.25em]">
                      Your profile
                    </span>
                  </div>

                  <Button
                    className="rounded-full px-5"
                    disabled={isLoggingOut}
                    onClick={() => logout()}
                    variant="outline"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{isLoggingOut ? 'Signing out...' : 'Logout'}</span>
                  </Button>
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-label text-slate-500 text-sm uppercase tracking-[0.25em]">
                          Welcome back
                        </p>
                        <h1 className="mt-1 font-extrabold font-headline text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                          {displayName}
                        </h1>
                        <p className="mt-2 max-w-2xl text-slate-400 leading-relaxed">
                          This page brings together your account snapshot,
                          identity details, and the most important metadata from
                          your profile.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 font-semibold text-secondary text-sm">
                        <Shield className="h-4 w-4" />
                        {user.role}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-semibold text-primary text-sm">
                        <Activity className="h-4 w-4" />
                        {user.active ? 'Account active' : 'Account inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="grid min-w-60 gap-3 rounded-3xl border border-slate-800/70 bg-slate-900/55 p-4 sm:grid-cols-2 md:grid-cols-1">
                    <div className="rounded-2xl bg-slate-950/50 px-4 py-3">
                      <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.25em]">
                        Member since
                      </p>
                      <p className="mt-1 font-extrabold font-headline text-lg text-white">
                        {memberForDays} days
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-950/50 px-4 py-3">
                      <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.25em]">
                        Updated
                      </p>
                      <p className="mt-1 font-extrabold font-headline text-lg text-white">
                        {updatedAtLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-slate-800/60 border-t bg-slate-950/55 p-6 sm:p-8 lg:border-t-0 lg:border-l lg:p-8">
              <div className="flex h-full flex-col justify-between gap-5 rounded-4xl border border-slate-800/60 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%),linear-gradient(180deg,rgba(20,21,30,0.92),rgba(13,14,19,0.98))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div>
                  <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.3em]">
                    Account signal
                  </p>
                  <h2 className="mt-2 font-extrabold font-headline text-2xl text-white tracking-tight">
                    Everything you need at a glance
                  </h2>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    A clean, premium summary of the profile used by the current
                    session.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 px-4 py-3">
                    <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.25em]">
                      User ID
                    </p>
                    <p className="mt-2 break-all font-mono text-slate-200 text-sm">
                      {user.id}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 px-4 py-3">
                    <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.25em]">
                      Email
                    </p>
                    <p className="mt-2 break-all font-headline font-semibold text-base text-white">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          <ProfileStat
            icon={<UserRound className="h-5 w-5" />}
            label="Name"
            value={displayName}
            hint="The display name used across the dashboard."
          />
          <ProfileStat
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value={user.email}
            hint="Primary contact address for the account."
          />
          <ProfileStat
            icon={<CalendarDays className="h-5 w-5" />}
            label="Created"
            value={createdAtLabel}
            hint="When this account was first registered."
          />
          <ProfileStat
            icon={<Clock3 className="h-5 w-5" />}
            label="Last updated"
            value={updatedAtLabel}
            hint="The last time your profile was changed."
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="rounded-4xl border border-slate-800/60 bg-slate-950/55 p-6 shadow-[0_0_60px_-24px_rgba(182,160,255,0.18)] ring-1 ring-white/5 sm:p-8">
            <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.3em]">
              Profile details
            </p>
            <h2 className="mt-2 font-extrabold font-headline text-2xl text-white tracking-tight sm:text-3xl">
              Account information
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800/70 bg-slate-900/50 p-5">
                <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.25em]">
                  Full name
                </p>
                <p className="mt-2 font-extrabold font-headline text-white text-xl">
                  {displayName}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800/70 bg-slate-900/50 p-5">
                <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.25em]">
                  Role
                </p>
                <p className="mt-2 font-extrabold font-headline text-secondary text-xl">
                  {user.role}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800/70 bg-slate-900/50 p-5">
                <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.25em]">
                  Account state
                </p>
                <p className="mt-2 font-extrabold font-headline text-white text-xl">
                  {user.active ? 'Active' : 'Inactive'}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800/70 bg-slate-900/50 p-5">
                <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.25em]">
                  Session recap
                </p>
                <p className="mt-2 font-extrabold font-headline text-primary text-xl">
                  {memberForDays} days on platform
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-4xl border border-slate-800/60 bg-slate-950/55 p-6 shadow-[0_0_60px_-24px_rgba(111,155,255,0.16)] ring-1 ring-white/5 sm:p-8">
            <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.3em]">
              Activity
            </p>
            <h2 className="mt-2 font-extrabold font-headline text-2xl text-white tracking-tight sm:text-3xl">
              Recent profile snapshot
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/50 p-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Fingerprint className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Identity resolved</p>
                  <p className="mt-1 text-slate-400 text-sm leading-relaxed">
                    The current session is authenticated as{' '}
                    <span className="text-secondary">{displayName}</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/50 p-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Account health</p>
                  <p className="mt-1 text-slate-400 text-sm leading-relaxed">
                    {user.active
                      ? 'The account is active and ready to use inside the protected area.'
                      : 'The account is not active at the moment.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/50 p-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-tertiary/10 text-tertiary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Created on</p>
                  <p className="mt-1 text-slate-400 text-sm leading-relaxed">
                    {createdAtLabel}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/50 p-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Last updated</p>
                  <p className="mt-1 text-slate-400 text-sm leading-relaxed">
                    {updatedAtLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-4xl border border-slate-800/60 bg-slate-950/55 p-6 shadow-[0_0_60px_-24px_rgba(111,155,255,0.16)] ring-1 ring-white/5 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-label text-[11px] text-slate-500 uppercase tracking-[0.3em]">
                Session control
              </p>
              <h2 className="mt-2 font-extrabold font-headline text-2xl text-white tracking-tight sm:text-3xl">
                Leave your account securely
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400 text-sm leading-relaxed">
                Use the logout action to end your session and return to the
                sign-in screen.
              </p>
            </div>

            <Button
              className="min-w-40 rounded-full px-6"
              disabled={isLoggingOut}
              onClick={() => logout()}
              variant="outline"
            >
              <LogOut className="h-4 w-4" />
              <span>{isLoggingOut ? 'Signing out...' : 'Logout now'}</span>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

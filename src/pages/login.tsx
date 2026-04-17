import { Eye, Lock, Mail, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import * as Input from '../components/input/Index';

export function Login() {
  return (
    <main className="flex min-h-screen w-full font-body text-white selection:bg-primary/30">
      <section className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-linear-to-br from-indigo-950 via-violet-[#2a1b54] to-slate-950 px-24 shadow-[0_0_80px_-15px_rgba(139,92,246,0.1)] lg:flex">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-md">
              <Wallet className="" />
            </div>
            <span className="font-extrabold font-headline text-2xl tracking-tight">
              Saving4You
            </span>
          </div>

          <h1 className="mb-12 font-extrabold font-headline text-5xl leading-[1.1] tracking-tight md:text-6xl">
            The Digital <br />
            <span className="bg-linear-to-r from-violet-700 via-primary to-tertiary bg-clip-text font-black text-transparent">
              Architect
            </span>{' '}
            of Your <br />{' '}
            <span className="bg-linear-to-r from-secondary to-tertiary bg-clip-text font-black text-transparent">
              Financial
            </span>{' '}
            Future
          </h1>
        </div>

        <div className="absolute -top-32 -right-32 z-0 size-152 rounded-full bg-primary/30 blur-[190px]" />
        <div className="absolute -bottom-32 -left-32 z-0 size-152 rounded-full bg-tertiary/20 blur-[190px]" />
      </section>

      <section className="flex w-full items-center justify-center bg-obsidian p-8 sm:p-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-12">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Wallet className="text-primary text-xl" />
            </div>
            <span className="font-bold font-headline text-white text-xl tracking-tight">
              Saving4You
            </span>
          </div>

          <header>
            <h2 className="mb-3 font-extrabold font-headline text-4xl text-white tracking-tight">
              Welcome back
            </h2>
            <p className="font-body text-base text-white-variant">
              Enter your credentials to manage your{' '}
              <span className="text-secondary">empire</span>.
            </p>
          </header>

          <form className="space-y-8">
            <div className="group space-y-2">
              <Input.Label htmlFor="email">Email address</Input.Label>

              <Input.Root>
                <Input.Prefix>
                  <Mail className="h-5 w-5" />
                </Input.Prefix>
                <Input.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                />
              </Input.Root>
            </div>

            <div className="group space-y-2">
              <div className="flex items-center justify-between px-1">
                <Input.Label htmlFor="password">Password</Input.Label>
                <Link
                  to="/"
                  className="mb-2 font-medium text-secondary text-sm transition-colors hover:text-primary-dim"
                >
                  Forgot your password?
                </Link>
              </div>

              <Input.Root>
                <Input.Prefix>
                  <Lock className="h-5 w-5" />
                </Input.Prefix>
                <Input.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="cursor-pointer pr-2 text-outline transition-colors hover:text-white"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </Input.Root>
            </div>

            <Button className="mx-auto w-full">Authorize Access</Button>
          </form>

          <footer className="pt-4 text-center">
            <p className="text-sm text-white-variant">
              Don't have an account?{' '}
              <Link
                to="/"
                className="font-semibold text-secondary decoration-2 underline-offset-4 hover:underline"
              >
                Create your wealth profile
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}

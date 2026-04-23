import { Loader, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { LoginForm } from '../features/login/LoginForm';
import { useGetUsersActive } from '../features/platform/api/get-users-active';
import { RegisterForm } from '../features/register/RegisterForm';
import { formatLocalTime } from '../utils/formatDate';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const { data: stats, isLoading } = useGetUsersActive();

  return (
    <main className="flex min-h-screen w-full font-body text-white selection:bg-primary/30">
      <section className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-linear-to-br from-indigo-950 via-violet-[#2a1b54] to-slate-950 px-24 shadow-[0_0_80px_-15px_rgba(139,92,246,0.1)] lg:flex">
        <div className="z-10 flex h-full w-full flex-col items-start justify-center gap-20">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-md">
                <Wallet className="" />
              </div>
              <span className="font-extrabold font-headline text-2xl tracking-tight">
                Saving
                <strong className="text-secondary">4You</strong>
              </span>
            </div>

            <h1 className="font-extrabold font-headline text-5xl leading-[1.1] tracking-tight md:text-6xl">
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

          {stats && (
            <div>
              <Card variant="glass" className="max-w-sm">
                <CardHeader>
                  <CardTitle>Total users active</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="font-extrabold text-4xl text-primary">
                    {stats?.activeUsersCount}
                  </p>
                  {stats?.lastUserRegistrationDate && (
                    <p className="mt-2 text-outline-variant text-sm">
                      Atualizado há{' '}
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        formatLocalTime(stats?.lastUserRegistrationDate)
                      )}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="absolute -top-32 -right-32 z-0 size-152 rounded-full bg-primary/30 blur-[190px]" />
        <div className="absolute -bottom-32 -left-32 z-0 size-152 rounded-full bg-tertiary/20 blur-[190px]" />
      </section>

      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-obsidian p-8 lg:w-1/2 lg:p-0">
        <div className="w-full overflow-hidden">
          <div
            className={`flex w-[200%] items-center justify-center gap-2 transition-transform duration-700 ease-in-out md:gap-0 ${
              isLogin ? 'translate-x-0' : '-translate-x-1/2'
            }`}
          >
            <div className="h-max w-1/2 shrink-0">
              <div className="mb-8 flex items-center justify-center gap-2 md:justify-start lg:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Wallet className="text-primary text-xl" />
                </div>
                <span className="font-bold font-headline text-white text-xl tracking-tight">
                  Saving
                  <strong className="text-secondary">4You</strong>
                </span>
              </div>

              <div className="mx-auto flex max-w-md flex-col gap-6 rounded-xl bg-outline/20 p-8">
                <header className="mb-6 space-y-2 text-center md:text-left">
                  <h2 className="font-extrabold font-headline text-4xl text-white tracking-tight">
                    Welcome back
                  </h2>
                  <p className="font-body text-base text-white-variant">
                    Enter your credentials to manage your{' '}
                    <span className="text-secondary">empire</span>.
                  </p>
                </header>

                <LoginForm />

                <footer className="text-center">
                  <p className="text-sm text-white-variant">
                    Don't have an account?{' '}
                    <strong
                      onClick={() => setIsLogin(false)}
                      className="cursor-pointer font-semibold text-secondary decoration-2 underline-offset-4 hover:underline"
                    >
                      Create your wealth profile
                    </strong>
                  </p>
                </footer>
              </div>
            </div>

            <div className="w-1/2 shrink-0">
              <div className="mb-8 flex items-center justify-center gap-2 md:justify-start lg:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Wallet className="text-primary text-xl" />
                </div>
                <span className="font-bold font-headline text-white text-xl tracking-tight">
                  Saving <strong className="text-secondary">4You</strong>
                </span>
              </div>

              <div className="mx-auto flex max-w-lg flex-col gap-6 rounded-xl bg-outline/20 p-8">
                <header className="mb-6 space-y-2 text-center md:text-left">
                  <h2 className="font-extrabold font-headline text-4xl text-white tracking-tight">
                    Construct your future now
                  </h2>
                  <p className="font-body text-base text-white-variant">
                    Sign up to start building your{' '}
                    <span className="text-secondary">empire</span>.
                  </p>
                </header>

                <RegisterForm setIsLogin={setIsLogin} />

                <footer className="text-center">
                  <p className="text-sm text-white-variant">
                    Already have an account?{' '}
                    <strong
                      onClick={() => setIsLogin(true)}
                      className="cursor-pointer font-semibold text-secondary decoration-2 underline-offset-4 hover:underline"
                    >
                      Sign in
                    </strong>
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

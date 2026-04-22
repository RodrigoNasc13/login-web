import { Edit2, Trash2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../../components/Button';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(inputs.filter(Boolean).join(' '));
}

const mockUsers = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 'sarah.j@saving4you.com',
    role: 'Administrator',
    status: 'Active',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnLJGxnkCvdVgZnhmO4e6FnpE1KrGLNekEsN-ViGEmZ1qacjNSMxa5wWw9c3lXlgET9A1TVAeRFYXP1KyReuDmk1WZybAQgX9K_3XdCqFe-cPdnSdqrgEWCgdexWCEmHGOdMmtiGNmsw51Fly9fLgyO_SCFS1o2qOkL5IZISw90ZMzl8NacrU_hofLqiVVUjqkLsb1btqQmUhTPTKagevhGKd3mq4YjCnA1mXi4jBnZeki8jb_Ufja_m1uQcR6woump3QzeGoTP_o',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@saving4you.com',
    role: 'Wealth Advisor',
    status: 'Active',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBylfvtE74f8KFICd2XzNF3VahlEqum2l3bM6SYMvKKtQ3p3tdFriFE1MQKvcwxvPEiUb5mrMHtmYHsNshOFRWGcyLXCzEQoPEQA69BFvAPkcjX4LIQkUtV2g8GW3loiIavR9LhcCE6N2XxYVC1CF_MyMHUvqwUAwZXnCf32otJkFN6-CBUgMQRsYzFmo7bp2eWHJ1ioA_mX088YdMnqBLypIOPJwIqxLm2ZOALPJP5On8WqbGjsZjSl29yGar5V0aiCvMc2REa2LM',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    email: 'elena.r@saving4you.com',
    role: 'Client Support',
    status: 'Inactive',
    avatar: null,
    initials: 'ER',
  },
];

export function UserTable() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-outline/15 bg-default-gray/40 shadow-[0_8px_40px_rgba(182,160,255,0.05)] backdrop-blur-xl">
      <div className="pointer-events-none absolute top-0 left-1/4 h-32 w-1/2 rounded-full bg-primary/10 blur-[100px]"></div>

      <div className="relative z-10 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-outline/15 border-b bg-default-gray/50 font-headline font-semibold text-white/70 text-xs uppercase tracking-wider">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-transparent font-body text-sm">
            {mockUsers.map((user) => (
              <tr
                key={user.id}
                className="group transition-colors duration-200 hover:bg-default-gray/80"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full border border-outline/30 object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-outline/30 bg-default-gray font-bold font-headline text-white">
                        {user.initials}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-white transition-colors group-hover:text-primary">
                        {user.name}
                      </div>
                      <div className="mt-0.5 text-white/50 text-xs">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/70">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs',
                      user.status === 'Active'
                        ? 'border-secondary/20 bg-secondary/10 text-secondary'
                        : 'border-outline/30 bg-outline/20 text-white/50',
                    )}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="space-x-2 px-6 py-4 text-right">
                  <Button className="rounded-lg p-2 text-white/50 transition-colors hover:bg-default-gray hover:text-primary">
                    <Edit2 className="h-5 w-5" />
                  </Button>
                  <Button className="rounded-lg p-2 text-white/50 transition-colors hover:bg-default-gray hover:text-red-400">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

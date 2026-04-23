type UserRole = 'ADMIN' | 'USER' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  role: UserRole;
}

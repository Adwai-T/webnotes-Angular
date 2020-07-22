export interface AuthenticatedUser{
  userName: string;
  active: boolean;
  roles: string;
  email: string;
  id?: number;
  password?: string;
}

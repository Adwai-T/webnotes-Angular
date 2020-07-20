export interface AuthenticatedUser{
  userName: string;
  active: boolean;
  roles: string;
  id: number;
  email: string;
}

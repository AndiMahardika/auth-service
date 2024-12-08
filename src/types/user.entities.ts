export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface IUserUpdate {
  name: string;
  password: string;
}
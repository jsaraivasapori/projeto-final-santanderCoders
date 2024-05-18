export interface UserCredentials {
  email: string;
  password: string;
}

export interface AddUser{
name: string
email: string
password: string
role:string
}

export interface AuthenticatedUser {
  token: string;
  user: User;
}

export interface User{
  name: string
  email: string
  password: string
  role:string
  id: string

}



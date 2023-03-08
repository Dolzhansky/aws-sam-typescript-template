
export interface TokenPayload {
  id: string;
  username: string;
}

export interface UserPayload {
  id: string;
  username: string;
  password: string
}

export interface RegistrationInterface {
  username: string;
  password: string;
}
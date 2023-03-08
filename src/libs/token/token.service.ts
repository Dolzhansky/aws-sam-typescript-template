import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../environment';
import { TokenPayload } from '../interfaces';

export class TokenService {
  constructor() {}

  public createToken(payload: TokenPayload) {
    return jwt.sign(JSON.stringify(payload), JWT_KEY, { expiresIn: '1h' })
  }

  public verifyToken(token: string) {
    return JSON.parse(jwt.verify(token, JWT_KEY) as string) as TokenPayload;
  }

}
import { TokenService } from './token';
import { ErrorsEnum } from './enums';


export const authorizationGuard = (token: string) => {
  const service = new TokenService()

  const userInformation = service.verifyToken(token)

  if (!userInformation) {
    throw new Error(ErrorsEnum.FORBIDDEN)
  }
  return  {
    id: userInformation.id,
  }

}
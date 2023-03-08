import { APIGatewayEvent } from 'aws-lambda';
import { authorizationGuard, ErrorsEnum, RedisService } from '../libs';

export const getUser = async (event: APIGatewayEvent) => {
  const authorization = event.headers['authorization']
  if (!authorization) {
    return {
      statusCode: 403,
      body: {
        message: ErrorsEnum.FORBIDDEN
      }
    }
  }

  const payload = authorizationGuard(authorization)
  const redis = new RedisService()

  const user = redis.get(payload.id)
  if (!user) {
    return {
      statusCode: 404,
      body: {
        message: ErrorsEnum.USER_NOT_FOUND
      }
    }
  }

  return {
    statusCode: 200,
    body: user
  }
}
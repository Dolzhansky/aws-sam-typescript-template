import { APIGatewayEvent } from 'aws-lambda';
import { ErrorsEnum, RedisService, RegistrationInterface, TokenPayload, TokenService, UserPayload } from '../libs';
import {v4 as uuid} from 'uuid';
export const registration = async (event: APIGatewayEvent) => {

  const body = JSON.parse(event.body) as RegistrationInterface;

  if (!body || !body.password || !body.username) {
    return {
      statusCode: 400,
      body: {
        message: ErrorsEnum.VALIDATION_ERRORS
      }
    }
  }

  const redis = new RedisService()
  const token = new TokenService()

  const isExist = await redis.get(`USER:${body.username}`)
  if (isExist) {
    return {
      statusCode: 400,
      body: {
        message: ErrorsEnum.USER_IS_EXIST
      }
    }
  }

  const user: UserPayload = {
    id: uuid(),
    username: body.username,
    password: body.password,
  }

  const hash = token.createToken({ id: user.id, username: user.username })

  await redis.set<UserPayload>(`USER:${user.username}`, user, 0)

  return {
    statusCode: 200,
    body: {
      token: hash
    }
  }
}

export const login = async (event: APIGatewayEvent) => {

  const body = JSON.parse(event.body) as RegistrationInterface;

  if (!body || !body.password || !body.username) {
    return {
      statusCode: 400,
      body: {
        message: ErrorsEnum.VALIDATION_ERRORS
      }
    }
  }

  const redis = new RedisService()
  const token = new TokenService()

  const isExist = await redis.get(`USER:${body.username}`)
  if (!isExist) {
    return {
      statusCode: 404,
      body: {
        message: ErrorsEnum.USER_NOT_FOUND
      }
    }
  }

  const user = JSON.parse(isExist) as UserPayload;

  if(user.password !== body.password) {
    return {
      statusCode: 400,
      body: {
        message: ErrorsEnum.PASSWORDS_MIS_MATCH
      }
    }
  }

  const hash = token.createToken({ id: user.id, username: user.username })

  return {
    statusCode: 200,
    body: {
      token: hash
    }
  }
}
import { APIGatewayEvent } from 'aws-lambda';
import { ErrorsEnum, HttpMethodEnum } from './utils';

export const getUser = async (event: APIGatewayEvent) => {

  if (event.httpMethod !== HttpMethodEnum.GET) {
    return {
      statusCode: 405,
      body: {
        message: ErrorsEnum.UNSUPPORTED_METHOD
      }
    }
  }


  const user = {
    id: 1,
    username: 'root',
    role: 'dev',
  }

  return {
    statusCode: 200,
    body: JSON.stringify(user)
  };

}
import type {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

export function createHelloResponse(name?: string): APIGatewayProxyResultV2 {
  const safeName = name?.trim() || "World";

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      message: `Hello, ${safeName}!`,
    }),
  };
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return createHelloResponse(event.queryStringParameters?.name);
};

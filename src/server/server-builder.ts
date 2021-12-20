import { RequestHandler, Route } from 'common/http-server';
import express from 'express';
import http, { Server } from 'http';

export type ServerBuider = Readonly<{
  setRoute: <RequestBody, ResponseBody>(route: Route<RequestBody, ResponseBody>) => ServerBuider;
  build: () => Server;
}>;

export default function serverBuilder(): ServerBuider {
  const app = express();

  app.use(express.json());

  const builder = {
    setRoute: <RequestBody, ResponseBody>(route: Route<RequestBody, ResponseBody>): ServerBuider => {
      app[route.method](route.path, adaptRequestHandler(route.handler));

      return builder;
    },
    build: (): Server => http.createServer(app),
  };

  return builder;
}

function adaptRequestHandler<RequestBody, ResponseBody>(
  handler: RequestHandler<RequestBody, ResponseBody>,
): express.RequestHandler {
  return async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { body, status } = await handler(req);

    return res.status(status).json(body);
  };
}

type Query = {
  readonly [key: string]: undefined | string | readonly string[] | Query | readonly Query[];
};

type Params = { readonly [key: string]: string };

export type Request<RequestBody> = Readonly<{
  params: Params;
  query: Query;
  body: RequestBody;
}>;

export type ResponseError = {
  message: string;
};

export type Status = 200 | 400 | 500;

export type Response<ResponseBody> = Readonly<{
  status: Status;
  body?: ResponseBody | ResponseError;
}>;

export type RequestHandler<RequestBody, ResponseBody> = (req?: Request<RequestBody>) => Promise<Response<ResponseBody>>;

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Route<RequestBody, ResponseBody> = Readonly<{
  method: Method;
  path: string;
  handler: RequestHandler<RequestBody, ResponseBody>;
}>;

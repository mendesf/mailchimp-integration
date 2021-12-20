export type DecodeError = Readonly<
  Error & {
    data: unknown;
  }
>;

export default function makeDecodingError(data: unknown): DecodeError {
  return {
    name: 'DecodingError',
    message: 'Failed to decode data',
    data,
  };
}

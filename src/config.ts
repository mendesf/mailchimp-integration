export type Config = Readonly<{
  serverPort: number;
  mockapiUrl: string;
  mailchimpApiKey: string;
  listName: string;
}>;

export default function makeConfig(): Config {
  return {
    serverPort: Number(process.env.PORT) || 3000,
    mockapiUrl: process.env.MOCKAPI_URL || '',
    mailchimpApiKey: process.env.MAILCHIMP_API_KEY || '',
    listName: process.env.LIST_NAME || '',
  };
}

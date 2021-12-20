import logger from 'common/logger';
import dotenv from 'dotenv';
import serverBuilder from 'server/server-builder';
import makeConfig from './config';
import { resolveSyncContactsRoute } from 'server/dependency-resolver';
import mailchimp from '@mailchimp/mailchimp_marketing';

dotenv.config();

const { mailchimpApiKey, listName, mockapiUrl, serverPort } = makeConfig();

mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpApiKey.split('-')[1],
});

mailchimp.ping.get().catch((error: Error) => {
  logger.error('Failed to ping Mailchimp', { error });
  process.exit(1);
});

serverBuilder()
  .setRoute(resolveSyncContactsRoute(listName, mockapiUrl))
  .build()
  .listen(serverPort, () => {
    logger.info(`Server is running at https://localhost:${serverPort}`);
  });

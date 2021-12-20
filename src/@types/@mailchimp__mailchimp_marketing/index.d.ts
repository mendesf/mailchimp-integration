declare module '@mailchimp/mailchimp_marketing' {
  export type Config = {
    apiKey: string;
    server: string;
  };

  export type CreateListBody = {
    name: string;
    contact: {
      company: string;
      address1: string;
      address2?: string;
      zip: string;
      city: string;
      state: string;
      country: string;
    };
    permission_reminder: string;
    campaign_defaults: {
      from_name: string;
      from_email: string;
      subject: string;
      language: string;
    };
    email_type_option: boolean;
  };

  export type Options = {
    fields: string[];
  };

  export type List = { id: string; name: string };

  export type GetAllListsResponse = {
    lists: List[];
  };

  export type MemberStatus = 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';

  export type Member = {
    email_address: string;
    status: MemberStatus;
    merge_fields: {
      FNAME: string;
      LNAME: string;
    };
  };

  export type BatchListMembersBody = {
    members: Member[];
  };

  export type MemberErrorCode = 'ERROR_CONTACT_EXISTS' | 'ERROR_GENERIC';

  export type MemberError = {
    email_address: string;
    error: string;
    error_code: MemberErrorCode;
  };

  export type BatchListMembersResponse = {
    new_members: Member[];
    updated_members: Member[];
    errors: MemberError[];
    total_created: number;
    total_updated: number;
    error_count: number;
  };

  export type Lists = {
    getAllLists(opts?: Options): Promise<GetAllListsResponse>;
    createList(body: CreateListBody): Promise<List>;
    deleteList(listId: string): Promise<void>;
    batchListMembers(listId: string, body: BatchListMembersBody): Promise<BatchListMembersResponse>;
  };

  export type PingResponse = {
    health_status: string;
  };

  export type Ping = {
    get(): Promise<PingResponse>;
  };

  export type Mailchimp = {
    setConfig: (config: Config) => void;
    ping: Ping;
    lists: Lists;
  };

  const mailchimp: Mailchimp;

  export default mailchimp;
}

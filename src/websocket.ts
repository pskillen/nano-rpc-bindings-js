export enum Topic {
  Confirmation = 'confirmation',
  Votes = 'votes',
  StoppedElections = 'stopped_election',
  ActiveDifficulty = 'active_difficulty',
  Work = 'work',
  Telemetry = 'telemetry',
  NewUnconfirmedBlock = 'new_unconfirmed_block',
  Bootstrap = 'bootstrap',
}

export enum Action {
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
  Update = 'update',
  Ping = 'ping',
}

export type RequestMessage = {
  action: string;
  topic?: string;
  ack?: boolean;
  options?: {};
}

export enum ActionResponse {
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
  Update = 'update',
  Pong = 'pong',
}

export type ResponseMessage = {
  time: string;
  ack?: string;
  id?: string;
}

export type ConfirmationMessage = ResponseMessage & {
  topic: string;
  message: {
    account: string,
    amount: string,
    hash: string,
    confirmation_type: string,
    block: {
      type: string,
      account: string,
      previous: string,
      representative: string,
      balance: string,
      link: string,
      link_as_account: string,
      signature: string,
      work: string,
      subtype: string
    }
  }
}

export type Coin = "nano" | "banano";

export type BlockSubtype = "send" | "receive" | "change" | "epoch";

export type BlockType = "state";

export type Block = {
  type: BlockType;
  account: string;
  previous: string;
  representative: string;
  balance: string;
  link: string;
  link_as_account: string;
  signature?: string;
  work?: string;
  subtype?: BlockSubtype;
}

export type ConfirmationType = "all" | "active" | "active_quorum" | "inactive";

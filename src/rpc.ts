import axios from "axios";

export enum WalletRpcAction {
  account_create = 'account_create',
  account_list = 'account_list',
  account_move = 'account_move',
  account_remove = 'account_remove',
  account_representative_set = 'account_representative_set',
  accounts_create = 'accounts_create',
  block_create = 'block_create',
  password_change = 'password_change',
  password_enter = 'password_enter',
  password_valid = 'password_valid',
  receive = 'receive',
  receive_minimum = 'receive_minimum',
  receive_minimum_set = 'receive_minimum_set',
  search_pending = 'search_pending',
  search_pending_all = 'search_pending_all',
  send = 'send',
  sign = 'sign',
  wallet_add = 'wallet_add',
  wallet_add_watch = 'wallet_add_watch',
  wallet_balances = 'wallet_balances',
  wallet_change_seed = 'wallet_change_seed',
  wallet_contains = 'wallet_contains',
  wallet_create = 'wallet_create',
  wallet_destroy = 'wallet_destroy',
  wallet_export = 'wallet_export',
  wallet_frontiers = 'wallet_frontiers',
  wallet_history = 'wallet_history',
  wallet_info = 'wallet_info',
  wallet_ledger = 'wallet_ledger',
  wallet_lock = 'wallet_lock',
  wallet_locked = 'wallet_locked',
  wallet_pending = 'wallet_pending',
  wallet_representative = 'wallet_representative',
  wallet_representative_set = 'wallet_representative_set',
  wallet_republish = 'wallet_republish',
  wallet_work_get = 'wallet_work_get',
  work_get = 'work_get',
  work_set = 'work_set',
}

export enum NodeRpcAction {
  account_balance = 'account_balance',
  account_block_count = 'account_block_count',
  account_get = 'account_get',
  account_history = 'account_history',
  account_info = 'account_info',
  account_key = 'account_key',
  account_representative = 'account_representative',
  account_weight = 'account_weight',
  accounts_balances = 'accounts_balances',
  accounts_frontiers = 'accounts_frontiers',
  accounts_pending = 'accounts_pending',
  active_difficulty = 'active_difficulty',
  available_supply = 'available_supply',
  block_account = 'block_account',
  block_confirm = 'block_confirm',
  block_count = 'block_count',
  block_create = 'block_create',
  block_hash = 'block_hash',
  block_info = 'block_info',
  blocks = 'blocks',
  blocks_info = 'blocks_info',
  bootstrap = 'bootstrap',
  bootstrap_any = 'bootstrap_any',
  bootstrap_lazy = 'bootstrap_lazy',
  bootstrap_status = 'bootstrap_status',
  chain = 'chain',
  confirmation_active = 'confirmation_active',
  confirmation_height_currently_processing = 'confirmation_height_currently_processing',
  confirmation_history = 'confirmation_history',
  confirmation_info = 'confirmation_info',
  confirmation_quorum = 'confirmation_quorum',
  database_txn_tracker = 'database_txn_tracker',
  delegators = 'delegators',
  delegators_count = 'delegators_count',
  deterministic_key = 'deterministic_key',
  epoch_upgrade = 'epoch_upgrade',
  frontier_count = 'frontier_count',
  frontiers = 'frontiers',
  keepalive = 'keepalive',
  key_create = 'key_create',
  key_expand = 'key_expand',
  ledger = 'ledger',
  node_id = 'node_id',
  node_id_delete = 'node_id_delete',
  peers = 'peers',
  pending = 'pending',
  pending_exists = 'pending_exists',
  process = 'process',
  representatives = 'representatives',
  representatives_online = 'representatives_online',
  republish = 'republish',
  sign = 'sign',
  stats = 'stats',
  stats_clear = 'stats_clear',
  stop = 'stop',
  successors = 'successors',
  telemetry = 'telemetry',
  validate_account_number = 'validate_account_number',
  version = 'version',
  unchecked = 'unchecked',
  unchecked_clear = 'unchecked_clear',
  unchecked_get = 'unchecked_get',
  unchecked_keys = 'unchecked_keys',
  unopened = 'unopened',
  uptime = 'uptime',
  work_cancel = 'work_cancel',
  work_generate = 'work_generate',
  work_peer_add = 'work_peer_add',
  work_peers = 'work_peers',
  work_peers_clear = 'work_peers_clear',
  work_validate = 'work_validate',
}

export type BlockSubtype = "send" | "receive" | "change" | "epoch";

export type RpcRequestData = {
  action: WalletRpcAction | NodeRpcAction;
  account?: string;
  wallet?: string;

  // any other fields
  [x: string]: any;
}

export type Block = {
  type: string;
  account: string;
  previous: string;
  representative: string;
  balance: string;
  link: string;
  link_as_account: string;
  signature: string;
  work: string;
}

export type RateLimitedResponse = {
  rateLimitReset?: string;
  requestsLimit?: string;
  requestsRemaining?: string;
}

export type RpcResponseData = {
  error?: string;

  // any other fields
  [x: string]: any;
} & RateLimitedResponse;

export type AccountBalanceResponse = RpcResponseData & {
  balance: string;
  pending: string;
};

export type WalletBalanceResponse = RpcResponseData & {
  balances: {
    [key: string]: {
      balance: string;
      pending: string;
    }
  }
};

export type AccountInfoResponse = RpcResponseData & {
  frontier: string;
  open_block: string;
  representative_block: string;
  balance: string;
  modified_timestamp: string;
  block_count: string;
  account_version: string;
  confirmation_height: string;
  representative?: string;
}

export type DifficultyResponse = RpcResponseData & {
  network_minimum: string;
  network_current: string;
  multiplier: string;
}

export type AccountRepresentativeResponse = RpcResponseData & {
  representative: string;
}

export type AccountHistoryResponse = RpcResponseData & {
  account: string;
  history: [{
    type: BlockSubtype,
    account: string,
    amount: string,
    local_timestamp: string,
    height: string,
    hash: string,
  }];
  previous: string;
}

export type SendFundsResponse = RpcResponseData & {}

export type ProcessBlockResponse = RpcResponseData & {
  hash: string;
}

export type WorkGenerateResponse = RpcResponseData & {
  work: string;
  difficulty: string;
  multiplier: string;
  hash: string;
}

export async function sendWalletRequest(action: RpcRequestData, walletUrl: string): Promise<RpcResponseData> {
  console.debug("Sending wallet action", action);
  const response = await axios.post(walletUrl, action);
  if (response.status != 200) throw new Error(`Unknown response code from server: ${response.status} ${response.statusText}`);
  if (response.data.error) throw new Error(response.data.error);
  return response.data as RpcResponseData;
}

export async function getWalletBalances(walletId: string, walletUrl: string): Promise<WalletBalanceResponse> {
  const payload = {
    action: WalletRpcAction.wallet_balances,
    wallet: walletId,
  }

  return sendWalletRequest(payload, walletUrl)
    .then(response => (response as WalletBalanceResponse));
}

export async function getAccountBalance(account: string, walletUrl: string): Promise<AccountBalanceResponse> {
  const request = {
    action: NodeRpcAction.account_balance,
    account
  }
  return sendWalletRequest(request, walletUrl)
    .then(response => (response as AccountBalanceResponse))
}

export async function getAccountInfo(account: string, walletUrl: string): Promise<AccountInfoResponse> {
  const request = {
    action: NodeRpcAction.account_info,
    account,
    representative: true
  }
  return sendWalletRequest(request, walletUrl)
    .then(response => (response as AccountInfoResponse))
}

export async function getAccountHistory(account: string, walletUrl: string): Promise<AccountHistoryResponse> {
  const request = {
    action: NodeRpcAction.account_history,
    account,
    count: 1
  }
  return sendWalletRequest(request, walletUrl)
    .then(response => (response as AccountHistoryResponse))
}

export async function getAccountRepresentative(account: string, walletUrl: string): Promise<AccountRepresentativeResponse> {
  const request = {
    action: NodeRpcAction.account_representative,
    account
  }
  return sendWalletRequest(request, walletUrl)
    .then(response => (response as AccountRepresentativeResponse))
}

export async function sendFunds(walletId: string, source: string, destination: string, amountRaw: string, walletUrl: string, txId: string): Promise<SendFundsResponse> {
  const request = {
    action: WalletRpcAction.send,
    wallet: walletId,
    source,
    destination,
    amount: amountRaw,
    id: txId,
  }
  return sendWalletRequest(request, walletUrl)
    .then(response => (response as SendFundsResponse))
}

export async function processBlock(subtype: BlockSubtype, block: Block, walletUrl: string): Promise<ProcessBlockResponse> {
  const request = {
    action: NodeRpcAction.process,
    json_block: true,
    subtype,
    block,
  }
  return sendWalletRequest(request, walletUrl)
    .then(response => (response as ProcessBlockResponse))
}

export async function getDifficulty(walletUrl: string): Promise<DifficultyResponse> {
  const request = {
    action: NodeRpcAction.active_difficulty,
  }
  return sendWalletRequest(request, walletUrl)
    .then(response => (response as DifficultyResponse))
}

export async function getWork(blockHash: string, walletUrl: string): Promise<WorkGenerateResponse> {
  const request = {
    action: NodeRpcAction.work_generate,
    hash: blockHash
  };
  return sendWalletRequest(request, walletUrl)
    .then(response => (response as WorkGenerateResponse))
}

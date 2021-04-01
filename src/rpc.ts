import axios from "axios";
import {
  AccountBalanceResponse,
  AccountHistoryResponse,
  AccountInfoResponse,
  AccountRepresentativeResponse,
  DifficultyResponse,
  NodeRpcAction,
  ProcessBlockResponse,
  RpcRequestData,
  RpcResponseData,
  SendFundsResponse,
  WalletBalanceResponse,
  WalletRpcAction,
  WorkGenerateResponse,
} from "./rpc.types";
import {Block, BlockSubtype} from "./nano.types";


export async function sendWalletRequest<T extends RpcResponseData>(action: RpcRequestData, walletUrl: string): Promise<T> {
  console.debug("Sending wallet action", action);
  const response = await axios.post<T>(walletUrl, action);
  if (response.status != 200) throw new Error(`Unknown response code from server: ${response.status} ${response.statusText}`);
  if (response.data.error) throw new Error(response.data.error);
  return response.data;
}

export async function getWalletBalances(walletId: string, walletUrl: string): Promise<WalletBalanceResponse> {
  const payload = {
    action: WalletRpcAction.wallet_balances,
    wallet: walletId,
  }
  return sendWalletRequest<WalletBalanceResponse>(payload, walletUrl);
}

export async function getAccountBalance(account: string, walletUrl: string): Promise<AccountBalanceResponse> {
  const request = {
    action: NodeRpcAction.account_balance,
    account
  }
  return sendWalletRequest<AccountBalanceResponse>(request, walletUrl);
}

export async function getAccountInfo(account: string, walletUrl: string): Promise<AccountInfoResponse> {
  const request = {
    action: NodeRpcAction.account_info,
    account,
    representative: true
  }
  return sendWalletRequest<AccountInfoResponse>(request, walletUrl);
}

export async function getAccountHistory(account: string, walletUrl: string): Promise<AccountHistoryResponse> {
  const request = {
    action: NodeRpcAction.account_history,
    account,
    count: 1
  }
  return sendWalletRequest<AccountHistoryResponse>(request, walletUrl);
}

export async function getAccountRepresentative(account: string, walletUrl: string): Promise<AccountRepresentativeResponse> {
  const request = {
    action: NodeRpcAction.account_representative,
    account
  }
  return sendWalletRequest<AccountRepresentativeResponse>(request, walletUrl);
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
  return sendWalletRequest<SendFundsResponse>(request, walletUrl);
}

export async function processBlock(subtype: BlockSubtype, block: Block, walletUrl: string): Promise<ProcessBlockResponse> {
  const request = {
    action: NodeRpcAction.process,
    json_block: true,
    subtype,
    block,
  }
  return sendWalletRequest<ProcessBlockResponse>(request, walletUrl);
}

export async function getDifficulty(walletUrl: string): Promise<DifficultyResponse> {
  const request = {
    action: NodeRpcAction.active_difficulty,
  }
  return sendWalletRequest<DifficultyResponse>(request, walletUrl);
}

export async function getWork(blockHash: string, walletUrl: string): Promise<WorkGenerateResponse> {
  const request = {
    action: NodeRpcAction.work_generate,
    hash: blockHash
  };
  return sendWalletRequest<WorkGenerateResponse>(request, walletUrl);
}

import { ChainIds } from '../../constants/chains';

export type Token = {
  chain: string;
  chain_id: ChainIds;
  address: string;
  amount: string;
  symbol?: string;
  decimals?: number;
  price_usd?: number;
  value_usd?: number;
};

export type BalanceData = {
  request_time: string;
  response_time: string;
  wallet_address: string;
  next_offset?: string | null;
  balances: Token[];
  errors?: {
    token_errors?: {
      address: string;
      chain_id: number;
      description?: string;
    }[];
  };
};

export type FetchError = Error & {
  status?: number;
  info?: unknown;
};

export type ResponseData = {
  data?: BalanceData;
  error?: FetchError;
  isLoading: boolean;
};

export type TokensParams = {
  /** Specify this to get native balances for a long tail of EVM chains, where we don't support ERC20 assets */
  allChains?: boolean;
  /** Comma separated list of chain ids to get balances for */
  chainIds?: string;
  /** Specify this to exclude spam tokens from the response */
  excludeSpamTokens?: boolean;
  /** Specify `erc20` or `native` to get only ERC20 tokens or native assets, respectively */
  filters?: 'erc20' | 'native';
  /** Maximum number of transactions to return */
  limit?: number;
  /** The offset to paginate through result sets. This is a cursor being passed from the previous response, only use what the backend returns here. */
  offset?: string;
  /** A comma separated list of additional metadata fields to include for each token. Supported values: logo, url */
  metadata?: string | null;
};

export type TransactionsParams = {
  /** The offset to paginate through result sets. This is a cursor being passed from the previous response, only use what the backend has returned on previous responses. */
  offset?: string | null;

  /** Maximum number of transactions to return */
  limit?: number | null;

  /** Return only transactions before this block time */
  block_time?: number | null;

  /** Comma separated list of chain ids to get transactions for */
  chainIds?: string | null;

  /** Filter transactions to a given address */
  to?: string | null;

  /** Return only transactions with this method id */
  method_id?: string | null;

  /** Return abi decoded transactions and logs */
  decode?: boolean | null;

  /** Return only transactions with this address in logs */
  log_address?: string | null;

  /** Return only transactions with this topic0 */
  topic0?: string | null;

  /** Return only transactions with this block number */
  min_block_number?: number | null;
};

export type UseTokensConfig = {
  queryOptions?: {
    refetchOnWindowFocus?: boolean;
    staleTime?: number;
    refetchInterval?: number;
  };
};

export type Transaction = {
  address: string;
  block_hash: string;
  block_number: string;
  block_time: string;
  block_version: number;
  chain: string;
  from: string;
  to: string;
  data: string;
  gas_price: string;
  hash: string;
  index: string;
  max_fee_per_gas: string;
  max_priority_fee_per_gas: string;
  nonce: string;
  transaction_type: string;
  value: string;
};

export type TransactionData = {
  transactions: Transaction[];
  next_offset?: string | null;
};

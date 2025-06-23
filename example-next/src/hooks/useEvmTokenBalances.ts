import * as React from 'react';
import { CHAINS } from '../constants/chains';
import {
  useGetApiKey,
  useGetProxyUrl,
} from '@/components/dune-provider';
import { useDeepMemo } from '@/hooks/useDeepMemo';
import { fetchEvmBalances } from '@/lib/dune-api';
import { BalanceData, FetchError, TokensParams } from '../lib/types/api';
import { isAddress } from 'viem';

type QueryState = {
  data: BalanceData | null;
  error: FetchError | null;
  isLoading: boolean;
  nextOffset: string | null; // track next_offset
  offsets: string[]; // store offsets for each page
  currentPage: number; // track the current page
};

export const useEvmTokenBalances = (
  walletAddress: string,
  params: TokensParams = {}
) => {
  const [state, setState] = React.useState<QueryState>({
    data: null,
    error: null,
    isLoading: false,
    nextOffset: null, // next offset from the API
    offsets: [], // list of offsets corresponding to pages
    currentPage: 0, // start at the first page
  });

  const memoizedParams = useDeepMemo(() => params, params);
  const apiKey = useGetApiKey();
  const proxyUrl = useGetProxyUrl();

  // function to fetch data for a specific page
  const fetchDataAsync = async (offset: string | null) => {
    if (!apiKey && !proxyUrl) {
      setState({
        data: null,
        error: new Error('One of duneApiKey or proxyUrl must be provided'),
        isLoading: false,
        nextOffset: null,
        offsets: [],
        currentPage: 0,
      });
      return;
    }

    if (!walletAddress || !isAddress(walletAddress)) return;

    setState((prevState) => ({ ...prevState, isLoading: true }));

    try {
      // convert offset to number or undefined
      const updatedParams = {
        ...memoizedParams,
        offset: offset ?? undefined,
      };

      const result: BalanceData = await fetchEvmBalances(
        walletAddress,
        updatedParams,
        apiKey,
        proxyUrl
      );

      for (const token of result.balances) {
        if (token.chain === 'avalanche_c') {
          token.chain = CHAINS[token.chain_id];
        }
        if (token.chain === 'zkevm') {
          token.chain = CHAINS[token.chain_id];
        }
      }

      setState((prevState) => ({
        ...prevState,
        data: result,
        error: null,
        isLoading: false,
        nextOffset: result.next_offset || null,
        offsets: offset ? [...prevState.offsets, offset] : prevState.offsets,
      }));
    } catch (err) {
      setState({
        data: null,
        error: err as FetchError,
        isLoading: false,
        nextOffset: null,
        offsets: [],
        currentPage: 0,
      });
    }
  };

  // refetch when walletAddress or params change
  React.useEffect(() => {
    // fetch the first page on initial load or when walletAddress changes
    fetchDataAsync(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, memoizedParams, apiKey]);

  // function to go to the next page
  const nextPage = () => {
    if (state.nextOffset) {
      fetchDataAsync(state.nextOffset); // fetch using the next offset
      setState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1, // update page number
      }));
    }
  };

  // function to go to the previous page
  const previousPage = () => {
    if (state.currentPage > 0) {
      // use the offset corresponding to the previous page
      const previousOffset = state.offsets[state.currentPage - 1];
      fetchDataAsync(previousOffset);
      setState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  return {
    ...state,
    nextPage,
    previousPage,
  };
};

/** @deprecated */
export const useTokenBalances = useEvmTokenBalances;

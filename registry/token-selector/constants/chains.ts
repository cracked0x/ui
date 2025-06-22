export const CHAIN_IDS = {
  // evm
  ethereum: '1',
  polygon: '137',
  arbitrum: '42161',
  optimism: '10',
  zksync: '324',
  avalanche: '43114',
  binance: '56',
  polygon_zkevm: '1101',
  manta: '169',
  scroll: '534352',
  mantle: '5000',
  base: '8453',
  linea: '59144',
} as const;

export type Chains = keyof typeof CHAIN_IDS;
export type ChainIds = (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS];

export const CHAINS = Object.keys(CHAIN_IDS).reduce((acc, curr) => {
  acc[CHAIN_IDS[curr as keyof typeof CHAIN_IDS]] =
    curr as keyof typeof CHAIN_IDS;
  return acc;
}, {} as Record<ChainIds, keyof typeof CHAIN_IDS>);

export const MAINNET_SUPPORTED_CHAINS: Record<string, ChainIds> = {
  ethereum: CHAIN_IDS.ethereum,
  polygon: CHAIN_IDS.polygon,
  arbitrum: CHAIN_IDS.arbitrum,
  optimism: CHAIN_IDS.optimism,
  zksync: CHAIN_IDS.zksync,
  avalanche: CHAIN_IDS.avalanche,
  binance: CHAIN_IDS.binance,
  polygon_zkevm: CHAIN_IDS.polygon_zkevm,
  manta: CHAIN_IDS.manta,
  scroll: CHAIN_IDS.scroll,
  mantle: CHAIN_IDS.mantle,
  base: CHAIN_IDS.base,
  linea: CHAIN_IDS.linea,
};

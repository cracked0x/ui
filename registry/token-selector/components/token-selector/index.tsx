'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ChainTokenLogo } from '@/registry/token-selector/components/token-selector/chain-token-logo';
import { ChainIds } from '@/registry/token-selector/constants/chains';
import { useEvmTokenBalances } from '@/registry/token-selector/hooks/useEvmTokenBalances';
import { useMediaQuery } from '@/registry/token-selector/hooks/useMediaQuery';
import { Token } from '@/registry/token-selector/lib/types/api';
import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { TokenSelection } from '@/registry/token-selector/components/token-selector/token-selection';

export interface TokenSelectorProps {
  token?: Token;
  defaultToken?: Token;
  onTokenChange: React.Dispatch<React.SetStateAction<Token | undefined>>;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  form?: string;
  wallet: string;
  chainId?: ChainIds[];
  excludeSpamTokens?: boolean;
  excludeTokens?: string[];
  className?: string;
}

export default function TokenSelector(props: TokenSelectorProps) {
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const [open, setOpen] = React.useState<boolean>(false);

  const { data, isLoading: isBalancesLoading } = useEvmTokenBalances(
    props.wallet,
    {
      excludeSpamTokens: props.excludeSpamTokens,
      chainIds: props.chainId ? props.chainId[0] : undefined,
    }
  );
  const balances = data?.balances;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-xs"
          >
            <div className="inline-flex items-center gap-2">
              {props.token?.address && <ChainTokenLogo token={props.token} />}
              {props.token ? props.token.symbol : 'Select token...'}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-sm">Select a token</DialogTitle>
          </DialogHeader>

          <TokenSelection
            isBalancesLoading={isBalancesLoading}
            balances={balances}
            selectedToken={props.token}
            onSelectedTokenChange={props.onTokenChange}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-xs"
        >
          <div className="inline-flex items-center gap-2">
            {props.token?.address && <ChainTokenLogo token={props.token} />}
            {props.token ? props.token.symbol : 'Select token...'}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-sm">Select a token</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <TokenSelection
            isBalancesLoading={isBalancesLoading}
            balances={balances}
            selectedToken={props.token}
            onSelectedTokenChange={props.onTokenChange}
            setOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}


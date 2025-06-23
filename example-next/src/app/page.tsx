'use client';

import { AddressQR } from '@/components/addressqr';
import { DuneProvider } from '@/components/dune-provider';
import TokenSelector from '@/components/token-selector';
import { Token } from '@/lib/types/api';
import * as React from 'react';

export default function Home() {
  const [token, setToken] = React.useState<Token>();

  return (
    <div className="max-w-xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8 font-sans">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          cracked0x ui example
        </h1>
        <p className="text-muted-foreground">
          a custom registry for distributing components for your web3 dapps.
        </p>
      </header>

      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A evm-based multichain token selector.
            </h2>
            {/* <OpenInV0Button name="example-form" className="w-fit" /> */}
          </div>
          <div className="flex items-center justify-center min-h-[250px] relative">
            <DuneProvider
              duneApiKey={process.env.NEXT_PUBLIC_DUNE_API_KEY ?? ''}
            >
              <TokenSelector
                token={token}
                onTokenChange={setToken}
                wallet="0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
                excludeSpamTokens
              />
            </DuneProvider>
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A address QR code.
            </h2>
            {/* <OpenInV0Button name="example-form" className="w-fit" /> */}
          </div>
          <div className="flex items-center justify-center min-h-[250px] relative">
            <AddressQR />
          </div>
        </div>
      </main>
    </div>
  );
}

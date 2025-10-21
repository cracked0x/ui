import { Token } from "@/registry/token-selector/lib/types/api";
import { formatNumber, formatTokenAmount, tokenKey } from "@/registry/token-selector/lib/utils/format";
import { CommandItem } from "@/components/ui/command";
import { ChainTokenLogo } from "@/registry/token-selector/components/token-selector/chain-token-logo";
import { cn } from "@/lib/utils";

function TokenListItem({
  itemKey,
  selectedToken,
  setSelectedToken,
  token,
  setOpen,
}: {
  itemKey: string;
  selectedToken: Token | undefined;
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | undefined>>;
  token: Token;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const isSelected = selectedToken && tokenKey(selectedToken) === itemKey;
  return (
    <CommandItem
      value={itemKey}
      onSelect={() => {
        setSelectedToken(token);
        setOpen(false);
      }}
      className={cn(
        'flex gap-2 cursor-pointer text-xs border',
        isSelected ? 'border-border bg-secondary' : 'border-transparent'
      )}
    >
      <ChainTokenLogo token={token} />
      {token.symbol}
      <div className="ml-auto flex items-center gap-1 font-mono">
        <span>
          {formatTokenAmount(BigInt(token.amount), token.decimals ?? 18)}
        </span>
        <span className="max-w-[5rem] inline-flex items-center">
          (<p className="truncate">${formatNumber(token.value_usd ?? '-')}</p>)
        </span>
      </div>
    </CommandItem>
  );
}

export {TokenListItem}
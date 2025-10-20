import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "@/components/ui/command";
import { Token } from "@/registry/token-selector/lib/types/api";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenListItem } from "@/registry/token-selector/components/token-selector/token-list-item";
import { tokenKey } from "@/registry/token-selector/lib/utils/format";

function TokenSelection({
  isBalancesLoading,
  balances,
  selectedToken,
  onSelectedTokenChange,
  setOpen,
}: {
  isBalancesLoading: boolean;
  balances: Array<Token> | undefined;
  selectedToken: Token | undefined;
  onSelectedTokenChange: React.Dispatch<
    React.SetStateAction<Token | undefined>
  >;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Command
      defaultValue="-" // to avoid default selected item
      className="min-h-[340px] max-h-[45svh] bg-transparent border"
    >
      <CommandInput placeholder="Search token..." className="text-xs" />
      <CommandList>
        {!isBalancesLoading && (
          <CommandEmpty className="text-xs text-center py-3">
            No token found.
          </CommandEmpty>
        )}

        {isBalancesLoading ? (
          <div className="p-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <Skeleton className="h-6 min-w-6 rounded-full" />
                <div className="w-full flex items-center justify-between">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CommandGroup>
            {balances?.map((token) => {
              const key = tokenKey(token);
              return (
                <TokenListItem
                  key={key}
                  itemKey={key}
                  token={token}
                  selectedToken={selectedToken}
                  setSelectedToken={onSelectedTokenChange}
                  setOpen={setOpen}
                />
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

export {TokenSelection}
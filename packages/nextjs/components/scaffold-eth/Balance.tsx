"use client";

import { Address, formatEther } from "viem";
import { Button } from "~~/components/ui/button";
import { Skeleton } from "~~/components/ui/skeleton";
import { useDisplayUsdMode } from "~~/hooks/scaffold-eth/useDisplayUsdMode";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";
import { cn } from "~~/lib/utils";
import { useGlobalState } from "~~/services/store/store";

type BalanceProps = {
  address?: Address;
  className?: string;
  usdMode?: boolean;
};

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export const Balance = ({ address, className = "", usdMode }: BalanceProps) => {
  const { targetNetwork } = useTargetNetwork();
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const isNativeCurrencyPriceFetching = useGlobalState(state => state.nativeCurrency.isFetching);

  const {
    data: balance,
    isError,
    isLoading,
  } = useWatchBalance({
    address,
  });

  const { displayUsdMode, toggleDisplayUsdMode } = useDisplayUsdMode({ defaultUsdMode: usdMode });

  if (!address || isLoading || balance === null || (isNativeCurrencyPriceFetching && nativeCurrencyPrice === 0)) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-destructive/20 bg-destructive/10">
        <span className="text-sm text-destructive font-medium">Error</span>
      </div>
    );
  }

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("flex flex-col items-center justify-center hover:bg-accent transition-colors", className)}
      onClick={toggleDisplayUsdMode}
      type="button"
    >
      <div className="flex items-center justify-center gap-1">
        {displayUsdMode ? (
          <>
            <span className="text-sm font-bold">$</span>
            <span className="text-sm font-medium">{(formattedBalance * nativeCurrencyPrice).toFixed(2)}</span>
          </>
        ) : (
          <>
            <span className="text-sm font-medium">{formattedBalance.toFixed(4)}</span>
            <span className="text-sm font-bold">{targetNetwork.nativeCurrency.symbol}</span>
          </>
        )}
      </div>
    </Button>
  );
};

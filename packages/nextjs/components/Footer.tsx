import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom">
        {/* Top section with actions */}
        <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {nativeCurrencyPrice > 0 && (
              <Button variant="outline" size="sm" className="gap-2">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span className="font-medium">{nativeCurrencyPrice.toFixed(2)}</span>
              </Button>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link href="/blockexplorer">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <span>Block Explorer</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
          <SwitchTheme />
        </div>

        {/* Bottom section with links */}
        <div className="border-t py-6">
          <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground md:flex-row md:justify-center md:gap-6">
            <Link
              href="https://github.com/scaffold-eth/se-2"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline transition-colors"
            >
              Fork me
            </Link>
            <span className="hidden md:inline">·</span>
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span>at</span>
              <Link
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-primary hover:underline transition-colors"
              >
                <BuidlGuidlLogo className="h-4 w-5" />
                <span>BuidlGuidl</span>
              </Link>
            </div>
            <span className="hidden md:inline">·</span>
            <Link
              href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

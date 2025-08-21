"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAddress, isHex } from "viem";
import { hardhat } from "viem/chains";
import { usePublicClient } from "wagmi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui/button";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const client = usePublicClient({ chainId: hardhat.id });

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchInput.trim()) return;

    setIsLoading(true);

    try {
      if (isHex(searchInput)) {
        const tx = await client?.getTransaction({ hash: searchInput });
        if (tx) {
          router.push(`/blockexplorer/transaction/${searchInput}`);
          return;
        }
      }

      if (isAddress(searchInput)) {
        router.push(`/blockexplorer/address/${searchInput}`);
        return;
      }
    } catch (error) {
      console.error("Failed to fetch transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            className="w-full pl-10 pr-4 py-3 border border-input bg-background text-foreground placeholder:text-muted-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            type="text"
            value={searchInput}
            placeholder="Search by transaction hash or address..."
            onChange={e => setSearchInput(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading || !searchInput.trim()} className="w-full">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Searching...</span>
            </div>
          ) : (
            "Search"
          )}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Enter a transaction hash or Ethereum address to search
      </p>
    </div>
  );
};

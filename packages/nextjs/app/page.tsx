"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { Card, CardContent } from "~~/components/ui/card";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">
              <span className="block text-2xl font-normal text-muted-foreground mb-2">Welcome to</span>
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Scaffold-ETH 2
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The ultimate development stack for building decentralized applications on Ethereum
            </p>

            {/* Connected Address Section */}
            {connectedAddress && (
              <div className="mb-12 p-6 bg-card rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Connected Address</h3>
                <div className="flex justify-center">
                  <Address address={connectedAddress} />
                </div>
              </div>
            )}

            {/* Getting Started Section */}
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Get Started</h3>
                <p className="text-muted-foreground mb-3">
                  Edit your frontend at{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    packages/nextjs/app/page.tsx
                  </code>
                </p>
                <p className="text-muted-foreground">
                  Edit your smart contract{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    YourContract.sol
                  </code>{" "}
                  in{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    packages/hardhat/contracts
                  </code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30">
        <div className="container-custom section-padding">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center mb-12">Development Tools</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              <Card className="card-hover">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <BugAntIcon className="h-12 w-12 text-primary mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Debug Contracts</h3>
                  <p className="text-muted-foreground mb-6">
                    Tinker with your smart contracts using the interactive debug interface
                  </p>
                  <Link
                    href="/debug"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Open Debug Panel
                  </Link>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <MagnifyingGlassIcon className="h-12 w-12 text-primary mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Block Explorer</h3>
                  <p className="text-muted-foreground mb-6">
                    Explore your local transactions and blockchain data in real-time
                  </p>
                  <Link
                    href="/blockexplorer"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    View Explorer
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { DebugContracts } from "./_components/DebugContracts";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Debug Contracts",
  description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const Debug: NextPage = () => {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4">Debug Contracts</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interact with and debug your deployed smart contracts in real-time
            </p>
          </div>
          <DebugContracts />
        </div>
      </div>
    </div>
  );
};

export default Debug;

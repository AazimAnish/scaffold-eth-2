"use client";

import { useEffect, useMemo } from "react";
import { useSessionStorage } from "usehooks-ts";
import { BarsArrowUpIcon } from "@heroicons/react/20/solid";
import { ContractUI } from "~~/app/debug/_components/contract";
import { Button } from "~~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/ui/tooltip";
import { ContractName, GenericContract } from "~~/utils/scaffold-eth/contract";
import { useAllContracts } from "~~/utils/scaffold-eth/contractsData";

const selectedContractStorageKey = "scaffoldEth2.selectedContract";

export function DebugContracts() {
  const contractsData = useAllContracts();
  const contractNames = useMemo(
    () =>
      Object.keys(contractsData).sort((a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
      }) as ContractName[],
    [contractsData],
  );

  const [selectedContract, setSelectedContract] = useSessionStorage<ContractName>(
    selectedContractStorageKey,
    contractNames[0],
    { initializeWithValue: false },
  );

  useEffect(() => {
    if (!contractNames.includes(selectedContract)) {
      setSelectedContract(contractNames[0]);
    }
  }, [contractNames, selectedContract, setSelectedContract]);

  if (contractNames.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">No contracts found!</h3>
          <p className="text-muted-foreground">Deploy a contract to start debugging and interacting with it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Contract Selection */}
      {contractNames.length > 1 && (
        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            {contractNames.map(contractName => (
              <Button
                key={contractName}
                variant={contractName === selectedContract ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedContract(contractName)}
                className="font-medium"
              >
                {contractName}
                {(contractsData[contractName] as GenericContract)?.external && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <BarsArrowUpIcon className="h-4 w-4 ml-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>External contract</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </Button>
            ))}
          </div>
        </TooltipProvider>
      )}

      {/* Contract UI */}
      <div className="space-y-6">
        {contractNames.map(contractName => (
          <div key={contractName} className={contractName === selectedContract ? "block" : "hidden"}>
            <ContractUI contractName={contractName} />
          </div>
        ))}
      </div>
    </div>
  );
}

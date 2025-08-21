"use client";

// @refresh reset
import { useReducer } from "react";
import { ContractReadMethods } from "./ContractReadMethods";
import { ContractVariables } from "./ContractVariables";
import { ContractWriteMethods } from "./ContractWriteMethods";
import { Address, Balance } from "~~/components/scaffold-eth";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";
import { useDeployedContractInfo, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { cn } from "~~/lib/utils";
import { ContractName } from "~~/utils/scaffold-eth/contract";

type ContractUIProps = {
  contractName: ContractName;
  className?: string;
};

/**
 * UI component to interface with deployed contracts.
 **/
export const ContractUI = ({ contractName, className = "" }: ContractUIProps) => {
  const [refreshDisplayVariables, triggerRefreshDisplayVariables] = useReducer(value => !value, false);
  const { targetNetwork } = useTargetNetwork();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo({ contractName });
  const networkColor = useNetworkColor();

  if (deployedContractLoading) {
    return (
      <div className="mt-14 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!deployedContractData) {
    return (
      <p className="text-3xl mt-14">
        {`No contract found by the name of "${contractName}" on chain "${targetNetwork.name}"!`}
      </p>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-6 px-6 lg:px-10 lg:gap-12 w-full max-w-7xl my-0", className)}>
      <div className="col-span-5 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div className="col-span-1 flex flex-col">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{contractName}</CardTitle>
              <Address address={deployedContractData.address} onlyEnsOrAddress />
              <div className="flex gap-1 items-center">
                <span className="font-bold text-sm">Balance:</span>
                <Balance address={deployedContractData.address} className="px-0 h-1.5 min-h-[0.375rem]" />
              </div>
              {targetNetwork && (
                <p className="my-0 text-sm">
                  <span className="font-bold">Network</span>:{" "}
                  <span style={{ color: networkColor }}>{targetNetwork.name}</span>
                </p>
              )}
            </CardHeader>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <ContractVariables
                refreshDisplayVariables={refreshDisplayVariables}
                deployedContractData={deployedContractData}
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <Card className="relative">
            <div className="absolute -top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium">
              Read
            </div>
            <CardContent className="pt-8">
              <ContractReadMethods deployedContractData={deployedContractData} />
            </CardContent>
          </Card>
          <Card className="relative">
            <div className="absolute -top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium">
              Write
            </div>
            <CardContent className="pt-8">
              <ContractWriteMethods
                deployedContractData={deployedContractData}
                onChange={triggerRefreshDisplayVariables}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

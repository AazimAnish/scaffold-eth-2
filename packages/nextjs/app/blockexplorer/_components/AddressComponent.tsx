import { BackButton } from "./BackButton";
import { ContractTabs } from "./ContractTabs";
import { Address as AddressType } from "viem";
import { Address, Balance } from "~~/components/scaffold-eth";
import { Card, CardContent } from "~~/components/ui/card";

export const AddressComponent = ({
  address,
  contractData,
}: {
  address: AddressType;
  contractData: { bytecode: string; assembly: string } | null;
}) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-start">
        <BackButton />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Address address={address} format="long" onlyEnsOrAddress />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Balance:</span>
              <Balance address={address} />
            </div>
          </div>
        </CardContent>
      </Card>

      <ContractTabs address={address} contractData={contractData} />
    </div>
  );
};

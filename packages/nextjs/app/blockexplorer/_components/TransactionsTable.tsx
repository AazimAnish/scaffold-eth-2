import { TransactionHash } from "./TransactionHash";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { Badge } from "~~/components/ui/badge";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { TransactionWithFunction } from "~~/utils/scaffold-eth";
import { TransactionsTableProps } from "~~/utils/scaffold-eth/";

export const TransactionsTable = ({ blocks, transactionReceipts }: TransactionsTableProps) => {
  const { targetNetwork } = useTargetNetwork();

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="w-32 px-4 py-3 text-left text-sm font-medium">Transaction Hash</th>
              <th className="w-40 px-4 py-3 text-left text-sm font-medium">Function Called</th>
              <th className="w-24 px-4 py-3 text-left text-sm font-medium">Block Number</th>
              <th className="w-32 px-4 py-3 text-left text-sm font-medium">Time Mined</th>
              <th className="w-32 px-4 py-3 text-left text-sm font-medium">From</th>
              <th className="w-40 px-4 py-3 text-left text-sm font-medium">To</th>
              <th className="w-24 px-4 py-3 text-right text-sm font-medium">
                Value ({targetNetwork.nativeCurrency.symbol})
              </th>
            </tr>
          </thead>
          <tbody>
            {blocks.map(block =>
              (block.transactions as TransactionWithFunction[]).map(tx => {
                const receipt = transactionReceipts[tx.hash];
                const timeMined = new Date(Number(block.timestamp) * 1000).toLocaleString();
                const functionCalled = tx.input.substring(0, 10);

                return (
                  <tr key={tx.hash} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm">
                      <TransactionHash hash={tx.hash} />
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-col gap-1">
                        {tx.functionName === "0x" ? "" : <span className="truncate text-xs">{tx.functionName}</span>}
                        {functionCalled !== "0x" && (
                          <Badge variant="secondary" className="text-xs w-fit">
                            {functionCalled}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{block.number?.toString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-xs">{timeMined}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Address address={tx.from} size="sm" onlyEnsOrAddress />
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {!receipt?.contractAddress ? (
                        tx.to && <Address address={tx.to} size="sm" onlyEnsOrAddress />
                      ) : (
                        <div className="flex flex-col gap-1">
                          <Address address={receipt.contractAddress} size="sm" onlyEnsOrAddress />
                          <span className="text-xs text-muted-foreground">(Contract Creation)</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <span className="text-xs">
                        {formatEther(tx.value)} {targetNetwork.nativeCurrency.symbol}
                      </span>
                    </td>
                  </tr>
                );
              }),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

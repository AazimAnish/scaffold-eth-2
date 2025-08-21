"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Hash, Transaction, TransactionReceipt, formatEther, formatUnits } from "viem";
import { hardhat } from "viem/chains";
import { usePublicClient } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "~~/components/ui/table";
import { Textarea } from "~~/components/ui/textarea";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { decodeTransactionData, getFunctionDetails } from "~~/utils/scaffold-eth";
import { replacer } from "~~/utils/scaffold-eth/common";

const TransactionComp = ({ txHash }: { txHash: Hash }) => {
  const client = usePublicClient({ chainId: hardhat.id });
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction>();
  const [receipt, setReceipt] = useState<TransactionReceipt>();
  const [functionCalled, setFunctionCalled] = useState<string>();

  const { targetNetwork } = useTargetNetwork();

  useEffect(() => {
    if (txHash && client) {
      const fetchTransaction = async () => {
        const tx = await client.getTransaction({ hash: txHash });
        const receipt = await client.getTransactionReceipt({ hash: txHash });

        const transactionWithDecodedData = decodeTransactionData(tx);
        setTransaction(transactionWithDecodedData);
        setReceipt(receipt);

        const functionCalled = transactionWithDecodedData.input.substring(0, 10);
        setFunctionCalled(functionCalled);
      };

      fetchTransaction();
    }
  }, [client, txHash]);

  return (
    <div className="container mx-auto mt-10 mb-20 px-10 md:px-0">
      <Button variant="default" size="sm" onClick={() => router.back()}>
        Back
      </Button>
      {transaction ? (
        <div className="overflow-x-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-primary-content">Transaction Details</h2>{" "}
          <Table className="rounded-lg bg-base-100 w-full shadow-lg">
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Transaction Hash:</strong>
                </TableCell>
                <TableCell>{transaction.hash}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Block Number:</strong>
                </TableCell>
                <TableCell>{Number(transaction.blockNumber)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>From:</strong>
                </TableCell>
                <TableCell>
                  <Address address={transaction.from} format="long" onlyEnsOrAddress />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>To:</strong>
                </TableCell>
                <TableCell>
                  {!receipt?.contractAddress ? (
                    transaction.to && <Address address={transaction.to} format="long" onlyEnsOrAddress />
                  ) : (
                    <span>
                      Contract Creation:
                      <Address address={receipt.contractAddress} format="long" onlyEnsOrAddress />
                    </span>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Value:</strong>
                </TableCell>
                <TableCell>
                  {formatEther(transaction.value)} {targetNetwork.nativeCurrency.symbol}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Function called:</strong>
                </TableCell>
                <TableCell>
                  <div className="w-full md:max-w-[600px] lg:max-w-[800px] overflow-x-auto whitespace-nowrap">
                    {functionCalled === "0x" ? (
                      "This transaction did not call any function."
                    ) : (
                      <>
                        <span className="mr-2">{getFunctionDetails(transaction)}</span>
                        <Badge variant="default" className="font-bold">
                          {functionCalled}
                        </Badge>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Gas Price:</strong>
                </TableCell>
                <TableCell>{formatUnits(transaction.gasPrice || 0n, 9)} Gwei</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Data:</strong>
                </TableCell>
                <TableCell>
                  <Textarea readOnly value={transaction.input} className="w-full h-[150px] bg-inherit" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Logs:</strong>
                </TableCell>
                <TableCell>
                  <ul>
                    {receipt?.logs?.map((log, i) => (
                      <li key={i}>
                        <strong>Log {i} topics:</strong> {JSON.stringify(log.topics, replacer, 2)}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-2xl text-base-content">Loading...</p>
      )}
    </div>
  );
};

export default TransactionComp;

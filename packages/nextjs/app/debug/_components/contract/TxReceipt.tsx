import { useState } from "react";
import { TransactionReceipt } from "viem";
import { CheckCircleIcon, ChevronDownIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { ObjectFieldDisplay } from "~~/app/debug/_components/contract";
import { useCopyToClipboard } from "~~/hooks/scaffold-eth/useCopyToClipboard";
import { replacer } from "~~/utils/scaffold-eth/common";

export const TxReceipt = ({ txResult }: { txResult: TransactionReceipt }) => {
  const { copyToClipboard: copyTxResultToClipboard, isCopiedToClipboard: isTxResultCopiedToClipboard } =
    useCopyToClipboard();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex text-sm rounded-3xl peer-checked:rounded-b-none min-h-0 bg-secondary py-0">
      <div className="mt-1 pl-2">
        {isTxResultCopiedToClipboard ? (
          <CheckCircleIcon
            className="ml-1.5 text-xl font-normal text-base-content h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
        ) : (
          <DocumentDuplicateIcon
            className="ml-1.5 text-xl font-normal h-5 w-5 cursor-pointer"
            aria-hidden="true"
            onClick={() => copyTxResultToClipboard(JSON.stringify(txResult, replacer, 2))}
          />
        )}
      </div>
      <div className="flex-1">
        <button
          type="button"
          className="flex items-center justify-between w-full text-sm min-h-0 py-1.5 pl-1 hover:bg-secondary/80 transition-colors rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <strong>Transaction Receipt</strong>
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="overflow-auto bg-secondary rounded-t-none rounded-3xl pl-0">
            <pre className="text-xs">
              {Object.entries(txResult).map(([k, v]) => (
                <ObjectFieldDisplay name={k} value={v} size="xs" leftPad={false} key={k} />
              ))}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

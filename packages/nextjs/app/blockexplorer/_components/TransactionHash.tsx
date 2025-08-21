import Link from "next/link";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useCopyToClipboard } from "~~/hooks/scaffold-eth/useCopyToClipboard";

export const TransactionHash = ({ hash }: { hash: string }) => {
  const { copyToClipboard: copyAddressToClipboard, isCopiedToClipboard: isAddressCopiedToClipboard } =
    useCopyToClipboard();

  return (
    <div className="flex items-center gap-2">
      <Link href={`/blockexplorer/transaction/${hash}`} className="text-primary hover:underline font-mono text-sm">
        {hash?.substring(0, 6)}...{hash?.substring(hash.length - 4)}
      </Link>
      {isAddressCopiedToClipboard ? (
        <CheckCircleIcon className="h-4 w-4 text-green-500 cursor-pointer" aria-hidden="true" />
      ) : (
        <DocumentDuplicateIcon
          className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          aria-hidden="true"
          onClick={() => copyAddressToClipboard(hash)}
        />
      )}
    </div>
  );
};

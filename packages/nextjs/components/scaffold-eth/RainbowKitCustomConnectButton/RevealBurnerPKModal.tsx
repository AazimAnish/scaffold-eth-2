import { useState } from "react";
import { rainbowkitBurnerWallet } from "burner-connector";
import { EyeIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { useCopyToClipboard } from "~~/hooks/scaffold-eth";
import { getParsedError, notification } from "~~/utils/scaffold-eth";

const BURNER_WALLET_PK_KEY = "burnerWallet.pk";

export const RevealBurnerPKModal = () => {
  const { copyToClipboard, isCopiedToClipboard } = useCopyToClipboard();
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyPK = async () => {
    try {
      const storage = rainbowkitBurnerWallet.useSessionStorage ? sessionStorage : localStorage;
      const burnerPK = storage?.getItem(BURNER_WALLET_PK_KEY);
      if (!burnerPK) throw new Error("Burner wallet private key not found");
      await copyToClipboard(burnerPK);
      notification.success("Burner wallet private key copied to clipboard");
    } catch (e) {
      const parsedError = getParsedError(e);
      notification.error(parsedError);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <button
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent cursor-pointer transition-colors w-full text-left text-destructive"
        onClick={() => setIsOpen(true)}
      >
        <EyeIcon className="h-4 w-4" />
        <span>Reveal Private Key</span>
      </button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldExclamationIcon className="h-5 w-5 text-destructive" />
            Copy Burner Wallet Private Key
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg border border-destructive/50 bg-destructive/10">
            <ShieldExclamationIcon className="h-5 w-5 text-destructive mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-destructive mb-1">Warning</p>
              <p className="text-destructive/90">
                Burner wallets are intended for local development only and are not safe for storing real funds.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Your Private Key provides <strong>full access</strong> to your entire wallet and funds. This is currently
            stored <strong>temporarily</strong> in your browser.
          </p>

          <Button variant="outline" onClick={handleCopyPK} disabled={isCopiedToClipboard} className="w-full">
            {isCopiedToClipboard ? "Copied!" : "Copy Private Key To Clipboard"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

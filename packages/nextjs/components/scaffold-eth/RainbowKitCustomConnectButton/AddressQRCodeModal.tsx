import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Address as AddressType } from "viem";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~~/components/ui/dialog";

type AddressQRCodeModalProps = {
  address: AddressType;
};

export const AddressQRCodeModal = ({ address }: AddressQRCodeModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <button
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent cursor-pointer transition-colors w-full text-left"
        onClick={() => setIsOpen(true)}
      >
        <QrCodeIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">View QR Code</span>
      </button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Address QR Code</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className="p-4 bg-white rounded-lg border">
            <QRCodeSVG value={address} size={180} />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Address:</p>
            <Address address={address} format="short" disableAddressLink onlyEnsOrAddress size="sm" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

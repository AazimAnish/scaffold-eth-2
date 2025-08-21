import { useEffect, useRef, useState } from "react";
import { NetworkOptions } from "./NetworkOptions";
import { useDisconnect } from "wagmi";
import { ArrowLeftOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export const WrongNetworkDropdown = () => {
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mr-2" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80 cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Wrong network</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-popover p-2 shadow-lg z-50 space-y-1">
          <NetworkOptions />
          <li>
            <button
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent cursor-pointer transition-colors w-full text-left text-destructive"
              type="button"
              onClick={() => disconnect()}
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4" />
              <span>Disconnect</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

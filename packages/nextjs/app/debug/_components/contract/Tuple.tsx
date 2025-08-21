import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContractInput } from "./ContractInput";
import { getFunctionInputKey, getInitialTupleFormState } from "./utilsContract";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { replacer } from "~~/utils/scaffold-eth/common";
import { AbiParameterTuple } from "~~/utils/scaffold-eth/contract";

type TupleProps = {
  abiTupleParameter: AbiParameterTuple;
  setParentForm: Dispatch<SetStateAction<Record<string, any>>>;
  parentStateObjectKey: string;
  parentForm: Record<string, any> | undefined;
};

export const Tuple = ({ abiTupleParameter, setParentForm, parentStateObjectKey }: TupleProps) => {
  const [form, setForm] = useState<Record<string, any>>(() => getInitialTupleFormState(abiTupleParameter));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const values = Object.values(form);
    const argsStruct: Record<string, any> = {};
    abiTupleParameter.components.forEach((component, componentIndex) => {
      argsStruct[component.name || `input_${componentIndex}_`] = values[componentIndex];
    });

    setParentForm(parentForm => ({ ...parentForm, [parentStateObjectKey]: JSON.stringify(argsStruct, replacer) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(form, replacer)]);

  return (
    <div>
      <div className="bg-base-200 pl-4 py-1.5 border-2 border-secondary rounded-lg">
        <button
          type="button"
          className="flex items-center justify-between w-full p-0 min-h-fit text-primary-content/50 hover:text-primary-content transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="m-0 p-0 text-[1rem]">{abiTupleParameter.internalType}</p>
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="ml-3 flex-col space-y-4 border-secondary/80 border-l-2 pl-4 mt-2 pb-2">
            {abiTupleParameter?.components?.map((param, index) => {
              const key = getFunctionInputKey(abiTupleParameter.name || "tuple", param, index);
              return <ContractInput setForm={setForm} form={form} key={key} stateObjectKey={key} paramType={param} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

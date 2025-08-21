import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContractInput } from "./ContractInput";
import { getFunctionInputKey, getInitialTupleArrayFormState } from "./utilsContract";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";
import { replacer } from "~~/utils/scaffold-eth/common";
import { AbiParameterTuple } from "~~/utils/scaffold-eth/contract";

type TupleArrayProps = {
  abiTupleParameter: AbiParameterTuple & { isVirtual?: true };
  setParentForm: Dispatch<SetStateAction<Record<string, any>>>;
  parentStateObjectKey: string;
  parentForm: Record<string, any> | undefined;
};

export const TupleArray = ({ abiTupleParameter, setParentForm, parentStateObjectKey }: TupleArrayProps) => {
  const [form, setForm] = useState<Record<string, any>>(() => getInitialTupleArrayFormState(abiTupleParameter));
  const [additionalInputs, setAdditionalInputs] = useState<Array<typeof abiTupleParameter.components>>([
    abiTupleParameter.components,
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const depth = (abiTupleParameter.type.match(/\[\]/g) || []).length;

  useEffect(() => {
    // Extract and group fields based on index prefix
    const groupedFields = Object.keys(form).reduce(
      (acc, key) => {
        const [indexPrefix, ...restArray] = key.split("_");
        const componentName = restArray.join("_");
        if (!acc[indexPrefix]) {
          acc[indexPrefix] = {};
        }
        acc[indexPrefix][componentName] = form[key];
        return acc;
      },
      {} as Record<string, Record<string, any>>,
    );

    let argsArray: Array<Record<string, any>> = [];

    Object.keys(groupedFields).forEach(key => {
      const currentKeyValues = Object.values(groupedFields[key]);

      const argsStruct: Record<string, any> = {};
      abiTupleParameter.components.forEach((component, componentIndex) => {
        argsStruct[component.name || `input_${componentIndex}_`] = currentKeyValues[componentIndex];
      });

      argsArray.push(argsStruct);
    });

    if (depth > 1) {
      argsArray = argsArray.map(args => {
        return args[abiTupleParameter.components[0].name || "tuple"];
      });
    }

    setParentForm(parentForm => {
      return { ...parentForm, [parentStateObjectKey]: JSON.stringify(argsArray, replacer) };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(form, replacer)]);

  const addInput = () => {
    setAdditionalInputs(previousValue => {
      const newAdditionalInputs = [...previousValue, abiTupleParameter.components];

      // Add the new inputs to the form
      setForm(form => {
        const newForm = { ...form };
        abiTupleParameter.components.forEach((component, componentIndex) => {
          const key = getFunctionInputKey(
            `${newAdditionalInputs.length - 1}_${abiTupleParameter.name || "tuple"}`,
            component,
            componentIndex,
          );
          newForm[key] = "";
        });
        return newForm;
      });

      return newAdditionalInputs;
    });
  };

  const removeInput = () => {
    // Remove the last inputs from the form
    setForm(form => {
      const newForm = { ...form };
      abiTupleParameter.components.forEach((component, componentIndex) => {
        const key = getFunctionInputKey(
          `${additionalInputs.length - 1}_${abiTupleParameter.name || "tuple"}`,
          component,
          componentIndex,
        );
        delete newForm[key];
      });
      return newForm;
    });
    setAdditionalInputs(inputs => inputs.slice(0, -1));
  };

  return (
    <div>
      <div className="bg-base-200 pl-4 py-1.5 border-2 border-secondary rounded-lg">
        <button
          type="button"
          className="flex items-center justify-between w-full p-0 min-h-fit text-primary-content/50 hover:text-primary-content transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="m-0 text-[1rem]">{abiTupleParameter.internalType}</p>
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="ml-3 flex-col space-y-2 border-secondary/70 border-l-2 pl-4 mt-2 pb-2">
            {additionalInputs.map((additionalInput, additionalIndex) => (
              <div key={additionalIndex} className="space-y-1">
                <Badge variant="secondary" className="text-xs">
                  {depth > 1 ? `${additionalIndex}` : `tuple[${additionalIndex}]`}
                </Badge>
                <div className="space-y-4">
                  {additionalInput.map((param, index) => {
                    const key = getFunctionInputKey(
                      `${additionalIndex}_${abiTupleParameter.name || "tuple"}`,
                      param,
                      index,
                    );
                    return (
                      <ContractInput setForm={setForm} form={form} key={key} stateObjectKey={key} paramType={param} />
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" onClick={addInput}>
                +
              </Button>
              {additionalInputs.length > 0 && (
                <Button variant="secondary" size="sm" onClick={removeInput}>
                  -
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

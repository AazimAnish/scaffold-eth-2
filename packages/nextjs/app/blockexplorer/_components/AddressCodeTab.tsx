type AddressCodeTabProps = {
  bytecode: string;
  assembly: string;
};

export const AddressCodeTab = ({ bytecode, assembly }: AddressCodeTabProps) => {
  const formattedAssembly = Array.from(assembly.matchAll(/\w+( 0x[a-fA-F0-9]+)?/g))
    .map(it => it[0])
    .join("\n");

  return (
    <div className="flex flex-col gap-3 p-4">
      Bytecode
      <div className="bg-base-200 rounded-lg border border-base-300 overflow-y-auto max-h-[500px]">
        <pre className="px-5 py-4">
          <code className="whitespace-pre-wrap overflow-auto break-words text-sm">{bytecode}</code>
        </pre>
      </div>
      Opcodes
      <div className="bg-base-200 rounded-lg border border-base-300 overflow-y-auto max-h-[500px]">
        <pre className="px-5 py-4">
          <code className="text-sm">{formattedAssembly}</code>
        </pre>
      </div>
    </div>
  );
};

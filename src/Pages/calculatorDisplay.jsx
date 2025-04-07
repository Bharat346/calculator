export const CalculatorDisplay = ({ input, history }) => {
  return (
    <div className="mb-3 p-3 bg-gray-900 text-right text-2xl rounded-md min-h-[60px] font-mono flex flex-col">
      <div className="text-xs text-gray-400 h-4 overflow-hidden">
        {history.length > 0 && history[history.length - 1]}
      </div>
      <div className="mt-1 overflow-x-auto whitespace-nowrap">{input}</div>
    </div>
  );
};

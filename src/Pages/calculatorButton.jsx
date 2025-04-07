export const ModeToggle = ({ mode, setMode }) => {
  return (
    <div className="flex space-x-1">
      <button
        onClick={() => setMode("standard")}
        className={`px-2 py-1 text-sm rounded-md ${
          mode === "standard" ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        Standard
      </button>
      <button
        onClick={() => setMode("scientific")}
        className={`px-2 py-1 text-sm rounded-md ${
          mode === "scientific" ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        Scientific
      </button>
    </div>
  );
};

export const UnitToggle = ({ isRadians, setIsRadians }) => {
  return (
    <button
      onClick={() => setIsRadians(!isRadians)}
      className={`px-2 py-1 text-sm rounded-md ${
        isRadians ? "bg-purple-600" : "bg-indigo-600"
      }`}
    >
      {isRadians ? "RAD" : "DEG"}
    </button>
  );
};

export const StandardButtons = ({ handleClick }) => {
  const standardButtons = [
    "7",
    "8",
    "9",
    "/",
    "⌫",
    "4",
    "5",
    "6",
    "*",
    "C",
    "1",
    "2",
    "3",
    "-",
    "(",
    "0",
    ".",
    "=",
    "+",
    ")",
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {standardButtons.map((btn, i) => (
        <button
          key={`basic-${i}`}
          onClick={() => handleClick(btn)}
          className={`p-2 rounded-md text-lg font-bold transition-all duration-150 shadow-sm
              ${btn === "C" ? "bg-red-600 hover:bg-red-700" : ""}
              ${btn === "⌫" ? "bg-amber-600 hover:bg-amber-700" : ""}
              ${btn === "=" ? "bg-green-600 hover:bg-green-700" : ""}
              ${
                ["/", "*", "-", "+", "(", ")"].includes(btn)
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }
            `}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export const ScientificButtons = ({ handleClick, insertFunction }) => {
  const scientificButtons = [
    "sin",
    "cos",
    "tan",
    "π",
    "e",
    "asin",
    "acos",
    "atan",
    "^",
    "√",
    "ln",
    "log",
    "!",
    "(",
    ")",
  ];

  const operationButtons = ["⌫", "C"];

  return (
    <>
      <div className="grid grid-cols-5 gap-2 mb-2">
        {scientificButtons.map((btn, i) => (
          <button
            key={`sci-${i}`}
            onClick={() =>
              btn.length > 1 ? insertFunction(btn) : handleClick(btn)
            }
            className={`p-2 rounded-md text-sm font-bold transition-all duration-150 shadow-sm
                ${
                  ["sin", "cos", "tan", "asin", "acos", "atan"].includes(btn)
                    ? "bg-purple-600 hover:bg-purple-700"
                    : ""
                }
                ${
                  ["π", "e"].includes(btn)
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : ""
                }
                ${
                  ["ln", "log", "!", "^", "√"].includes(btn)
                    ? "bg-teal-600 hover:bg-teal-700"
                    : ""
                }
                ${
                  btn === "(" || btn === ")"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : ""
                }
              `}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {operationButtons.map((btn, i) => (
          <button
            key={`op-${i}`}
            onClick={() => handleClick(btn)}
            className={`p-2 rounded-md text-lg font-bold transition-all duration-150 shadow-sm
                ${btn === "C" ? "bg-red-600 hover:bg-red-700" : ""}
                ${btn === "⌫" ? "bg-amber-600 hover:bg-amber-700" : ""}
                ${btn === "=" ? "bg-green-600 hover:bg-green-700" : ""}
                ${
                  ["(", ")"].includes(btn)
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }
              `}
          >
            {btn}
          </button>
        ))}
        <button
          onClick={() => handleClick("=")}
          className="p-2 rounded-md text-lg font-bold bg-green-600 hover:bg-green-700 transition-all duration-150 shadow-sm col-span-2"
        >
          =
        </button>
      </div>
    </>
  );
};

import { useEffect } from "react";
import { useCalculator } from "../utils/calculatorLogic";
import { CalculatorDisplay } from "./calculatorDisplay";
import { ModeToggle, UnitToggle, StandardButtons, ScientificButtons } from "./calculatorButton";

export default function Calculator() {
  const {
    input,
    isRadians,
    mode,
    history,
    setInput,
    setIsRadians,
    setMode,
    handleClick,
    insertFunction
  } = useCalculator();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      const keyMap = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        ".": ".",
        Enter: "=",
        "=": "=",
        Backspace: "⌫",
        Escape: "C",
        "(": "(",
        ")": ")",
        "^": "^",
        "!": "!",
      };

      const functionKeys = {
        s: "sin",
        c: "cos",
        t: "tan",
        S: "asin",
        C: "acos",
        T: "atan",
        l: "ln",
        L: "log",
        q: "√",
        p: "π",
        e: "e",
      };

      if (key in keyMap) {
        e.preventDefault();
        handleClick(keyMap[key]);
      } else if (mode === "scientific" && key in functionKeys) {
        e.preventDefault();
        insertFunction(functionKeys[key]);
      } else if (key === "r" || key === "R") {
        e.preventDefault();
        setIsRadians(!isRadians);
      } else if (key === "m" || key === "M") {
        e.preventDefault();
        setMode(mode === "standard" ? "scientific" : "standard");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, isRadians, handleClick, insertFunction, setIsRadians, setMode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 p-4 rounded-2xl shadow-2xl w-80 text-white border border-gray-700">
        {/* Mode and unit toggle */}
        <div className="flex justify-between mb-3">
          <ModeToggle mode={mode} setMode={setMode} />
          <UnitToggle isRadians={isRadians} setIsRadians={setIsRadians} />
        </div>

        <CalculatorDisplay input={input} history={history} />

        {mode === "standard" ? (
          <StandardButtons handleClick={handleClick} />
        ) : (
          <ScientificButtons 
            handleClick={handleClick} 
            insertFunction={insertFunction} 
          />
        )}
      </div>
    </div>
  );
}
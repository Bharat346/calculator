import { useState } from "react";

export const useCalculator = () => {
  const [input, setInput] = useState("0");
  const [isRadians, setIsRadians] = useState(true);
  const [mode, setMode] = useState("standard");
  const [history, setHistory] = useState([]);

  // Tokenize and normalize the input expression
  const normalizeExpression = (expr) => {
    // Handle implicit multiplication first
    expr = expr.replace(/(\d+)([a-zπe(])/gi, "$1*$2");
    expr = expr.replace(/([)πe])(\d+)/gi, "$1*$2");
    expr = expr.replace(/([)πe])([a-z(])/gi, "$1*$2");

    // Convert square roots
    expr = expr.replace(/√([^(][^+\-*/)]*)/g, "Math.sqrt($1)");
    expr = expr.replace(/√\(([^)]+)\)/g, "Math.sqrt($1)");

    // Convert powers
    expr = expr.replace(/([\d.]+)\^([\d.]+)/g, "Math.pow($1,$2)");
    expr = expr.replace(/([\d.]+)\^\(([^)]+)\)/g, "Math.pow($1,$2)");
    expr = expr.replace(/([a-z]+)\^([\d.]+)/gi, "Math.pow($1,$2)");
    expr = expr.replace(/([a-z]+)\^\(([^)]+)\)/gi, "Math.pow($1,$2)");

    return expr;
  };

  const handleClick = (value) => {
    if (value === "C") {
      setInput("0");
    } else if (value === "⌫") {
      setInput((prev) => (prev.length === 1 ? "0" : prev.slice(0, -1)));
    } else if (value === "=") {
      try {
        let expression = normalizeExpression(input);
        // Replace constants
        expression = expression.replace(/π/g, Math.PI.toString());
        expression = expression.replace(/e/g, Math.E.toString());
        // Replace factorial
        expression = expression.replace(/(\d+)!/g, (_, num) => {
          let result = 1;
          for (let i = 2; i <= parseInt(num); i++) result *= i;
          return result.toString();
        });

        console.log(expression);

        // Process logarithmic functions FIRST (before trigonometric functions)
        expression = expression.replace(/log\(([^)]+)\)/g, (_, arg) => {
          const numericValue = parseFloat(arg);
          if (numericValue <= 0) {
            throw new Error("log input must be positive");
          }
          return `(Math.log(${numericValue})/Math.log(10))`; // log base 10
        });

        expression = expression.replace(/ln\(([^)]+)\)/g, (_, arg) => {
          const numericValue = parseFloat(arg);
          if (numericValue <= 0) {
            throw new Error("ln input must be positive");
          }
          return `Math.log(${numericValue})`; // natural log (base e)
        });

        expression = expression.replace(/atan\(([^)]+)\)/g, (_, arg) => {
          const numericValue = parseFloat(arg);
          const result = Math.atan(numericValue);
          return isRadians
            ? result.toString()
            : ((result * 180) / Math.PI).toString();
        });

        expression = expression.replace(/asin\(([^)]+)\)/g, (_, arg) => {
          const numericValue = parseFloat(arg);
          if (numericValue < -1 || numericValue > 1) {
            throw new Error("asin input must be between -1 and 1");
          }
          const result = Math.asin(numericValue);
          return isRadians
            ? result.toString()
            : ((result * 180) / Math.PI).toString();
        });

        expression = expression.replace(/acos\(([^)]+)\)/g, (_, arg) => {
          const numericValue = parseFloat(arg);
          if (numericValue < -1 || numericValue > 1) {
            throw new Error("acos input must be between -1 and 1");
          }
          const result = Math.acos(numericValue);
          return isRadians
            ? result.toString()
            : ((result * 180) / Math.PI).toString();
        });

        // Then process the basic trig functions
        expression = expression.replace(/tan\(([^)]+)\)/g, (_, arg) => {
          const numericValue = parseFloat(arg);
          const radiansValue = isRadians
            ? numericValue
            : (numericValue * Math.PI) / 180;
          return `Math.tan(${radiansValue})`;
        });

        expression = expression.replace(/sin\(([^)]+)\)/g, (_, arg) => {
          const numericValue = parseFloat(arg);
          const radiansValue = isRadians
            ? numericValue
            : (numericValue * Math.PI) / 180;
          return `Math.sin(${radiansValue})`;
        });

        expression = expression.replace(/cos\(([^)]+)\)/g, (_, arg) => {
          const numericValue = parseFloat(arg);
          const radiansValue = isRadians
            ? numericValue
            : (numericValue * Math.PI) / 180;
          return `Math.cos(${radiansValue})`;
        });

        // Evaluate the expression
        const result = eval(expression).toString();
        setHistory((prev) => [...prev.slice(-3), `${input} = ${result}`]);
        setInput(result);
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => {
        if (prev === "0") {
          if (["+", "-", "*", "/", ".", "^"].includes(value)) {
            return "0" + value;
          }
          return value;
        }

        // Handle special cases where we DON'T want multiplication
        if (/[\d)]$/.test(prev)) {
          // Don't add * before these operators
          if (["^", "+", "-", "*", "/", "="].includes(value)) {
            return prev + value;
          }
          // Add * before functions, constants, etc.
          if (/^[a-z(πe√]/.test(value)) {
            return prev + "*" + value;
          }
        }

        return prev + value;
      });
    }
  };

  const insertFunction = (func) => {
    setInput((prev) => {
      if (prev === "0") {
        return `${func}(`;
      }

      if (/[\+\-\*\/\^]$/.test(prev)) {
        return `${prev}${func}(`;
      }

      if (/[\d)]$/.test(prev)) {
        return `${prev}*${func}(`;
      }

      return `${prev}${func}(`;
    });
  };

  return {
    input,
    isRadians,
    mode,
    history,
    setInput,
    setIsRadians,
    setMode,
    setHistory,
    handleClick,
    insertFunction,
    normalizeExpression,
  };
};

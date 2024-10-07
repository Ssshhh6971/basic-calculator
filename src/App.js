import React, { useState } from "react";
import ButtonsContainer from "./components/ButtonsContainer";
import DisplayContainer from "./components/DisplayContainer";
import "./styles.css";

function App() {
  const [display, setDisplay] = useState(""); // For displaying input and result
  const [isResultDisplayed, setIsResultDisplayed] = useState(false); // Track if the result is shown

  // Date logic to get the current date
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`; // Create formatted date string

  // Append clicked numbers or operators to the display
  function handleClick(e) {
    const targetValue = e.target.name;

    // If the result is displayed and the user clicks a number, start fresh
    if (isResultDisplayed) {
      setDisplay(targetValue); // Start new input
      setIsResultDisplayed(false); // Reset the result display flag
    } else {
      setDisplay(display + targetValue); // Continue appending to the input
    }
  }

  function operatorClick(operator) {
    let lastCharacter = display.slice(-2);
    let operatorsArray = ["+ ", "- ", "* ", "/ "];

    if (display === "" || operatorsArray.includes(lastCharacter)) return;

    setDisplay((prevDisplay) => {
      return prevDisplay + " " + operator + " ";
    });
    setIsResultDisplayed(false); // Ensure result flag is off when adding an operator
  }

  function handleEqual() {
    // Check if the expression ends with an operator and avoid calculating
    if (display.slice(-2).includes("+ ", "- ", "* ", "/ ")) return;

    try {
      const resultValue = calculate(display);
      setDisplay(`${resultValue}`); // Display only the result
      setIsResultDisplayed(true); // Flag that the result is displayed
    } catch (error) {
      setDisplay("Error");
    }
  }

  function calculate(expression) {
    const tokens = expression.split(" ");
    let resultValue = parseInt(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNumber = parseInt(tokens[i + 1]);

      switch (operator) {
        case "+":
          resultValue += nextNumber;
          break;
        case "-":
          resultValue -= nextNumber;
          break;
        case "*":
          resultValue *= nextNumber;
          break;
        case "/":
          resultValue /= nextNumber;
          break;
        default:
          resultValue = "Error";
      }
    }
    return resultValue;
  }

  function clear() {
    setDisplay("");
    setIsResultDisplayed(false); // Reset the flag when cleared
  }

  function backspace() {
    if (isResultDisplayed) return; // Prevent backspace on the result
    setDisplay(display.slice(0, -1));
  }

  return (
    <>
      <div className="container">
        <div className="calculator">
          {/* Only one display area for both input and result */}
          <DisplayContainer
            display={display} // Single display area
            backspace={backspace}
            clear={clear}
          />
          <ButtonsContainer
            operatorClick={operatorClick}
            handleClick={handleClick}
            handleEqual={handleEqual}
          />
          <div className="side-by-side">
            {/* Display the dynamically generated date */}
            <p className="text-white">{formattedDate}</p>
            <p className="text-white">Shreya Nandhivargam</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

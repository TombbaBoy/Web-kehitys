function lengthOrSquare(value: string | number): number {
  if (typeof value === "string") {
    return value.length; // string → return length
  } else {
    return value * value; // number → return square
  }
}

// Ask the user for input
const userInput = prompt("Enter a string or number:") ?? "";

// Convert to number if possible, otherwise keep string
const parsedValue: string | number = isNaN(Number(userInput)) ? userInput : Number(userInput);

// Call the function
const output = lengthOrSquare(parsedValue);

console.log("Input type:", typeof parsedValue);
console.log("Result:", output);

alert(`Input type: ${typeof parsedValue}\nResult: ${output}`);

function squareRoot(num: number | null | undefined): number | string {
    if (num === null || num === undefined) {
        return "Input is undefined or null.";
    }

    if (isNaN(num)) {
        return "Invalid input. Please enter a valid number.";
    }

    if (num < 0) {
        return "Cannot calculate square root of a negative number.";
    }

    return Math.sqrt(num);
}

const input = prompt("Enter a number: ");
const numberInput: number | undefined = input ? parseFloat(input) : undefined;

const result = squareRoot(numberInput);
console.log(result);

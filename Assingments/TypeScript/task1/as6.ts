function reverseArray<T>(arr: T[]): T[] {
    return arr.slice().reverse(); // non-mutating
}

const numberArray: number[] = [1, 2, 3, 4, 5];
const stringArray: string[] = ["apple", "banana", "cherry", "date"];
const mixedArray: (string | number | boolean)[] = [true, 42, "hello", false];

console.log("Reversed Array of Numbers:", reverseArray(numberArray));
console.log("Reversed Array of Strings:", reverseArray(stringArray));
console.log("Reversed Mixed Array:", reverseArray(mixedArray));

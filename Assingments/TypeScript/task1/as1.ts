// Define interface Item
interface Item {
    name: string;
    price: number;
    quantity: number;
}

// Create an empty array named 'cart' to store the items
const cart: Item[] = [];

// Use a while loop to keep prompting until an empty item name is entered
while (true) {
    const itemName = prompt("Enter item name (leave empty to finish):");

    if (itemName === null || itemName.trim() === "") {
        break; // stop if user cancels or leaves blank
    }

    const itemPriceInput = prompt("Enter item price:");
    const itemQuantityInput = prompt("Enter item quantity:");

    // Convert inputs safely
    const itemPrice = itemPriceInput ? parseFloat(itemPriceInput) : 0;
    const itemQuantity = itemQuantityInput ? parseInt(itemQuantityInput) : 0;

    const newItem: Item = { name: itemName, price: itemPrice, quantity: itemQuantity };
    cart.push(newItem);
}

// Calculate the total cost using map + reduce
const totalCost = cart
    .map(item => item.price * item.quantity)
    .reduce((sum, cost) => sum + cost, 0);

// Display the total cost
alert(`Total cost of the shopping cart: $${totalCost.toFixed(2)}`);
console.log(`Total cost of the shopping cart: $${totalCost.toFixed(2)}`);

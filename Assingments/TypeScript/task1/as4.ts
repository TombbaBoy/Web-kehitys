// Define ElectronicDevice interface
interface ElectronicDevice {
  type: "electronic";
  brand: string;
  model: string;
}

// Define Book interface
interface Book {
  type: "book";
  title: string;
  author: string;
}

// Define union type Product
type Product = ElectronicDevice | Book;

function createElectronicDevice(): ElectronicDevice {
  const brand = (prompt("Enter electronic device brand:") ?? "").trim();
  const model = (prompt("Enter electronic device model:") ?? "").trim();
  return { type: "electronic", brand: brand || "Unknown Brand", model: model || "Unknown Model" };
}

function createBook(): Book {
  const title = (prompt("Enter book title:") ?? "").trim();
  const author = (prompt("Enter book author:") ?? "").trim();
  return { type: "book", title: title || "Untitled", author: author || "Unknown Author" };
}

function displayProductDetails(product: Product) {
  console.log(`Product Type: ${product.type}`);
  if (product.type === "electronic") {
    console.log(`Brand: ${product.brand}`);
    console.log(`Model: ${product.model}`);
  } else {
    console.log(`Title: ${product.title}`);
    console.log(`Author: ${product.author}`);
  }
}

// Collect user input
const electronicProduct = createElectronicDevice();
const bookProduct = createBook();

// Show results
console.log("Electronic Device Details:");
displayProductDetails(electronicProduct);

console.log("\nBook Details:");
displayProductDetails(bookProduct);

alert(
  `Electronic Device → Brand: ${electronicProduct.brand}, Model: ${electronicProduct.model}\n` +
  `Book → Title: ${bookProduct.title}, Author: ${bookProduct.author}`
);

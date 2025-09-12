type SimpleBook = {
  title: string;
  author: string;
  publicationYear: number;
};

function promptForBook(): SimpleBook {
  // prompt can return null, so normalize to empty string then trim
  const title = (prompt("Enter book title:") ?? "").trim();
  const author = (prompt("Enter book author:") ?? "").trim();

  // Keep asking until we get a valid numeric year (or user cancels -> default to current year)
  let publicationYear: number;
  while (true) {
    const yearInput = prompt("Enter publication year (e.g. 1999):");
    if (yearInput === null) { // user cancelled
      publicationYear = new Date().getFullYear();
      break;
    }
    const parsed = parseInt(yearInput.trim(), 10);
    if (!Number.isNaN(parsed)) {
      publicationYear = parsed;
      break;
    }
    alert("Please enter a valid numeric year (e.g. 1999).");
  }

  return {
    title: title || "Untitled",
    author: author || "Unknown",
    publicationYear
  };
}

const bookDetails = promptForBook();

console.log("Book Details:");
console.log(`Title: ${bookDetails.title}`);
console.log(`Author: ${bookDetails.author}`);
console.log(`Publication Year: ${bookDetails.publicationYear}`);

// optional: show a quick alert in browser
alert(`Book added:\n${bookDetails.title} by ${bookDetails.author} (${bookDetails.publicationYear})`);

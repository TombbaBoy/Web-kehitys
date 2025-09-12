// Define interface User
interface User {
  username: string;
  email: string;
  bio?: string; // optional property
}

// Create a user with all properties
const userWithBio: User = {
  username: "john_doe",
  email: "john@example.com",
  bio: "Loves TypeScript and web development."
};

// Create a user without bio
const userWithoutBio: User = {
  username: "jane_smith",
  email: "jane@example.com"
};

// Function to display user information
function displayUserInfo(user: User): void {
  console.log(`Username: ${user.username}`);
  console.log(`Email: ${user.email}`);
  if (user.bio) {
    console.log(`Bio: ${user.bio}`);
  } else {
    console.log("Bio: (not provided)");
  }

  alert(
    `Username: ${user.username}\nEmail: ${user.email}\nBio: ${
      user.bio ?? "(not provided)"
    }`
  );
}

// Display user info for both
displayUserInfo(userWithBio);
displayUserInfo(userWithoutBio);

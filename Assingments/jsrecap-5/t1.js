async function getUser() {
  try {
    const options = {
      headers: {
        'x-api-key': 'reqres-free-v1', // required in your note
      }
    };

    const response = await fetch("https://reqres.in/api/users/1", options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // still log to console for the assignment

    // Display user in HTML cuz i like it better that way so i can see the changes i have actually made
    const userDiv = document.getElementById("user");
    const user = data.data; // API returns { data: { ... } }

    userDiv.innerHTML = `
      <h2>${user.first_name} ${user.last_name}</h2>
      <p>Email: ${user.email}</p>
      <img src="${user.avatar}" alt="User Avatar">
    `;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

getUser();


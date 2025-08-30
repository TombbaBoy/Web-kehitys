document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;

  try {
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1" // 🔑 API key from previous assignment
      },
      body: JSON.stringify({ name, job })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // Show response in HTML
    document.getElementById("response").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Error creating user:", error);
  }
});

// Generic reusable fetch function
async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
    }

    return await response.json(); // return JSON if successful
  } catch (error) {
    throw new Error("Fetch failed: " + error.message);
  }
}

// Test function on button click
document.getElementById("postBtn").addEventListener("click", async () => {
  const user = {
    name: "John Dope",
    job: "Developer-ish"
  };

  const url = "https://reqres.in/api/users";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1" // add API key like previous tasks
    },
    body: JSON.stringify(user)
  };

  try {
    const userData = await fetchData(url, options);
    console.log(userData);
    document.getElementById("output").textContent = JSON.stringify(userData, null, 2);
  } catch (error) {
    console.error("An error occurred:", error);
    document.getElementById("output").textContent = error.message;
  }
});

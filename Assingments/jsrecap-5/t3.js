const output = document.getElementById("output");

async function fetchWithErrorHandling(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
    }

    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Fetch error:", error.message);
    output.textContent = " " + error.message;
  }
}

document.getElementById("getBtn").addEventListener("click", () => {
  fetchWithErrorHandling("https://reqres.in/api/unknown/15", {
    method: "GET",
    headers: { "x-api-key": "reqres-free-v1" }
  });
});

document.getElementById("postBtn").addEventListener("click", () => {
  fetchWithErrorHandling("https://reqres.in/api/unknown/15", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1"
    },
    body: JSON.stringify({ name: "Test", job: "Fail" })
  });
});

document.getElementById("putBtn").addEventListener("click", () => {
  fetchWithErrorHandling("https://reqres.in/api/unknown/15", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1"
    },
    body: JSON.stringify({ name: "Updated Name" })
  });
});

document.getElementById("deleteBtn").addEventListener("click", () => {
  fetchWithErrorHandling("https://reqres.in/api/unknown/15", {
    method: "DELETE",
    headers: { "x-api-key": "reqres-free-v1" }
  });
});

const BASE_URL = "https://media1.edu.metropolia.fi/restaurant/api/v1";

const table = document.querySelector("table");
const dialog = document.querySelector("dialog");

// Clear row highlights
function clearHighlights() {
  document.querySelectorAll("tr.restaurant-row").forEach(row => {
    row.classList.remove("highlight");
  });
}

// Create a table row for each restaurant
function createRow(restaurant) {
  const tr = document.createElement("tr");
  tr.classList.add("restaurant-row");

  const nameTd = document.createElement("td");
  nameTd.textContent = restaurant.name;

  const addressTd = document.createElement("td");
  addressTd.textContent = restaurant.address;

  tr.appendChild(nameTd);
  tr.appendChild(addressTd);

  // On click: fetch daily menu + show modal
  tr.addEventListener("click", async () => {
    clearHighlights();
    tr.classList.add("highlight");

    try {
      // Use companyId for daily menu
      const res = await fetch(`${BASE_URL}/restaurants/daily/${restaurant._id}/en`);
      if (!res.ok) throw new Error("Menu fetch failed");

      const menu = await res.json();
      console.log("Menu data:", menu); //  Debug

      // Build menu HTML
      let menuHtml = "<h3>Today's Menu</h3>";
      if (menu.courses && menu.courses.length > 0) {
        menuHtml += "<ul>";
        menu.courses.forEach(course => {
          menuHtml += `<li>${course.name} - ${course.price || ""} (${course.diets || ""})</li>`;
        });
        menuHtml += "</ul>";
      } else {
        menuHtml += "<p>No menu available</p>";
      }

      // Show modal with restaurant info + menu
      dialog.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p><strong>Address:</strong> ${restaurant.address}</p>
        <p><strong>Postal Code:</strong> ${restaurant.postalCode}</p>
        <p><strong>City:</strong> ${restaurant.city}</p>
        <p><strong>Phone:</strong> ${restaurant.phone}</p>
        <p><strong>Company:</strong> ${restaurant.company}</p>
        ${menuHtml}
        <button id="closeModal">Close</button>
      `;
      dialog.showModal();

      document.getElementById("closeModal").addEventListener("click", () => {
        dialog.close();
      });
    } catch (err) {
      dialog.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p>Error loading menu: ${err.message}</p>
        <button id="closeModal">Close</button>
      `;
      dialog.showModal();

      document.getElementById("closeModal").addEventListener("click", () => {
        dialog.close();
      });
    }
  });

  return tr;
}

// Fetch restaurants and render them
async function loadRestaurants() {
  try {
    const res = await fetch(`${BASE_URL}/restaurants`);
    if (!res.ok) throw new Error("Failed to fetch restaurants");

    const restaurants = await res.json();
    console.log("Restaurants data:", restaurants); // 👈 Debug

    // Sort alphabetically
    restaurants.sort((a, b) => a.name.localeCompare(b.name));

    // Add rows to table
    restaurants.forEach(restaurant => {
      const row = createRow(restaurant);
      table.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 2;
    td.textContent = "Failed to load restaurants.";
    tr.appendChild(td);
    table.appendChild(tr);
  }
}

// Load restaurants on page load
loadRestaurants();

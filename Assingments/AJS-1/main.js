import { BASE_URL } from "./variables.js";
import { fetchData } from "./utils.js";
import { restaurantRow, restaurantModal } from "./components.js";

const table = document.querySelector("table");
const dialog = document.querySelector("dialog");
const filterControls = document.getElementById("filter-controls");

let allRestaurants = []; // Store all fetched restaurants

// Clear row highlights with arrow function
const clearHighlights = () =>
  document.querySelectorAll("tr.restaurant-row").forEach((row) =>
    row.classList.remove("highlight")
  );

// Render restaurants in the table
const renderRestaurants = (restaurants) => {
  // Remove existing rows with arrow function
  table.querySelectorAll("tr.restaurant-row").forEach((r) => r.remove());

  if (!restaurants.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3">No restaurants to display</td>`;
    table.appendChild(tr);
    return;
  }

  
  // Effective use of map and event listeners
  // Each restaurant object becomes a table row with click listener for modal
  const rows = restaurants.map((restaurant) => {
    const row = restaurantRow(restaurant);

    row.addEventListener("click", async () => {
      clearHighlights();
      row.classList.add("highlight");

      try {
        const menu =
          (await fetchData(
            `${BASE_URL}/restaurants/daily/${restaurant._id}/en`
          )) || { courses: [] };

        dialog.innerHTML = restaurantModal(restaurant, menu);
        dialog.showModal();

        document
          .getElementById("closeModal")
          .addEventListener("click", () => dialog.close());
      } catch (err) {
        alert("Failed to load menu. Please try again later.");
        console.error(err);
      }
    });

    return row; // return <tr> element
  });

  // Append all rows to table
  rows.forEach((row) => table.appendChild(row));
};

// Load all restaurants from API
const loadRestaurants = async () => {
  try {
    const restaurants = await fetchData(`${BASE_URL}/restaurants`);
    if (!restaurants) throw new Error("Failed to fetch restaurants");

    allRestaurants = restaurants.sort((a, b) => a.name.localeCompare(b.name));
    renderRestaurants(allRestaurants);
  } catch (err) {
    console.error(err);
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3">Failed to load restaurants</td>`;
    table.appendChild(tr);
  }
};

// Filter button click handler
filterControls.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter;
  if (!filter) return; // Click was outside a button

  // Use filter and arrow functions
  const filteredRestaurants =
    filter === "all"
      ? allRestaurants
      : allRestaurants.filter(
          (r) => r.company?.toLowerCase() === filter.toLowerCase()
        );

  renderRestaurants(filteredRestaurants);
});

// Initialize app
loadRestaurants();

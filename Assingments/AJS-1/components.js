// Row: builds a table row for a restaurant
export const restaurantRow = (restaurant) => {
  const { name, address, company } = restaurant;

  const tr = document.createElement("tr");
  tr.classList.add("restaurant-row");
  tr.innerHTML = `
    <td>${name}</td>
    <td>${address}</td>
    <td>${company || "-"}</td>
  `;
  return tr;
};

// Modal: builds modal HTML for restaurant + menu
export const restaurantModal = (restaurant, menu) => {
  const { name, address, postalCode, city, phone, company } = restaurant;
  const { courses = [] } = menu;

  let menuHtml = "<h3>Today's Menu</h3>";
  menuHtml += courses.length
    ? `<ul>${courses
        .map(
          ({ name, price, diets }) =>
            `<li>${name}, ${price || "?€"} ${diets || ""}</li>`
        )
        .join("")}</ul>`
    : "<p>No menu available</p>";

  return `
    <h2>${name}</h2>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Postal Code:</strong> ${postalCode}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Company:</strong> ${company}</p>
    ${menuHtml}
    <button id="closeModal">Close</button>
  `;
};

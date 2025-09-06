// components.js

// Create restaurant row
export const restaurantRow = ({ name, company }) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${name}</td>
    <td>${company}</td>
  `;
  return tr;
};

// Create restaurant modal
export const restaurantModal = (restaurant, { courses }) => {
  const {
    name,
    address,
    postalCode,
    city,
    phone,
    company
  } = restaurant;

  let menuHtml = '<ul>';
  courses.forEach(({ name, price, diets }) => {
    menuHtml += `<li>${name}, ${price ? price : '?€'}. ${diets}</li>`;
  });
  menuHtml += '</ul>';

  return `
    <h1>${name}</h1>
    <p>${address}</p>
    <p>${postalCode}, ${city}</p>
    <p>${phone}</p>
    <p>${company}</p>
    ${menuHtml}
  `;
};

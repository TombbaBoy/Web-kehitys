const dialog = document.getElementById("registerDialog");
const openBtn = document.getElementById("openDialog");
const closeBtn = document.getElementById("closeDialog");
const form = document.getElementById("registerForm");

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault(); // prevents closing if invalid
  }
});

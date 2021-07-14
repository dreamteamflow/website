document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".toggle-image").addEventListener("click", (event) => {
    let image = document.querySelector(`.${event.currentTarget.dataset.image}`);
    image.style.display = (image.style.display === "none" ? "block" : "none");
  });
});

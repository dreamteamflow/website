document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".current-year").forEach(el => {
    el.textContent = (new Date()).getFullYear();
  });
});

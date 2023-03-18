let incrementBtn = document.getElementById("increment");
let decrementBtn = document.getElementById("decrement");
let resetBtn = document.getElementById("reset");
let counter = document.getElementById("counter");
let counterValue = 0;

counter.innerHTML = counterValue;

incrementBtn.addEventListener("click", () => {
  counter.innerHTML = ++counterValue;
});

decrementBtn.addEventListener("click", () => {
  counter.innerHTML = --counterValue;
});

resetBtn.addEventListener("click", () => {
  counter.innerHTML = counterValue = 0;
});

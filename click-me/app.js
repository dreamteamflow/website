document.addEventListener("DOMContentLoaded", () => {
  const clickMeBtn = elt("#click-me");
  let btnPosition = 0;
  let mouseOverCount;

  clickMeBtn.style.transition = "all 0.3s ease";

  function handleMouseover() {
    const MAX_MOVER = 20;
    let transformation;

    if (mouseOverCount > MAX_MOVER) {
      removeEvent(clickMeBtn, "mouseover", handleMouseover);
      clickMeBtn.innerText = "C'est bon j'arrête!";
      transformation = "translate(0, 0)";
      addClicTo(clickMeBtn);

      setTimeout(() => {
        clickMeBtn.innerText = "Rejouer";
        clickMeBtn.classList.add("jdb-green");
        clickMeBtn.classList.remove("jdb-black");
        removeEvent(clickMeBtn, "click", handleClic);
        clickMeBtn.addEventListener("click", handleRestartClic);
      }, 1e4);
    } else {
      if (mouseOverCount > MAX_MOVER / 2) {
        clickMeBtn.innerText = "Essaie encore";
      }

      if (random(0, 1) === 0) { // 0: X axis, 1: Y axis
        btnPosition = btnPosition ? 0 : (clickMeBtn.offsetWidth + 20);
        transformation = `translate(${btnPosition}px, 0)`;
      } else {
        btnPosition = btnPosition ? 0 : (clickMeBtn.offsetHeight + 80);
        transformation = `translate(0, ${btnPosition / 2}px)`;
      }

      mouseOverCount++;
    }

    clickMeBtn.style.transform = transformation;
  }

  function handleClic() {
    clickMeBtn.textContent = "Aïe";
    clickMeBtn.addEventListener("click", function() {
      this.textContent = `${this.textContent} Aïe`;
    });
  }

  function handleRestartClic() {
    removeClicFrom(clickMeBtn);
    clickMeBtn.classList.add("jdb-black");
    clickMeBtn.classList.remove("jdb-green");
    clickMeBtn.textContent = "Clique moi";
    initClicMe();
  }

  function addClicTo(elem) {
    elem.addEventListener("click", handleClic, { once: true });
  }

  function removeClicFrom(elem) {
    removeEvent(elem, "click", handleClic);
    removeEvent(elem, "click", handleRestartClic);
  }

  function initClicMe() {
    mouseOverCount = 0;
    clickMeBtn.addEventListener("mouseover", handleMouseover);
  }

  initClicMe();
})

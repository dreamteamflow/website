document.addEventListener("DOMContentLoaded", () => {
  const clickMeBtn = elt("#click-me");
  const X_AXIS_DISTANCE = (clickMeBtn.offsetWidth + 20);
  const Y_AXIS_DISTANCE = (clickMeBtn.offsetHeight + 80);
  const MAX_MOVER = 20;
  let aieText = "Aïe";
  let btnPosition = 0;
  let mouseOverCount;
  let transformation;

  clickMeBtn.style.transition = "all 0.3s ease";

  function handleMouseover() {
    if (mouseOverCount > MAX_MOVER) {
      removeEvent(clickMeBtn, "mouseover", handleMouseover);
      clickMeBtn.innerText = "C'est bon j'arrête!";
      transformation = "translate(0, 0)";
      addClicTo(clickMeBtn);

      setTimeout(() => {
        clickMeBtn.setAttribute("disabled", true);
        clickMeBtn.innerText = "Rejouer";
        clickMeBtn.classList.add("jdb-green");
        clickMeBtn.classList.remove("jdb-black");
        removeEvent(clickMeBtn, "click", handleClic);
        setTimeout(() => {
          clickMeBtn.removeAttribute("disabled");
          clickMeBtn.addEventListener("click", handleRestartClic);
        }, 3e3);
      }, 5e3);
    } else {
      if (mouseOverCount > MAX_MOVER / 2) {
        clickMeBtn.innerText = "Essaie encore";
      }

      if (random(0, 1) === 0) { // 0: X axis, 1: Y axis
        btnPosition = btnPosition ? 0 : X_AXIS_DISTANCE;
        transformation = `translate(${btnPosition}px, 0)`;
      } else {
        btnPosition = btnPosition ? 0 : Y_AXIS_DISTANCE;
        transformation = `translate(0, ${btnPosition / 2}px)`;
      }

      mouseOverCount++;
    }

    clickMeBtn.style.transform = transformation;
  }

  function updateAie() {
    clickMeBtn.innerText = (aieText += " Aïe");
  }

  function handleClic() {
    clickMeBtn.innerText = aieText;
    clickMeBtn.addEventListener("click", updateAie);
  }

  function handleRestartClic() {
    clickMeBtn.style.transform = `translate(0, ${Y_AXIS_DISTANCE / 2}px)`;
    removeClicFrom(clickMeBtn);
    initClicMe();
    clickMeBtn.classList.add("jdb-black");
    clickMeBtn.classList.remove("jdb-green");
    clickMeBtn.innerText = "Clique moi";
    aieText = "Aïe";
  }

  function addClicTo(elem) {
    elem.addEventListener("click", handleClic, { once: true });
  }

  function removeClicFrom(elem) {
    [updateAie, handleClic, handleRestartClic].forEach((fn) => {
      removeEvent(elem, "click", fn);
    });
  }

  function initClicMe() {
    mouseOverCount = 0;
    clickMeBtn.addEventListener("mouseover", handleMouseover);
  }

  initClicMe();
})

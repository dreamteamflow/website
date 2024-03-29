/**
 * Copyright 2022 José dBruxelles. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Global variables
let timer, ok;
const MIN_SECONDS = 5;
const BTN_TEXT = "Cliquez ici";
let desc = document.createElement("p");
let btn = document.createElement("button");

// Button initialization
btn.textContent = BTN_TEXT;
btn.classList.add("jdb-btn", "jdb-blue", "jdb-round-lg", "jdb-unselectable");
btn.addEventListener("mousedown", startHold);
btn.addEventListener("mouseup", endHold);
btn.addEventListener("touchstart", startHold);
btn.addEventListener("touchend", endHold);

function startHold() {
  if (ok === "OK") return;
  let counter = 1;
  timer = setInterval(() => {
    btn.textContent = `${BTN_TEXT} ${counter}/${MIN_SECONDS}`;
    if (counter > MIN_SECONDS) {
      clearTimer();
      showFinalMessage();
      updateBtnState();
      ok = "OK";
    }
    counter++;
  }, 1000);
}

function endHold() {
  clearTimer();
  if (ok !== "OK") btn.textContent = BTN_TEXT;
}

function clearTimer() {
  clearInterval(timer);
}

function showFinalMessage() {
  const date_ = (new Date());
  const year = date_ >= 10 ? (date_.getFullYear() + 1) : date_.getFullYear();
  desc.textContent = `BONNE ANNÉE ${year} !`;
  desc.classList.add("jdb-xl");
}

function updateBtnState() {
  btn.textContent = "✨ 🥳🥳🥳 ✨";
  btn.classList.remove("jdb-btn", "jdb-blue");
  btn.classList.add("jdb-btn-block", "jdb-black");
  btn.disabled = true;
  btn.style.opacity = "1";
}

// Description initialization
desc.style = "max-width:300px";
desc.classList.add("jdb-margin-auto");
desc.innerHTML = `Cliquez sur le bouton ci-dessous et gardez-le appuyé pendant 5 sec`;

// Append elements to the body
document.getElementById("pnl").appendChild(desc);
document.getElementById("pnl").appendChild(btn);

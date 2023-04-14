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

const textArea = elt("#speech-text");
const voiceList = elt("#speech-voice");
const speechBtn = elt("#speech-submit");

let isSpeaking = true;

function updateListOfVoices() {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) elt("#no-voice").remove();
  for (let voice of voices) {
    let option = document.createElement("option");
    option.value = voice.name;
    option.text = `${voice.name} / ${voice.lang}`;
    voiceList.add(option);

    if (voice.default) option.setAttribute("selected", "selected");
  }
}

window.speechSynthesis.addEventListener("voiceschanged", updateListOfVoices);

/**
 * Make the browser read the given text
 * using the Speech Synthesis technologie.
 * @param {string} text the text to read.
 * @param {Function} [callback] the function that handle once the speech finished.
 */
function readText(text, callback) {
  if (SpeechSynthesisUtterance && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    for (let voice of window.speechSynthesis.getVoices()) {
      if (voice.name === voiceList.value) utterance.voice = voice;
    }
    utterance.onend = () => { // Speech finished.
      if (callback && typeof callback === "function") callback();
    };
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Text-to-speech is not supported by this browser.");
  }
}

speechBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (textArea.value !== "") {
    if (!window.speechSynthesis.speaking) {
      readText(textArea.value);
    }

    if (textArea.value.length > 80) {
      if (isSpeaking) {
        window.speechSynthesis.resume();
        isSpeaking = false;
        speechBtn.innerHTML = "Pause";
      } else {
        window.speechSynthesis.pause();
        isSpeaking = true;
        speechBtn.innerHTML = "Reprendre";
      }

      setInterval(() => {
        if (!window.speechSynthesis.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerHTML = "Synthèse vocale";
        }
      });
    } else {
      speechBtn.innerHTML = "Synthèse vocale";
    }
  } else {
    // Ask to enter text
  }
});

updateListOfVoices();

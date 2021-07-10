const COLORS = ["light-blue", "yellow", "blue"];
const VOLUME_IMG = `<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>`;

let isRinging = false;

// If true, the name in the ring will be read,
// If false, only the message without a name will be read.
let readNameOnPickUp = true;
let ringTimeout;

let sounds = {
  ring: new Audio("audios/ring-ring.mp3")
};

// Default audio settings.
sounds.ring.loop = true;
sounds.ring.muted = false;

/**
 * Have the browser read the given text
 * using the Speech Synthesis technologie.
 * @param {string} text the text to read.
 * @param {Function} [callback] the function that handle once the speech finished.
 */
function readText(text, callback) {
  // if the feature is supported by the browser.
  if (SpeechSynthesisUtterance && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.onend = () => { // Speech finished.
      if (callback && typeof callback === "function") callback();
    };
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("La syncthèse vocale n'est pas prise en charge par ce navigateur.");
  }
}

/**
 * Pick up the ringing call.
 */
function pickUp() {
  // Start by clearing the existig timeout.
  clearTimeout(ringTimeout);
  stopSound("ring");

  $(".big-square .item.active.ringing")
    .removeClass("ringing")
    .addClass("answered").delay(50).queue(function(){
      let $this = $(this);

      // Disable the answer button.
      $(".answer-button").attr("disabled", true);

      readText(function(){
        if (readNameOnPickUp) {
          let name = $this.find(".name").text();
          return `Vous pouvez entrer. ${name} vous attend.`;
        }
        return "Vous pouvez entrer.";
      }.call(this), () => {
        $this.removeClass(["active", "answered"]).dequeue();
        isRinging = false;
      });
    });
}

/**
 * Hang up the current call.
 * @param {(string|object)} [element] the selector or object of
 * the element to mark as ringing.
 */
function hangUp(element = ".big-square .item.active") {
  // Cancel the speech synthesis.
  window.speechSynthesis.cancel();
  isRinging = false;
  stopSound("ring");
  $(element)
    .removeClass("ringing")
    .addClass("stopped").delay(1e3).queue(function(){
      $(this).removeClass(["active", "stopped"]).dequeue();
    });

  // Disable the answer button.
  $(".answer-button").attr("disabled", true);
}

/**
 * Ring on the bell. Mark the given element as ringing.
 * @param {(string|object)} element the selector or object of
 * the element to mark as ringing.
 */
function ring(element) {
  hangUp(); // Stop the active call.

  // Clear the previous timeout if there is one.
  clearTimeout(ringTimeout);

  // Mark the given item as active.
  $(element).addClass(["active", "ringing"]);
  $(".answer-button").attr("disabled", false);

  startSound("ring");
  isRinging = true;
  ringTimeout = setTimeout(hangUp, 10000);
}

/**
 * Pause the given audio and set the cursor to 0.
 * @param {string} sound the sound name.
 */
function stopSound(sound) {
  sounds[sound].pause();
  sounds[sound].currentTime = 0;
}

/**
 * Play the given sound.
 * @param {string} sound the sound name.
 */
function startSound(sound) {
  sounds[sound].play();
}

// Select all bell items. for each item,
$(".big-square .item").each((index, item) => {
  // Add a volume icon to the .icon element.
  $(item).find(".user .icon").append(VOLUME_IMG);

  // Add events to the button of this item.
  $(item).find(".ring").mouseover(function(){
    $(this).addClass(COLORS[index]);
  }).on("mouseleave", function() {
    // Wait 0,1 second before remove the class.
    $(this).delay(100).queue(function(){
      $(this).removeClass(COLORS[index]).dequeue();
    });
  }).click(function(){
    // If ringing has not started.
    if (!$(item).hasClass("ringing")) {
      ring(item);
    } else
    // If the bell is ringing.
    if ($(item).hasClass("ringing")) {
      hangUp(item);
    }
  });
});

$(".answer-button").click(pickUp);

$(window).keydown(event => {
  if (event.keyCode === 32) pickUp(); // Space key
  // else console.log(event.keyCode);
});

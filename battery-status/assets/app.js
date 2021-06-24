$(document).ready(function(){
  if ("getBattery" in navigator) {
    let $battery = $(".battery-body");
    let $msgContainer = $(".battery-msg");
    let $statusContainer = $(".battery-status");
    let chargingInterval;

    navigator.getBattery().then((battery) => {
      updateChargingState();
      updateBatteryLevel();

      function getBatteryLevel() {
        return (battery.level * 100).toFixed();
      }

      function updateChargingState() {
        if (battery.charging) {
          $battery.addClass("is-charging");
          $msgContainer.html("Sur secteur<br>Charge en cours...");
          $statusContainer.find(".charging span")
            .text("Oui").css("color", "green");

          let level = Number(getBatteryLevel());
          chargingInterval = setInterval(() => {
            if (level >= 100) {
              level = Number(getBatteryLevel());
            } else if (level >= 90) {
              level = 100;
            }
            $battery.find(".battery-charge-level").css({
              width: `calc(${level}% + 1px)`
            });
            level = level + 10;
          }, 1000);
        } else {
          $battery.removeClass("is-charging");
          $msgContainer.html("Non branchée<br>Sur batteries");
          $statusContainer.find(".charging span")
            .text("Non").css("color", "orange");
          clearInterval(chargingInterval);
        }
      }

      function updateBatteryLevel() {
        let level = getBatteryLevel();
        let width = `calc(${level}% + 1px)`;
        $statusContainer.find(".level span").text(`${level}%`);

        if (level <= 15) {
          $battery.attr("data-type", "low");
          $battery.find(".battery-charge-level").css({
            background: "red", width
          });
        } else if (level < 90) {
          $battery.attr("data-type", "middle");
          $battery.find(".battery-charge-level").css({
            background: "gray", width
          });
        } else { // level is >= 90
          $battery.attr("data-type", "full");
          $battery.find(".battery-charge-level").css({
            background: "green", width
          });
        }
      }

      battery.addEventListener("chargingchange", updateChargingState);
      battery.addEventListener("levelchange", updateBatteryLevel);
    });
  } else {
    // For browsers that still do not support battery API.
    $(".battery-msg").text("Oups ! Ce navigateur ne prend pas" +
      " en charge l'API de la batterie.").css({
        color: "#cd0000",
        "font-size": "19px",
        "font-weight": "normal",
        "max-width": "300px",
        margin: "auto"
      });
  }
});

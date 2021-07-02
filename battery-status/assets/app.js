$(document).ready(function(){
  if ("getBattery" in navigator) {
    let $battery = $(".battery-body");
    let $msgContainer = $(".battery-msg");
    let $statusContainer = $(".battery-status");
    let displayType = "full";
    let level = 0, loadingLevel;
    let chargingInterval;

    navigator.getBattery().then((battery) => {
      updateChargingState();

      function getBatteryLevel() {
        return Number((battery.level * 100).toFixed());
      }

      function updateChargingState() {
        if (battery.charging) {
          $battery.addClass("is-charging");
          $msgContainer.html("Sur secteur<br>Charge en cours...");
          $statusContainer.find(".charging span")
            .text("Oui").css("color", "green");

          level = getBatteryLevel();
          loadingLevel = level;

          chargingInterval = setInterval(() => {
            $statusContainer.find(".level span").text(`${level}%`);

            if (loadingLevel >= 0 && loadingLevel <= 20) loadingLevel = 19;
            else if (loadingLevel > 20 && loadingLevel <= 40) loadingLevel = 39;
            else if (loadingLevel > 40 && loadingLevel <= 60) loadingLevel = 59;
            else if (loadingLevel > 60 && loadingLevel <= 80) loadingLevel = 79;
            else if (loadingLevel > 80) loadingLevel = 100;

            if (displayType === "full") {
              useDisplayOne(level);
            } else {
              useDisplayTwo(level);
            }

            if (loadingLevel >= 100) {
              loadingLevel = getBatteryLevel();
            } else {
              loadingLevel = loadingLevel + 20;
            }
          }, 1000);
        } else {
          loadingLevel = getBatteryLevel();
          $battery.removeClass("is-charging");
          $msgContainer.html("Non branchée<br>Sur batterie");
          $statusContainer.find(".charging span")
            .text("Non").css("color", "orange");
          clearInterval(chargingInterval);
        }
        updateBatteryLevel();
      }

      function updateBatteryLevel() {
        level = getBatteryLevel();
        let width = displayType === "bars" ? "100%" : `calc(${level}% + 1px)`;
        $statusContainer.find(".level span").text(`${level}%`);

        if (level <= 15) {
          $battery.attr("data-type", "low")
            .find(".battery-charge-level").css({
              background: "red", width
            });
        } else if (level < 90) {
          $battery.attr("data-type", "middle")
            .find(".battery-charge-level").css({
              background: "gray", width
            });
        } else { // level is >= 90
          $battery.attr("data-type", "full")
            .find(".battery-charge-level").css({
              background: "green", width
            });
        }

        if (displayType === "full") {
          useDisplayOne(level);
        } else {
          useDisplayTwo(level);
        }
      }

      function useDisplayOne() {
        $battery.find(".battery-charge-level").css({
          width: `calc(${loadingLevel}% + 1px)`,
          background: "gray"
        });
      }

      function useDisplayTwo() {
        let $container = $battery.find(".battery-charge-level");
        let countLevels = Math.ceil(loadingLevel / 20);

        $container.empty().css({
          background: "transparent",
          width: "100%"
        });

        for (let i = 0; i < countLevels; i++) {
          $container.append(`<span></span>`);
        }
      }

      battery.addEventListener("chargingchange", updateChargingState);
      battery.addEventListener("levelchange", updateBatteryLevel);

      $("input[name='display-type']").change(() => {
        displayType = $("input[name='display-type']:checked").val();
        updateBatteryLevel();
        $battery.addClass(function(){
          if (displayType === "bars") {
            $(this).removeClass("full");
            return "bars";
          } else {
            $(this).removeClass("bars");
            return "full";
          }
        });
      });
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

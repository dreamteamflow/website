/**
 *
 * Copyright 2016 Dream team. All rights reserved.
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

// Wait until the document (DOM) is fully loaded.
$(document).ready(function() {
  const DEFAULT_IMAGE_URL = "assets/images/default-profil.png";
  const TODAY = new Date("2021-07-13");

  /**
   * Returns an icon element for the given call type.
   * @param {string} type The call type (e.g.: in, out or missed).
   * @returns the Font Awesome icon element.
   */
  function getCallTypeIcon(type) {
    switch (type) {
      case "in": return '<i class="fas fa-phone"></i>';
      case "out": return '<i class="fas fa-phone-alt"></i>';
      case "missed": return '<i class="fas fa-phone-slash"></i>';
    }
  }

  function createCallItem(itemData) {
    $("<div>").addClass("history-item").append(
      $("<img>", {
        draggable: false,
        class: "call-image",
        src: (itemData.imageUrl || DEFAULT_IMAGE_URL),
        alt: `Photo de profil de ${itemData.name || "inconnu.e"}`
      })
    ).append(
      $("<div>").addClass("call-name").text(() => {
        // Get the caller name or its phone number.
        if (itemData.name !== "") return itemData.name;
        return itemData.phone;
      })
    ).append(
      $("<div>").addClass(`call-more-infos ${itemData.type || "missed"}`)
        .append($("<span>", { class: "call-type" }).append(getCallTypeIcon(itemData.type)))
        .append($("<span>", { class: "call-location" }).append(` · ${itemData.location} · `))
        .append($("<span>", { class: "call-date" }).append(getDate(itemData.date)))
    ).appendTo(".history-section");
  }

  function createSection(sectionName) {
    $("<div>").addClass("section-divider")
      .text(sectionName).appendTo(".history-section");
  }

  // Load the history data...
  $.getJSON("data/history.json").done(data => {
    let todayIsOk = false;
    let yesterdayIsOk = false;
    let olderIsOk = false;
    let date, _isToday, _isYesterday

    $.each(data, (index, item) => {
      date = new Date(item.date);
      _isToday = isToday(TODAY, date);
      _isYesterday = isYesterday(TODAY, date);

      if (_isToday && !todayIsOk) {
        createSection("Aujourd'hui");
        todayIsOk = true;
      } else if (_isYesterday && !yesterdayIsOk) {
        createSection("Hier");
        yesterdayIsOk = true;
      } else if (!_isToday && !_isYesterday && !olderIsOk) {
        createSection("Plus anciens");
        olderIsOk = true;
      }
      createCallItem(item);
    });
  }).fail(error => {
    //
  });

  // Active the input when search icon clicked.
  $(".search-container .search-btn").click(() => {
    $(".search-input input").focus();
  });

  // Input section transition on focus.
  $(".search-input input")
    .focus(() => { $(".header").addClass("input-focused"); })
    .focusout(() => { $(".header").removeClass("input-focused"); })
    .keyup(function(event) {
      event.preventDefault();
      let valueToSearch = $(this).val().toLowerCase();

      if (valueToSearch === "") {
        $(".search-result-count").empty().slideUp();
        $(".history-section").removeClass("searching");
      } else {
        $(".search-result-count").slideDown();
        $(".history-section").addClass("searching");
      }

      $(".history-section .history-item").filter(function(){
        let textOfItem = $(this).text().toLowerCase();
        $(this).toggle(textOfItem.indexOf(valueToSearch) > -1);
      });

      let resultCount = $(".history-section .history-item:visible").length;
      if (resultCount === 0) {
        $(".search-result-count").text("Aucun contact trouvé");
      } else {
        $(".search-result-count").text(() => {
          if (resultCount > 1) return `${resultCount} résultats trouvés`;
          return `${resultCount} résultat trouvé`;
        });
      }
    });
});

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

  // Load the history data...
  $.getJSON("data/history.json").done(data => {
    $.each(data, (index, item) => {
      $("<div>").addClass("history-item").append(
        $("<img>", {
          class: "call-image",
          src: (item.imageUrl || DEFAULT_IMAGE_URL),
          alt: `Photo de profil de ${item.name || "inconnu.e"}`
        })
      ).append(
        $("<div>").addClass("call-name").text(() => {
          // Get the caller name or its phone number.
          if (item.name !== "") return item.name;
          return item.phone;
        })
      ).append(
        $("<div>").addClass(`call-more-infos ${item.type || "missed"}`)
          .append($("<span>", { class: "call-type" }).append(getCallTypeIcon(item.type)))
          .append($("<span>", { class: "call-location" }).append(` · ${item.location} · `))
          .append($("<span>", { class: "call-date" }).append(getDate(item.date)))
        ).appendTo(".history-section");
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
    .focusout(() => { $(".header").removeClass("input-focused"); });
});

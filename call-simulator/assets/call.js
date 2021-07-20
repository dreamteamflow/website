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
  // Load the history data...
  $.getJSON("data/history.json").done(data => {
    $.each(data, (index, item) => {
      //
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

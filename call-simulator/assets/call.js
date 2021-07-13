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

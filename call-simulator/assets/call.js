$(document).ready(function() {
  $.getJSON("data/history.json").done(data => {
    $.each(data, (index, item) => {
      //
    });
  }).fail(error => {
    //
  });
});

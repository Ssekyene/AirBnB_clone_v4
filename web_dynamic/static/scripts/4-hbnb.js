$("document").ready(function () {
  const api =
    "http://" + window.location.hostname + ":5001/api/v1/places_search/";

  const url = "http://" + window.location.hostname + ":5001/api/v1/status/";
  $.ajax({
    url: url,
    method: "GET",
    success: function (response) {
      if (response.status === "OK") {
        $("DIV#api_status").addClass("available");
      } else {
        $("DIV#api_status").removeClass("available");
      }
    },
  });

  $.ajax({
    url: api,
    type: "POST",
    data: "{}",
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      return Places(data);
    },
  });

  let amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(":checked")) {
      amenities[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete amenities[$(this).attr("data-id")];
    }
    if (Object.values(amenities).length === 0) {
      $(".amenities H4").html("&nbsp;");
    } else {
      $(".amenities H4").text(Object.values(amenities).join(", "));
    }
  });

  $("BUTTON").click(function () {
    $.ajax({
      url: api,
      type: "POST",
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        $("SECTION.places").empty();
        return Places(data);
      },
    });
  });
});

function Places(data) {
  $("SECTION.places").append(
    data.map((place) => {
      return `<article>
      <div class="headline">
        <h2 class="article_title">${place.name}</h2>
        <div class="price_by_night">&#36;${place.price_by_night}</div>
      </div>

      <div class="information">
        <div class="max_guest">
          <div class="guest_icon"></div>
          <br />${place.max_guest} Guests
        </div>
        <div class="number_rooms">
          <div class="bed_icon"></div>
          <br />${place.number_rooms} Rooms
        </div>
        <div class="number_bathrooms">
          <div class="bath_icon"></div>
          <br />${place.number_bathrooms} Bathrooms
        </div>
      </div>
      <div class="description">${place.description}</div>
    </article>`;
    })
  );
}

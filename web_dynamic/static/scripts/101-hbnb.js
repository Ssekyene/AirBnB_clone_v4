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
      return places(data);
    },
  });

  const states = {};
  $('.locations .states INPUT[type="checkbox"]').change(function () {
    if ($(this).is(":checked")) {
      states[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete states[$(this).attr("data-id")];
    }
    displayLocations(states, cities);
  });

  const cities = {};
  $('.locations .cities INPUT[type="checkbox"]').change(function () {
    if ($(this).is(":checked")) {
      cities[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete cities[$(this).attr("data-id")];
    }
    displayLocations(states, cities);
  });

  const amenities = {};
  $('.amenities INPUT[type="checkbox"]').change(function () {
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
      data: JSON.stringify({
        states: Object.keys(states),
        cities: Object.keys(cities),
        amenities: Object.keys(amenities),
      }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        $("SECTION.places").empty();
        return places(data);
      },
    });
  });

  $(document).on("click", ".rev-show", function () {
    console.log("Clicked!!!");
    const thisrev = $(this).closest(".reviews").find(".review-list");
    if (thisrev.is(":empty")) {
      place_id = $(this).attr("data-id");
      const api_review = "http://" + window.location.hostname + ":5001/api/v1/places/" + place_id + "/reviews";
      $.ajax({
        url: api_review,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          console.log("Ajax!!!");
          // thisrev.empty();
          thisrev.append(
            data.map((review) => {
              return `
            <ul>
              <li>
                  <div class="review_item">
                      <h3>From ${review.user_name} the ${moment(
                  review.updated_at
                ).format("Do MMMM YYYY")}</h3>
                      <p class="review_text">${review.text}</p>
                  </div>
              </li>
            </ul>
            `;
            })
          );
        },
      });
      console.log("After Ajax");
      $(this).text('hide');
    } else {
        thisrev.empty();
        $(this).text('show');
    }
  });
});

function displayLocations(states, cities) {
  const locations = Object.assign({}, states, cities);
  if (Object.values(locations).length === 0) {
    $(".locations H4").html("&nbsp;");
  } else {
    $(".locations H4").text(Object.values(locations).join(", "));
  }
}

function places(data) {
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
          <div class="reviews">
            <div class = "review-head">
                <h2 class="article_subtitle">Reviews</h2>
                <span class ="rev-show" data-id ="${place.id}"> show </span>
            </div>

          <div class="review-list">
            
      </div>
    </article>`;
    })
  );
}

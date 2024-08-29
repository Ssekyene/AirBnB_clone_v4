$('document').ready(function () {
  // toggles the top right circle color for api presence or absence
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.ajax({
    url: url,
    method: 'GET',
    success: function (response) {
      if (response.status === 'OK') {
        $('DIV#api_status').addClass('available');
      }
    },
    error: () => {
      $('DIV#api_status').removeClass('available');
    }
  });

  // displays checked amenities in the amenities filter section
  const amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    if (Object.values(amenities).length === 0) {
      $('.amenities H4').html('&nbsp;');
    } else {
      $('.amenities H4').text(Object.values(amenities).join(', '));
    }
  });
});

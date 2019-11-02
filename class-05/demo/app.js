'use strict';
/*
      {
        "time": 1567072088082,
        "summary": "Mostly cloudy until evening."
      }
 */
function Weather(entry) {
  this.time = new Date(entry.time);
  this.forecast = entry.summary;
  console.log(this);
}

Weather.prototype.render = function() {
  // get the template
  let source = $('#weather-results-template').html();

  // compile the template
  let template = Handlebars.compile(source);

  // return the filled template
  return template(this);

};

function fetchTheWeather(e) {
  e.preventDefault();

  $.get('./weather.json')
  .then(weatherData => {
    weatherData.data.forEach(day => {
      let item = new Weather(day);
      let html = item.render();
      $('#weather-items').append(html);
    })
  });
}

$('form').on('submit', fetchTheWeather);

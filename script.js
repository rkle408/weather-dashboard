// Test connection:
// alert("hello");

// TO DO:
// Need to fetch weather API
// Need to do local storage for user's search history

// link API using
var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&exclude={part}&appid={90f20119a63b80bc6e3ec3b202bae4ee}";

// Fetch API using the browswer fetch method (no need to worry about linking jquery with AJAX)
fetch(openWeatherUrl)
    .then(function (response) {
        return response.json();
      })
      // Need to convert
      .then(function (data) {
        console.log(data)
      });
/*document.addEventListener('DOMContentLoaded', function() {
    alert("Ready!");
}, false);*/


//Global variables
var cTemp = "";
var cityIP = "";
var country = "";
var countryISO2 = "";
var dayType = "";
var winSpd = "";
var winDir = "";
var humid = "";
var sunRiseTime = "";
var sunSetTime = "";
var loc = ["Dubai", "AE"]


//URL variables
var baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";
var unitMTR = "&units=metric";
var callBACK = "&callback=?";
var apID = "&appid=49feecc2cd382186ed0d59d785a42457";
var finalURL = "";





// Get City and Country data from IP address
function getLocation() {


          $.get("https://ipinfo.io", function(response) {

              console.log(response.city, response.country);
              cityIP = response.city;
              countryISO2 = response.country;

          }, "jsonp");
					console.log("CITY  INSIDE - " + response.city);
					console.log("CITY  INSIDE - " + cityIP);
}






/*---------- GET READY ------------------*/

$(document).ready(function(){

	// Get weather data from OpenWeatherMap: https://openweathermap.org
	function getWeather(){

		getLocation();

		console.log("city in gtWthr() before finalURL - " + cityIP);
	  finalURL = baseURL + 'Dubai' + unitMTR + apID + callBACK;
		console.log("finalURL - " + finalURL);

		$.ajax({
		 url: finalURL,
		 data: {
				format: 'json'
		 },
		 error: function(error) {
				//$('#info').html('<p>An error has occurred</p>');
				console.log("ERROR - " + error.message);
		 },
		 dataType: 'jsonp',
		 success: function(data) {
				console.log("SUCCESS");
				console.log(data);

				// load returned weather data to respective variables
				loadWData(data);

		 },
		 type: 'GET'
		});
	}


	// Load weather data for display
	function loadWData (data) {

		cTemp = data.main.temp;
		console.log("Temp - " + cTemp);
		$('#temp').text(cTemp);


		//getLocation();
		$('#city').text(cityIP + ', ' + countryISO2);

		dayType = data.weather[0].main;
		$('#dayType').text(data.weather[0].main);

		winSpd = data.wind.speed;
		winDir = data.wind.deg;
		$('#windSpeed').text(data.wind.speed + ' m/s');
		//$('#windDirection').add(data.wind.deg);

		humid = data.main.humidity;
		$('#humidity').text(data.main.humidity);


		sunRiseTime = getTime(data.sys.sunrise);
		sunSetTime = getTime(data.sys.sunset);
		$('#sunrise').text(sunRiseTime + ' AM');
		$('#sunset').text(sunSetTime + ' PM');
	}



	function getTime(unix_timestamp) {

		// Create a new JavaScript Date object based on the timestamp
		// multiplied by 1000 so that the argument is in milliseconds, not seconds.
		var date = new Date(unix_timestamp*1000);

		// Hours part from the timestamp
		var hours = date.getHours();

		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();

		// Seconds part from the timestamp
		var seconds = "0" + date.getSeconds();

		// Will display time in 10:30  format
		var formattedTime = hours + ':' + minutes.substr(-2);

		return formattedTime;
	}





		getWeather();



});



/*

$.getJSON("http://country.io/names.json");
*/

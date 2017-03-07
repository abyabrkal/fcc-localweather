/*document.addEventListener('DOMContentLoaded', function() {
    alert("Ready!");
}, false);*/



/*---------- GET READY ------------------*/

$(document).ready(function(){
	
	//Global variables
	var cTemp = "";
	var city = "";
	var country = "";
	var countryISO2 = "";
	var dayType = "";
	var winSpd = "";
	var winDir = "";
	var humid = "";
	var sunRiseTime = "";
	var sunSetTime = "";
	
	//URL variables 
	var baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";
	var cityCTRY = city + ',' + countryISO2;
	var unitMTR = "&units=metrics";
	var callBACK = "&callback=WEATHER";
	var apID = "&appid=49feecc2cd382186ed0d59d785a42457";
	var finalURL = baseURL + cityCTRY + unitMTR + apID + callBACK;
	
	getLocation();
	
	getWeather();
	
	// Get City and Country data from IP address 
  function getLocation() {	
	
		
		$.get("https://ipinfo.io", function(response) {

			// console.log(response.city, response.country);
			city = response.city;
			countryISO2 = response.country;

		}, "jsonp")
	}
	
	
	
	// Get weather data from OpenWeatherMap: https://openweathermap.org
	function getWeather(){
	
		$.ajax({
		 finalURL,
		 data: {
				format: 'json'
		 },
		 error: function() {
				$('#info').html('<p>An error has occurred</p>');
		 },
		 dataType: 'jsonp',
		 success: function(data) {
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
		$('#temp').html(data.main.temp);
		
		city = "";
		country = "";
		countryISO2 = "";
		$('#city').html(city + ', ' + countryISO2);
		
		dayType = data.weather[0].main;
		$('#datType').html(data.weather[0].main);
		
		winSpd = data.wind.speed;
		winDir = data.wind.deg;
		$('#windSpeed').html(data.wind.speed + ' m/s');
		$('#windDirection').add(data.wind.deg);
		
		humid = data.main.humidity;
		$('#humidity').html(data.main.humidity);
		
		
		sunRiseTime = getTime(data.sys.sunrise);
		sunSetTime = getTime(data.sys.sunset);
		$('#sunrise').html(sunRiseTime + ' AM');
		$('#sunset').html(sunSetTime + ' PM');
	}
	


	function getTime(unixtime) {

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

	
});



/*

$.getJSON("http://country.io/names.json");
*/



//Global variables for weather programming
var gCity = "";
var gCord = "";
var weatherDb = {};
var isC = "true";

//HTML Nodes
var tempL = "";
var iconL = "";
var conditionTextL = "";
var humidityL = "";
var unitL = "";
var dateL ="";

 

// FUNCTION DEFINITIONS ---***************-----

// Get Date and Greeting
function whatTime() {
	
  // Get Today's Date for Nav display
  var date = new Date();
	
	document.getElementById('today').innerHTML = date.toDateString();
	
	
	// Lets get Greeting
	var greets = "Good Morning";
	
  // Hours part from the timestamp
  var hours = date.getHours();
	
	
	if (hours > 12 && hours < 17) {
    greets = "Good Afternoon";
  }
	else if (hours >= 17 && hours < 24){
		greets = "Good Evening";
	}
	else {
		greets = "Good Morning";
	}

	
	document.getElementById("greeting").innerHTML = greets;
  	
}

function parseWeather(weatherDb){
	
		
	// LOCATION DATA with COUNTRY
	var location = weatherDb.city + ', ' + weatherDb.country;
	document.getElementById('country').innerHTML = location;
	
	
	// WEATHER CONDITION
	document.getElementById('conditionText').innerHTML = weatherDb.conditionText;
	
	//ICON SETUP
	var icon = ("<img class=\"icon\" src='" + weatherDb.icon + "'>");
  document.getElementById('icon').innerHTML = icon;
	
	//TEMPERATURE VALUE - CELSIUS
	document.getElementById('tempC').innerHTML = weatherDb.tempC;
	
	//TEMPERATURE UNIT - FAHRENHEIT
	document.getElementById('tempF').innerHTML = weatherDb.tempF;

}



/* GET WEATHER from API without jQuery */ 
function getWeather(city) {
	
	
	var finalURL = "https://api.apixu.com/v1/current.json?key=7db709020c694a158aa64848170206&q=" + city;
	
	
	var request = new XMLHttpRequest();
	request.open('GET', finalURL, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			// Success!
			var wData = JSON.parse(request.responseText);
			//console.log(wData);
			
			// Store retrieved data in weatherDb global
			weatherDb.tempC = Math.round(wData.current.temp_c);
			weatherDb.tempF = Math.round(wData.current.temp_f);
			weatherDb.city = wData.location.name;
			weatherDb.country = wData.location.country;
			weatherDb.isDay = wData.current.is_day;
			weatherDb.conditionText = wData.current.condition.text;
			weatherDb.icon = wData.current.condition.icon;
			weatherDb.conditionCode = wData.current.condition.code;
			weatherDb.humidity = wData.humidity;
			
			//console.log(weatherDb);
			
			// Load the data to HTML structure
			parseWeather(weatherDb);
			
		} else {
			// We reached our target server, but it returned an error
			console.log("Reached our target server: But, fell down");

		}
	};

	request.onerror = function() {
		// There was a connection error of some sort
		console.log("Connection Error, man!");
	};

	request.send();
 
}



// SET THE CITY TO A GLOBAL VARIABLE 
function setCity(city) {
	
	gCity = city;
	console.log("SETFUNC - " + gCity);
}



/* GET LOCATION from IP */ 
function getLocation() {
	
	var request = new XMLHttpRequest();
	request.open('GET', 'https://ipinfo.io/geo', true);
	//request.open('GET', 'https://ipinfo.io/json', true);

	console.log("LOCATION REQUEST" + request.status); 
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			// Success!
			var data = JSON.parse(request.responseText);
			console.log(data.city, data.loc);
			
			setCity(data.city, data.loc);
			getWeather(data.city);
			
		} else {
			// We reached our target server, but it returned an error
			console.log("Reached our target server: But, Error");

		}
	};

	request.onerror = function() {
		// There was a connection error of some sort
		console.log("Connection Error, man!");
	};

	request.send();
			
}	
	

// GET HTML ELEMENT NODES
window.onload = function () {
	
	tempL = document.getElementById("temperature");
  iconL = document.getElementById("icon");
  humidityL = document.getElementById("humidity");
	locL = document.getElementById("location");
  unitL = document.getElementById("unit");
	

	
	
	getLocation();
	whatTime();
	
	getWeather();
	
	$('.card-wrapper').on('click', function () {
		$('.card').toggleClass('flipped');
		$('.card').removeClass('hover');

		// Set Celsius / Fahrenheit values
		isC = !isC;

		if(isC) {
			 document.getElementById('tempC').innerHTML = weatherDb.tempC;
		} else {
			 document.getElementById('unit').innerHTML = "F";
			 document.getElementById('tempF').innerHTML = weatherDb.tempF;
		} 
		 
	});


	
	
}



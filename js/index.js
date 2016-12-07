
/*temperature conversion functions */

function kToF(k){
  return Math.round(k * 1.8 - 459.67);
}
function fToC(f){
  return Math.round((f - 32) / 1.8);
}
function cToF(c){
  return Math.round(c * 1.8 + 32);
}


/* Handles click on temperature icon */
$("#temp-change").on("click", function(){
  var label = $("#temp-label").text();
  var temp = $("#temp").text();
               
  if (label === " F"){
  $("#temp-label").text(' C');
  $("#temp").text(fToC(temp));  
  }
  else {
  $("#temp-label").text(' F');
  $("#temp").text(cToF(temp));
  }
});

/* Sets the backgound image based on the temperature */
 var setBackground = function(tempInK){
   var temperature = tempInK;
   if(temperature > 302)
      $( "body" ).addClass( "temp-high");
   else if(temperature > 277)
      $( "body" ).addClass( "temp-medium");
   else 
      $( "body" ).addClass( "temp-low");
  }

/* I am not happy with nesting one API call inside another. But I couldnt find any other way to make the longitude and latitude values from ipinfo accesible to complete the URL call openweathermap. Tried putting the json into an object, which console.logged the information but returned undefined when asking for those properties.  */  
 
$.getJSON('http://ipinfo.io', function(data){
  var coords = data.loc.split(",");
  var latitude = coords[0];
  var longitude = coords[1];
     
  $.getJSON(("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude +  "&APPID=cd6894d30cb4741d71bb1d4a52c76224"), function(json) {
  $("#temp").html(kToF(json.main.temp));
  $("#location").html(json.name + ", " + json.sys.country);
  $("#description").html(json.weather[0].main + ", " + json.weather[0].description);
  $("#wind").html("Wind speed: " + json.wind.speed + " mph");
  setBackground(json.main.temp);

 });
});
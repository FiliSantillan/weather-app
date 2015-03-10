(function(){
  var WEATHER_KEY = "39a60f72855a3efdcc6c2d2cdea5210b";
  var WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + WEATHER_KEY + "&";

  if(navigator.geolocation){
    debugger;
    navigator.geolocation.getCurrentPosition(getCoords, errorFound);
  }

  else{
    alert("Por favor actualiza tu navegador");
  };

  function errorFound(error) {
    alert("Un error ocurrio: " + error.code);
    //0: Error desconocido
    //1: Permiso denegado
    //2: Posición no está disponible
    //3: Timeout
  };

  function getCoords(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    $.getJSON(WEATHER_URL + 'lat=' + lat + "&lon=" + lon, getCurrentWeather);
  };
})();
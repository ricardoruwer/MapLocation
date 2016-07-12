# Google Maps: Location Picker
- Built in Vanilla JS.
- Uses Google Maps JS API.

## Instalation

```html
<div id="map" style="height:400px"></div>
<input type="text" id="lat">
<input type="text" id="lng">

<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
<script src="maplocation.js"></script>
<script>
    var maplocation = new MapLocation('#map');
</script>
```
- You can get your API KEY at: https://console.developers.google.com

## Options

```html
<script>
var options = {
  lat: 0, //default latitude
  lng: 0, //default longitude
  scrollwheel: false, //disable zoom when scroll
  zoom: 15,
  title: 'Select the company location.', //the title of marker
  latInput: '#lat', //the input for latitude
  lngInput: '#lng', //the input for longitude
  activator: '#showMap' //default: false
  //to load the map by clicking in a button, useful when you want to load a map inside tabs or modal (initiated hidden)
};

var maplocation = new MapLocation('#map', options);
</script>
```

//
// Streetview Map
//

function svinitialize() {

  console.log('No peaking!');

  //
  // Get Coords
  //
  // Yeah this is a bit gross, right? Why not do it randomly? Because in geoguessr while it was great having random coords, some of the randomized points it picked sucked. I didn't
  // want that at all, thus the manual lat/longs. It's fairly easy to build the random lat long coords based if the selected coords have a street view available
  // however detection for that is a bit CPU intensive. In the mean time, just throw more coords into this array - it ain't that bad!
  //
  var coordArray = ['51.271835, -1.076007', '51.257953, -1.106580', '51.269880, -1.093236', '51.237340, -1.122061','51.258692, -1.103277',
'51.263713, -1.089469','51.264765, -1.089622','51.262448, -1.086966','51.259725, -1.079411','51.266223, -1.076768',
'51.300883, -1.051252','51.262805, -1.125143','51.263263, -1.130701','51.268349, -1.123350','51.272342, -1.113421',
'51.280302, -1.108284','51.280407, -1.119530','51.280527, -1.090657','51.287568, -1.075745','51.292984, -1.068215',
'51.261951, -1.089064','51.263737, -1.088258','51.268290, -1.087165,','51.268908, -1.073335','51.265104, -1.119089',
'51.275919, -1.070751'];
  var randCoord = coordArray[Math.floor(Math.random() * coordArray.length)];
  coordArrayLatLongs = randCoord.replace(/[\])}[{(]/g, '').split(',');

  window.locLL = coordArrayLatLongs[0] + ',' + coordArrayLatLongs[1];

  // Do streetview
  var whoamiLocation = new google.maps.LatLng(coordArrayLatLongs[0], coordArrayLatLongs[1]);
  var streetViewService = new google.maps.StreetViewService();
  var STREETVIEW_MAX_DISTANCE = 100;

  streetViewService.getPanoramaByLocation(whoamiLocation, STREETVIEW_MAX_DISTANCE, function(streetViewPanoramaData, status) {
    if (status === google.maps.StreetViewStatus.OK) {

      // We have a streetview pano for this location, so let's roll
      var panoramaOptions = {
        position: whoamiLocation,
        addressControl: false,
        linksControl: false,
        pov: {
          heading: 270,
          zoom: 1,
          pitch: -10
        },
        visible: true
      };

      var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

    } else {
      // no street view available in this range, or some error occurred
      alert('Streetview is not available for this location :( Mind telling us that you saw this?');
    }
  });
};

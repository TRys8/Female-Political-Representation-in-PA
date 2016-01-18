
window.onload = function() {
  var preloadChecker = setInterval(function() {

    if (g_electionResultsAggregate !== undefined &&
        g_districtCenters !== undefined) {

      clearInterval(preloadChecker);
      initMap();

    }
  }, 1000);
};

var map;
var heatmapLayer;

function initMap() {

  // console.log(g_districtCenters, g_electionResultsAggregate);

  var heatmapPoints = [];

  Object.keys(g_electionResultsAggregate.district).forEach(function(key, index) {
    var womenWins = parseInt(g_electionResultsAggregate.district[key]["Woman"]);
    var latLng = g_districtCenters[key];

    for (var ii = 0; ii < womenWins; ++ii) {
      var randomOffset = Math.random()/10000 * Math.pow(-1, Math.random() >= .5 ? 0 : 1);
      // console.log("Random:", latLng.lat()+randomOffset, latLng.lng()+randomOffset);
      heatmapPoints.push(new google.maps.LatLng(latLng.lat()+randomOffset, latLng.lng()+randomOffset));
    }
  });

  // console.log(heatmapPoints);

  map = new google.maps.Map(document.getElementById("heatmap"), {
    center: {lat: 40.8502839, lng: -77.4526058},
    zoom: 6
  });

  heatmapLayer = new google.maps.visualization.HeatmapLayer({
    data: heatmapPoints,
    map: map,
    radius: 12
  });

  /*heatmapLayer.set('radius', ++heatmapLayer.get('radius'));
  heatmapLayer.set('opacity', ++heatmapLayer.get('opacity'));*/

  /*districtLayer = new geoXML3.parser({
    map: map
  });
  districtLayer.parse('2011-Revised-Final-Plan-House.kml');*/
}

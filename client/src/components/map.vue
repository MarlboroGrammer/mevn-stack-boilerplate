
<template>

<div>
    <h1 align="center">Votre Carte </h1>
 <div class="google-map" :id="mapName">    
     </div> 
 </div>
</template>


<script>
var markercoordinates=[];
export default {
  name: 'myMap',
  props: ['name'],
  data: function () {
    return {
      mapName: "myMap",
       

    }
  },
  methods: {
      async initialiseMap(){
				const element = document.getElementById(this.mapName);
				if (navigator.geolocation) {
				  navigator.geolocation.getCurrentPosition(showPosition, error);
				}
				else {
				  latitudeAndLongitude.innerHTML = "Geolocation is not supported by this browser.";
				}


				function showPosition(position) {
				  
				  const myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				  const options = {
					zoom: 10,
					center: myPosition
				  }

				  const map = new google.maps.Map(element, options);
				  var myMarker = new google.maps.Marker({
					position: myPosition,
					map: map,
					draggable: true,
					animation: google.maps.Animation.BOUNCE,
					content: contentString
				  });
				  var contentString = '<h1>Your position</h1>';

				  var infowindow = new google.maps.InfoWindow({
					content: contentString
                  });
                  markercoordinates= [{
                      desc:"c'est la desc 1",
                      name:"pharm1",
      latitude: 36.942903,
      longitude: 10.189771
    }, {
        desc:"c'est la desc 2",
        name:"pharm2",
      latitude: 36.876862,
      longitude: 10.1782931
    }, {
        desc:"c'est la desc 3",
        name:"pharm3",
      latitude: 36.8918913,
      longitude: 10.1411492
    }]
                  
             
             markercoordinates.forEach((agence) => {
                          var infowindow = new google.maps.InfoWindow({
                    content: agence.desc
                    });
            const position = new google.maps.LatLng(agence.latitude, agence.longitude);
            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            const markerAgencies = new google.maps.Marker({
              position,
              map: map,
              icon: image,
              title: agence.name
              
            });
             markerAgencies.addListener('click', function() {
          infowindow.open(map, markerAgencies);
        });
                  })

				}
				function error() {
				  console.log("Error");
				}
    },
    
},
  mounted: function () {
   /* const element = document.getElementById(this.mapName)
    const options = {
      zoom: 11,
      center: new google.maps.LatLng(36.942903,10.189771)
    }
    const map = new google.maps.Map(element, options);

    this.markerCoordinates.forEach((coord) => {
  const position = new google.maps.LatLng(coord.latitude, coord.longitude);
  const marker = new google.maps.Marker({ 
    position,
    map
  });
});
*/
this.initialiseMap();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.google-map {
  width: 600px;
  height: 400px;
  margin: 5% 30% 10% 30%;
  background: gray;
}
</style>

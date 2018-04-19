
<template>

<div style="backgdound-color:white;" class="container">
    <div>
      <h3>Choisir de voir les:</h3> </br>
          <input type="radio"  v-model="type" value="docteur" name="R" @click="Trier('Docteur')"> Docteurs </br>
          <input type="radio"  v-model="type" value="pharmacien" name="R" @click="Trier('Pharmacien')"> Pharmaciens </br>
          <input type="radio"  v-model="type" value="hospital" name="R" @click="Trier('Hospital')" > Hôpitaux </br>
          <input type="radio"  v-model="type" value="clinique" name="R" @click="Trier('Clinique')">  Clinique </br>
          <input type="radio"  v-model="type" value="visites" name="R" @click="Visite()">  Mes visites quotidienne: </br>

    </div>
    <h1 align="center" style="padding-top:10px;">Votre Carte </h1>
      <div class="google-map" :id="mapName">    
      </div> 
      
 </div>
</template>


<script>
import ClientService from '@/services/ClientService'
import VisitService from '@/services/VisitService'

var markercoordinates=[];

function dateFilter (date1, date2, operand) {
                switch (operand) {
                  case 'GE':
                    return date1.getDay() >= date2.getDay() &&
                    date1.getMonth() >= date2.getMonth() &&
                    date1.getYear() >= date2.getYear()
                  case 'LT':
                    return date1.getDay() <= date2.getDay() &&
                    date1.getMonth() <= date2.getMonth() &&
                    date1.getYear() <= date2.getYear()
                  case 'EQ':
                    return date1.getDay() === date2.getDay() &&
                    date1.getMonth() === date2.getMonth() &&
                    date1.getYear() === date2.getYear()
                  default:
                    throw Error('operand is either GE or LT!')
                }
     }
    

export default {
  name: 'myMap',
  props: ['name'],
  data: function () {
    return {
      mapName: "myMap",
       clients: [],
       visites:[],
       type :""
       

    }
  },
  methods: {
    async Trier(type1) {  
       console.log(type1);

const response = await ClientService.getClient()
        var clients = response.data.clients;

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
                                  
             
             clients.forEach((client) => 
            {   
              
                if (type1 == client.type)
                   {
                      var infowindow = new google.maps.InfoWindow({
                      content: "Nom: "+client.name +" </br> Num Tel: "+ client.phoneNumber +"  </br> Email: "+ client.email
                      });
                      const position = new google.maps.LatLng(client.lat, client.lng);
                      var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                      const markerAgencies = new google.maps.Marker({
                        position,
                        map: map,
                        icon: image,
                        title: client.name
                        
                      });
                    markerAgencies.addListener('click', function()
                    {
                    infowindow.open(map, markerAgencies);
                    });
                  }
          })

				}
				function error() {
				  console.log("Error");
				}




    },
  async Visite(){

      const response = await VisitService.getVisits()
      var visites = response.data;
    

      
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
                                  
             
             visites.forEach((client) => 
            {                 
               

            
              
            if (dateFilter(new Date() , new Date (client.start_date),"EQ"))
               {
                      var infowindow = new google.maps.InfoWindow({
                      content: "Description: "+client.text                       });
                      const position = new google.maps.LatLng(client.lat, client.lng);
                      var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                      const markerAgencies = new google.maps.Marker({
                        position,
                        map: map,
                        icon: image,
                        title: client.text
                        
                      });
                    markerAgencies.addListener('click', function()
                    {
                    infowindow.open(map, markerAgencies);
                    });
                  }
          })
          
				}
				function error() {
				  console.log("Error");
				}

    }, 
      async initialiseMap(){
        const response = await ClientService.getClient()
        var clients = response.data.clients;

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
                  
                  clients.forEach((client)=>{

                    console.log(client.name);
                  })
                  
                  
                  
             
             clients.forEach((client) => {
                    var infowindow = new google.maps.InfoWindow({
                   content: "Nom: "+client.name +" </br> Num Tel: "+ client.phoneNumber +"  </br> Email: "+ client.email
                    });
            const position = new google.maps.LatLng(client.lat, client.lng);
            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            const markerAgencies = new google.maps.Marker({
              position,
              map: map,
              icon: image,
              title: client.name
              
            });
             markerAgencies.addListener('click', function() {
          infowindow.open(map, markerAgencies);
        });
                  })

				}
				function error() {
				  console.log("Error");
				}
    }
     
},
  mounted: function () {

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


<template>

<div style="backgdound-color:white;  margin-left:5%; margin-right:5%"   >
    <div style="margin:5% 20% 5% 20%; " >
      <h3>Choisir de voir les:</h3> </br>

                <div class="btn-group" center> 
                <button @click="initialiseMap()" class="btn btn-primary" id="btn-t">Tout voir</button> 
                <button @click="Trier('Docteur')" class="btn btn-primary " id="btn-d"> Docteurs </button> 
                <button @click="Trier('Pharmacien')" class="btn btn-primary" id="btn-p">Pharmaciens</button> 
                 <button @click="Trier('Hospital')" class="btn btn-primary" id="btn-h"> Hôpitaux </button> 
                <button @click="Trier('Clinique')" class="btn btn-primary" id="btn-c">Cliniques</button> 
                <button @click="Visite('visite')" class="btn btn-primary" id="btn-v">Visites quotidiennes</button> 
                
                </div>

         

    </div>
    <div class="row" style="background-color:#fff; ">
      <div class="col-sm-6" style="margin-left:0px; padding-left:0px;">

            <table id="example"  class="table table-striped"  >
            <thead>
                <tr>
                  <th> # </th>
                    <th>Débute le</th>
                    <th>Fini le</th>
                    <th>Adresse</th>
                    <th>statut</th>
                    <th>Visite d'un(e)</th>
                    <th>Distance (Kilométres)</th>
                    
                </tr>
            </thead>
            <tbody>
            <tr></tr>

            <tr  v-if="vide" >
                <td colspan="6" >Pas de visite pour aujourd'hui</td>
            </tr>
            
              <tr  v-for="(v,index) in visiteDuJour"  :key="visite">
              <td> {{index+1}} </td>
              <td> {{v.start_date}} </td>
              <td> {{v.end_date}} </td>
              <td> {{v.Adresse}} </td>
              <td> {{v.status}} </td>
              <td> {{v.visitType}} </td>      
              <td> {{v.dist}} </td>        
            </tr>

            </tbody>
        </table>
      </div>
      <div class="col-sm-6"  >
      <div class="google-map" :id="mapName" style="margin-right:5%; margin-left:0%;">    
        </div>
      </div>
      </div>     
 </div>
</template>


<script>
import ClientService from '@/services/ClientService'
import VisitService from '@/services/VisitService'

var mylat=0;
var mylng=0;


function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}
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
       visiteDuJour:[],
       dists:[],
       type :"",
       vide :true,
   
       

    }
  },
  methods: {

    async visitejour(){


      const response = await VisitService.getVisits()
            var visites = response.data;

       visites.forEach((v) => 
            {        
            if (dateFilter(new Date() , new Date (v.start_date),"EQ"))
               {
               
                /*  d = distance(position.coords.latitude,position.coords.longitude,v.lat,v.lng ,"k"); */
               
                navigator.geolocation.getCurrentPosition(function (position) {
 
                        mylat = position.coords.latitude;
                        mylng = position.coords.longitude;
                      
                        
                    });
                    
                 var d = distance(mylat,mylng,v.lat,v.lng ,"K"); 
                 console.log(mylat)
                 var vis = {"start_date":v.start_date,"end_date":v.end_date,"Adresse":v.Adresse,"status":v.status,"visitType":v.visitType}
                  
                 this.visiteDuJour.push(vis);
                 this.vide= false;
                
               }
            })

     
    },
    
    async Trier(type1) {  
       console.log(type1);
       switch (type1) {
         case 'Docteur':
         
         $('#btn-d').removeClass('btn-primary')
         $('#btn-d').addClass('btn-danger')
          $('#btn-d').prop('disabled',true)

         $('#btn-p').removeClass('btn-danger')
          $('#btn-p').addClass('btn-primary')
           $('#btn-p').prop('disabled',false)

         $('#btn-h').removeClass('btn-danger')
          $('#btn-h').addClass('btn-primary')
           $('#btn-h').prop('disabled',false)

         $('#btn-c').removeClass('btn-danger')
          $('#btn-c').addClass('btn-primary')
           $('#btn-c').prop('disabled',false)

         $('#btn-v').removeClass('btn-danger')
          $('#btn-v').addClass('btn-primary')
           $('#btn-v').prop('disabled',false)

         $('#btn-t').removeClass('btn-danger')
          $('#btn-t').addClass('btn-primary')
           $('#btn-t').prop('disabled',false)
         
         break;
           case 'Pharmacien':
         
          $('#btn-p').removeClass('btn-primary')
         $('#btn-p').addClass('btn-danger')
          $('#btn-p').prop('disabled',true)

         $('#btn-d').removeClass('btn-danger')
          $('#btn-d').addClass('btn-primary')
           $('#btn-d').prop('disabled',false)

         $('#btn-h').removeClass('btn-danger')
          $('#btn-h').addClass('btn-primary')
           $('#btn-h').prop('disabled',false)

         $('#btn-c').removeClass('btn-danger')
          $('#btn-c').addClass('btn-primary')
           $('#btn-c').prop('disabled',false)

         $('#btn-v').removeClass('btn-danger')
          $('#btn-v').addClass('btn-primary')
           $('#btn-v').prop('disabled',false)

         $('#btn-t').removeClass('btn-danger')
          $('#btn-t').addClass('btn-primary')
           $('#btn-t').prop('disabled',false)
         
         break;
         case 'Hospital':
        
           $('#btn-h').removeClass('btn-primary')
         $('#btn-h').addClass('btn-danger')
          $('#btn-h').prop('disabled',true)

         $('#btn-p').removeClass('btn-danger')
          $('#btn-p').addClass('btn-primary')
           $('#btn-p').prop('disabled',false)

         $('#btn-d').removeClass('btn-danger')
          $('#btn-d').addClass('btn-primary')
           $('#btn-d').prop('disabled',false)

         $('#btn-c').removeClass('btn-danger')
          $('#btn-c').addClass('btn-primary')
           $('#btn-c').prop('disabled',false)

         $('#btn-v').removeClass('btn-danger')
          $('#btn-v').addClass('btn-primary')
           $('#btn-v').prop('disabled',false)

         $('#btn-t').removeClass('btn-danger')
          $('#btn-t').addClass('btn-primary')
           $('#btn-t').prop('disabled',false)
         
         break;
         case 'Clinique':
         
           $('#btn-c').removeClass('btn-primary')
         $('#btn-c').addClass('btn-danger')
          $('#btn-c').prop('disabled',true)

         $('#btn-p').removeClass('btn-danger')
          $('#btn-p').addClass('btn-primary')
           $('#btn-p').prop('disabled',false)

         $('#btn-h').removeClass('btn-danger')
          $('#btn-h').addClass('btn-primary')
           $('#btn-h').prop('disabled',false)

         $('#btn-d').removeClass('btn-danger')
          $('#btn-d').addClass('btn-primary')
           $('#btn-d').prop('disabled',false)

         $('#btn-v').removeClass('btn-danger')
          $('#btn-v').addClass('btn-primary')
           $('#btn-v').prop('disabled',false)

         $('#btn-t').removeClass('btn-danger')
          $('#btn-t').addClass('btn-primary')
           $('#btn-t').prop('disabled',false)
         
       
         
       }
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
  async Visite(type1){

      const response = await VisitService.getVisits()
      var visites = response.data;
    
     switch (type1) {
         case 'visite':
          $('#btn-v').removeClass('btn-primary')
         $('#btn-v').addClass('btn-danger')
          $('#btn-v').prop('disabled',true)

         $('#btn-p').removeClass('btn-danger')
          $('#btn-p').addClass('btn-primary')
           $('#btn-p').prop('disabled',false)

         $('#btn-d').removeClass('btn-danger')
          $('#btn-d').addClass('btn-primary')
           $('#btn-d').prop('disabled',false)
           
         $('#btn-c').removeClass('btn-danger')
          $('#btn-c').addClass('btn-primary')
           $('#btn-c').prop('disabled',false)
           
         $('#btn-h').removeClass('btn-danger')
          $('#btn-h').addClass('btn-primary')
           $('#btn-h').prop('disabled',false)

         $('#btn-t').removeClass('btn-danger')
          $('#btn-t').addClass('btn-primary')
           $('#btn-t').prop('disabled',false)
         
         break;
     }
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
                      content: "Description: "+client.text                       
                      });
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
        const response1 = await VisitService.getVisits()
        var visi = response1.data;
        var visitJ =[]
        var type1="tout";
          
          switch (type1) {
         case 'tout':
            $('#btn-t').removeClass('btn-primary')
         $('#btn-t').addClass('btn-danger')
          $('#btn-t').prop('disabled',true)

         $('#btn-p').removeClass('btn-danger')
          $('#btn-p').addClass('btn-primary')
           $('#btn-p').prop('disabled',false)

         $('#btn-d').removeClass('btn-danger')
          $('#btn-d').addClass('btn-primary')
           $('#btn-d').prop('disabled',false)

         $('#btn-c').removeClass('btn-danger')
          $('#btn-c').addClass('btn-primary')
           $('#btn-c').prop('disabled',false)

         $('#btn-v').removeClass('btn-danger')
          $('#btn-v').addClass('btn-primary')
           $('#btn-v').prop('disabled',false)

         $('#btn-h').removeClass('btn-danger')
          $('#btn-h').addClass('btn-primary')
           $('#btn-h').prop('disabled',false)
         
         break;
           }

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
         
          
         /*  visi.forEach((v)=>{
              
            if (dateFilter(new Date() , new Date (v.start_date),"EQ"))
               {
              
                var  d = distance(position.coords.latitude,position.coords.longitude,v.lat,v.lng ,"k");
                var vis = {"start_date":v.start_date,"end_date":v.end_date,"Adresse":v.Adresse,"status":v.status,"visitType":v.visitType,"dist":d}
                visitJ.push(vis);  
                
                                     
            }
           }) */


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
                  
                  
                  
         /*******************************  dist = distance(position.coords.latitude,position.coords.longitude,) */
                
                  
             
             clients.forEach((client) => {
                    var infowindow = new google.maps.InfoWindow({
                   content: "Nom: "+client.name +" </br> Num Tel: "+ client.phoneNumber +"  </br> Email: "+ client.email
                    });
            const position = new google.maps.LatLng(client.lat, client.lng);
                var icone = {
                url: "client/src/components/img/pharma.png", // url
                scaledSize: new google.maps.Size(50, 50), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };
            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            const markerAgencies = new google.maps.Marker({
              position,
              map: map,
              icon:image,
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
     
}, updated : function(){
        $('#example').DataTable();
  },
  mounted: function () {


        var type1="tout";          
          switch (type1) {
         case 'tout':
            $('#btn-t').removeClass('btn-primary')
         $('#btn-t').addClass('btn-danger')
         $('#btn-p').removeClass('btn-danger')
          $('#btn-p').addClass('btn-primary')
         $('#btn-d').removeClass('btn-danger')
          $('#btn-d').addClass('btn-primary')
         $('#btn-c').removeClass('btn-danger')
          $('#btn-c').addClass('btn-primary')
         $('#btn-v').removeClass('btn-danger')
          $('#btn-v').addClass('btn-primary')
         $('#btn-h').removeClass('btn-danger')
          $('#btn-h').addClass('btn-primary')
         
         break;
           }

            

    this.visitejour();
    this.initialiseMap();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn:active {
    color: #fff;
    background-color: rgb(10, 69, 121);
    border-color: rgb(10, 69, 121);
}
.google-map {
  width: 600px;
  height: 400px;
  margin: 5% 30% 10% 30%;
  background: gray;
}
</style>

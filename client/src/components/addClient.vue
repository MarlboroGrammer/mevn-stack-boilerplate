<template>

  <div class="container" style="background-color:white">
    
    <h1 align="center" style="padding-top:50px;padding-bottom:50px;">Ajouter un nouveau client</h1>
    <div class="form-group">
      <input type="text" name="name" placeholder="Nom du client" class="form-control" v-model="name" required>
    </div>

    <div class="form-group">
         <p style="font-size:15px;"><b> Choisir le type :</b></p>
        <select v-model="type" placeholder="Choisir le type du client"  class="form-control" required>
      
        <option value="#" disabled selected>Choisir le type</option>
        <option value="Docteur">Docteur</option>
        <option value="Pharmacien">Pharmacien</option>
        <option value="Hospital">Hospital</option>
        <option value="Clinique">Clinique</option>
        </select>
    </div>
    <div class="form-group">
      <input type="text" name="email" placeholder="Email du client" class="form-control" v-model="email" required>
    </div>
    <div class="form-group">
      <input type="number" name="phoneNumber" placeholder="Num Tel du client" class="form-control" v-model="phoneNumber" required>
    </div>
    <div class="form-group">
        <fieldset>
            <legend>Adresse</legend>
            
         <vue-google-autocomplete :country="['tn']"
            ref="city"
            id="map"
            classname="form-control"
            placeholder="Ville"
            v-on:placechanged="getAddressData"
        >
        </vue-google-autocomplete>
        <input type="text" name="street" placeholder="Rue" class="form-control" v-model="street" required>
        <input type="text" name="postalCode" placeholder="Code postale" class="form-control" v-model="postalCode" required>
        </fieldset>
    </div>
    <div class="form-group">
      <button @click="addClient" class="btn btn-primary">Ajouter</button>
    </div>
  </div>
</template>


<script>
import ClientService from '@/services/ClientService'
import VueGoogleAutocomplete from 'vue-google-autocomplete'


export default {
  components: { VueGoogleAutocomplete },
  name: 'addClient',
  data () {
    return {
       name: '',
        email:'',
        type: '',
        phoneNumber:'',
        city:'',
        postalCode:'',
        street:''   
    }
  },
  methods: {
    async addClient () {
      const response = await ClientService.addClient({
        name: this.name,
        email: this.email,
        type: this.type,
        phoneNumber: this.phoneNumber,
        city:this.city,
        postalCode:this.postalCode,
        street:this.street    
      })
      this.$router.push({name: 'listeClient'})
      console.log(response)
    },
     getAddressData: function (addressData, placeResultData, id) {
                this.city = placeResultData.formatted_address
                console.log(this.city)
               
            }
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>


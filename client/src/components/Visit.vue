<!-- eslint-disable -->
<template>
  <div class="container" style="background-color:white">
    <h1>Visit Form</h1>
    <div class="form-group">
    <label> Description </label>
      <textarea v-model="text" class="form-control" placeholder="Write here"></textarea>
    </div>
    <div class="form-group">
    <label> Address </label>
     <vue-google-autocomplete :country="['tn']"
            ref="address"
            id="map"
            classname="form-control"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
        >
        </vue-google-autocomplete>
     </div>
    <div class="form-group">
      <label> Type </label>
      <select class="form-control" v-model="visitType">
      <option disabled value="">Choisissez</option>
      <option>Pharmacist</option>
      <option>Doctor</option>
      <option>Wholesaler</option>
      </select>
    </div>

     <div class="form-group">
     <label> Start Date </label>
      <input type="datetime-local" name="start_date"  class="form-control" v-model="start_date" required>
    </div>

     <div class="form-group">
     <label> End Date </label>
      <input type="datetime-local" name="end_date"  class="form-control" v-model="end_date" required>
    </div>

    <div class="form-group">
      <button @click="insert" class="btn btn-success">Valider</button>
      <button @click="CancelVisit" class="btn btn-primary">Cancel</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VisitService from '@/services/VisitService'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  components: { VueGoogleAutocomplete },
  name: 'Visit',
  data () {
    return {
      text: '',
      status: 'Not done',
      start_date: null,
      end_date: null,
      visits: [],
      visitType: '',
      address: ''
    }
  },
    mounted() {
            // To demonstrate functionality of exposed component functions
            // Here we make focus on the user input
            this.$refs.address.focus();
        },

  methods: {
    async insert () {
      console.log(this.start_date)
      if (this.start_date <this.end_date && this.type!="" && this.text!="" && this.address!="")
      {
       const response = await VisitService.insert({
        text: this.text,
        status: this.status,
        start_date: this.start_date,
        end_date: this.end_date,
        visitType: this.visitType,
        Adresse: this.address
      })
      this.$notify({
       group: 'foo',
       title: 'Pharmakeys Notification',
      text: 'Visit saved in database',
      duration: 5000,
      type: 'success '
        });
       this.$router.push({name: 'Delegate'})
      }
      else
 
      {
        if (this.type=="")
        {
         this.$notify({
       group: 'foo',
       title: 'Pharmakeys Notification',
       text: 'Must pick a type for the visit',
       duration: 5000,
       type: 'error'
        });
        }
        if (this.text=="")
        {
           this.$notify({
       group: 'foo',
       title: 'Pharmakeys Notification',
       text: 'Must write a description for the visit',
       duration: 5000,
       type: 'error'
        });

        }
        if (this.address=="")
        {
              this.$notify({
       group: 'foo',
       title: 'Pharmakeys Notification',
       text: 'Address is not valid',
       duration: 5000,
       type: 'error'
        });

        }
        if (this.start_date >this.end_date)
        {
             this.$notify({
       group: 'foo',
       title: 'Pharmakeys Notification',
       text: 'Date invalide',
       duration: 5000,
       type: 'error'
        });

        }
     
       
      }
   
    },

    async CancelVisit()
    {
      this.text="";
      this.start_date="";
      this.end_date="";
      this.visitType="";

    },
    getAddressData: function (addressData, placeResultData, id) {
                this.address = placeResultData.formatted_address
                console.log(this.address)
               
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

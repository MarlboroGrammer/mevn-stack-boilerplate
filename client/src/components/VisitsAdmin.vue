<!-- eslint-disable -->
<template>
  <div class="container"> 
  <h1> Visits Management </h1>
  <br>
  <table id="example"  class="table table-striped" style="width:100%">
        <thead>
            <tr>
                <th> # </th>
                <th>Text</th>
                <th>Start-Date</th>
                <th>End-Date</th>
                <th>Status</th>
                <th>Type </th>
                <th> Adresse </th>
                <th>Actions </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in visits">
                <td> {{index}} </td>
                <td>
                <input v-if="update" v-model="item.text" class="form-control">  </input>
                <span v-else>  {{item.text}}  </span>
                <td>
                  <input type="datetime-local" v-if="update" v-model="item.start_date" class="form-control">  </input>
                 <span v-else>  {{ item.start_date }}  </span>
                </td>
                <td>
                  <input type="datetime-local" v-if="update" v-model="item.end_date" class="form-control">  </input>
                 <span v-else>  {{ item.end_date }}  </span>
                </td>
                <td>
                    <select v-if="update" class="form-control" v-model="item.status">
                    <option disabled value="">Choisissez</option>
                    <option>Done</option>
                    </select>
                 <span v-else>  {{ item.status }}  </span>
                 </td>
                <td> 
                 <select v-if="update" class="form-control" v-model="item.visitType">
                    <option disabled value="">Choisissez</option>
                    <option>Pharmacist</option>
                    <option>Doctor</option>
                    <option>Wholesaler</option>
                    </select>
                <span v-else>  {{ item.visitType}} </span>
                </td>
                  <td> 
                <input type="text" v-if="update" v-model="item.Adresse" class="form-control">  </input>
                <span v-else>  {{ item.Adresse}} </span>
                </td>
                <td>
                <div v-if="!update"  class="btn-group">
                <button @click="modifyToogle()" class="btn btn-primary">Modify</button>
                <button @click="DeleteVisits(item)" class="btn btn-danger">Delete</button>  
                </div>
                <div class="btn-group" v-else> 
                <button @click="updateVisit(item)" class="btn btn-primary"> Update Visit </button> 
                <button @click="modifyToogle()" class="btn btn-default">Cancel</button> 
                </div>
                </td>
            </tr>      
        </tbody>
    </table>
    <p class="lead">Here's a list of all your Visits.  
    <button @click="InsertVisit()" class="btn btn-primary">  
    Add a new one?  </button>  
    </p>
  </div>
</template>

<script>
/* eslint-disable */
import VisitService from '@/services/VisitService'
import VuejsDialog from "vuejs-dialog"


export default {
  name: 'VisitAdmin',
  data () {
    return {
      visits: [],
      update : false,
      address: ''
    }
  },
  methods: {
      DeleteVisits (item) {
     this.$dialog.confirm("If you delete this record, it'll be gone forever.", {
    loader: true 
})
    .then((dialog) => {
       const response = VisitService.deleteVisits(item)
         var index = this.visits.indexOf(item); 
         this.visits.splice(index, 1);
        setTimeout(() => {
            console.log('Delete action completed ');
            dialog.close();
        }, 2500);
 
    })
    .catch(() => {
        // Triggered when cancel button is clicked
        console.log('Delete aborted');
    });
      
    },
    async modifyToogle () {
        this.update=!this.update   
    },

    async updateVisit (item) { 
        console.log(item._id)
        if (this.address!='')
        {
         item.Adresse=this.address
        }
        
          const response = await VisitService.putVisits(item);
          this.update=false;
          let index=this.visits.indexOf(item);
          this.visits.splice(index,1,item);
          this.address=''
    },
    async InsertVisit()
    {
       this.$router.push({name: 'Visits'})
    },
  },
  mounted () {

    const response = VisitService.getVisits()
    .then(response => {
      this.visits = response.data
    })
    .catch(e => {
      this.errors.push(e)     
    })
    },
  updated : function()
  {
   $('#example').DataTable();
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

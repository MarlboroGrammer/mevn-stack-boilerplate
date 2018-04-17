<template>
  <div class="container"> 
  <h1 align="center"> Liste des clients </h1>
  <br>
  <table id="example"  class="table table-striped" style="width:100%">
        <thead>
            <tr>
               <th> # </th>
                <th width="250" style="padding-left:20px;">Nom</th>
                <th width="120" style="padding-left:20px;">Email</th>
                <th >Type</th>
                <th width="250" style="padding-left:20px;">N° Tel</th>
                <th width="150" style="padding-left:20px;">Ville</th>
                <th width="250" style="padding-left:20px;" >Rue</th>
                <th >Code postale</th>
                <th width="250" style="padding-left:20px;" align="center">Action</th>
            </tr>
        </thead>
      <tbody>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr v-for="(client,index) in clients" :key="client">
            <td> {{index+1}} </td>
            <td>
                <input v-if="update" v-model="client.name" class="form-control" style="width:120px;" required>  
                <span v-else>  {{client.name}}  </span>
            </td>
            <td>
              <input v-if="update" v-model="client.email" class="form-control" style="width:120px;" required>  
              <span v-else>  {{client.email}}  </span>          
            </td>
            <td>
              <select v-if="update" v-model="client.type" placeholder="Choisir le type du client" required>
                <option value="Docteur">Docteur</option>
                <option value="Pharmacien">Pharmacien</option>
                <option value="Hospital">Hospital</option>
                <option value="Clinique">Clinique</option>
               </select> 
                <span v-else>  {{client.type}}  </span>
            </td>
            <td>
                <input v-if="update" type="number" v-model=" client.phoneNumber" class="form-control" style="width:100px;" required>  
                <span v-else>  {{ client.phoneNumber}}  </span>
            </td>
            <td v-if="client.address!==undefined" >
               <input v-if="update" v-model=" client.address.city" class="form-control" style="width:100px;" required>  
               <span v-else>  {{ client.address.city }}  </span>
            </td>
            <td v-else>Not set</td>
            <td v-if="client.address!==undefined">
                <input v-if="update" v-model="  client.address.street" class="form-control" style="width:150px;" required>  
                <span v-else style="padding-right:120px;">  {{  client.address.street }}  </span>
            </td>
            <td v-else>Not set</td>
            <td v-if="client.address!==undefined" >
                <input type="number" v-if="update" v-model="  client.address.postalCode" class="form-control" style="width:80px;" required>  
                <span v-else >  {{  client.address.postalCode }}  </span>
            </td>   
            <td v-else>Not set</td>       
            <td align="center" style="padding-left:20px; width:500px;">
              <div v-if="!update"  class="btn-group">
                <button @click="modifyToogle()" class="btn btn-primary" > Mettre à jour</button>
                <button @click="deleteClient(client)" class="btn btn-danger" >Supprimer</button> 
                </div>
                <div class="btn-group" v-else> 
                <button @click="updateClient(client)" class="btn btn-primary"> Valider </button> 
                <button @click="modifyToogle()" class="btn btn-default">Annuler</button> 
                </div>
            </td>
        </tr>
        </tbody>
    </table>
    <div>
    <p class="lead">Ajouter un Nouveau client<br>
    <router-link  v-bind:to="{ name: 'addClient' }" class="btn btn-primary">Ajouter un client</router-link> 
    
    </p>
    </div>
  </div>
</template>

<script>
import ClientService from '@/services/ClientService'
import VuejsDialog from "vuejs-dialog"

export default {
  name: 'clients',
  data () {
    return {
      clients: [],
       update : false
    }
  },
  mounted () {
    this.getClient()
  },
    
  methods: {
    async getClient() {
      const response = await ClientService.getClient()
      this.clients = response.data.clients
    },
    async deleteClient(client) {
       this.$dialog.confirm('Confirmer la suppression ?')
        .then((dialog) => {
         const response = ClientService.deleteClient(client._id)
         var index = this.clients.indexOf(client); 
         this.clients.splice(index, 1)
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
 async updateClient (client) { 
        console.log(client._id)
               
          const response = await ClientService.putClient(client);
          this.update=false;
          this.name=client.name;
    },
    async modifyToogle () {
        this.update=!this.update;
     
    }
},
    updated : function(){
        $('#example').DataTable();
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
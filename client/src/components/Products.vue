<!-- eslint-disable -->
<template>
  <div class="container"> 
  <h1> Gestion des produits</h1>
  
  <br>
  <table id="example"  class="table table-striped" style="width:100%">
        <thead>
            <tr>
                <th> # </th>
                <th>Nom</th>
                <th>Instructions</th>
                <th>Type</th>                
                <th>Prix unitaire </th>
                <th>Posologie</th>
                <th>Photo</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in products">
                <td> {{index}} </td>
                <td>
                <input v-if="update" v-model="item.name" class="form-control">  </input>
                <span v-else>  {{item.name}}  </span>
                <td>
                  <input  v-if="update" v-model="item.instructions" class="form-control">  </input>
                 <span v-else>  {{ item.instructions }}  </span>
                </td>
                 
                 <select v-if="update" class="form-control" v-model="item.form">
                    <option disabled value="">Choisissez</option>
                     <option>Géllule</option>
                      <option>Sirop</option>
                      <option>Comprimés</option>
                     <option>Paumade</option>
                     <option>Goutelettes</option>
                  </select>
                <span v-else>  {{ item.form}} </span>
                </td>
                <td>
                  <input  type="number" v-if="update" v-model="item.sampleValue" class="form-control">  </input>
                 <span v-else>  {{ item.sampleValue }}  </span>
                </td>
                  <td> 
                <input type="text" v-if="update" v-model="item.posology" class="form-control">  </input>
                <span v-else>  {{ item.posology}} </span>
                </td>
                
                <td> 
                   <!--  <img src="..\..\..\server\src\uploads\"+{{item.name}}+".png" alt={{item.name}} > -->
                   <img src="..\..\..\server\src\uploads\Maxilase.jpg"  >
                   
                   <img id="image">
                </td>
                <td>
                <div v-if="!update"  class="btn-group">
                <button @click="modifyToogle()" class="btn btn-primary">Modifier</button>
                <button @click="DeleteProducts(item)" class="btn btn-danger">Supprimer</button>  
                </div>
                
                <div class="btn-group" v-else> 
                <button @click="updateProduct(item)" class="btn btn-primary"> Modifier </button> 
                <button @click="modifyToogle()" class="btn btn-default">Annuler</button> 
                </div>
                </td>
            </tr>      
        </tbody>
    </table>
    <p class="lead">Liste des produits 
    <button @click="InsertProduct()" class="btn btn-primary"> Ajouter un nouveau produit  </button>  
    </p>
  </div>
</template>

<script>
/* eslint-disable */
import ProductService from '@/services/ProductService'

export default {
  name: 'Products',
  data () {
    return {
      products: [],
      update: false,
      address: ''
    }
  },
  methods: {
    DeleteProducts (item) {
        this.$dialog.confirm('Cette action est définitive! Etes-vous sur de vouloir supprimer?', {
          loader: true
        })
        .then((dialog) => {
            const response = ProductService.deleteProducts(item)
            var index = this.products.indexOf(item)
            this.products.splice(index, 1)
            setTimeout(() => {
              console.log('Produit supprimé')
              dialog.close()
            }, 2500)
        })
        .catch(() => {
            console.log('Suppression annulée')
        });
    },
    async modifyToogle () {
        this.update=!this.update   
    },
     updateProduct (item) { 
        this.$dialog.confirm("Etes-vous sur de vouloir effectuer ces modifications?", {
            loader: true 
        })
     .then((dialog) => {   console.log(item._id)      
          const response =  ProductService.putProducts(item)
          this.update=false;
          let index=this.products.indexOf(item)
          this.products.splice(index,1,item)
          setTimeout(() => {
            console.log('Produit modifié')
            dialog.close()
        }, 2500);
        })
    .catch(() => {
        // Triggered when cancel button is clicked
        console.log('Modification annulée');
    });
    },
     InsertProduct (){
       this.$router.push({name: 'ProductsAjout'})
    },
  },
  mounted () {
    const response = ProductService.getProducts()
    .then(response => {
      this.products = response.data
    })
    .catch(e => {
      this.errors.push(e)     
    })
    },
  updated : function(){
   $('#example').DataTable();
  },
  concat:function(str1,str2,str3){
    var str1 =  String(document.getElementById("name").value)
    var res = str1.concat(str2, str3);
    document.getElementById('image').innerHTML = res;
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
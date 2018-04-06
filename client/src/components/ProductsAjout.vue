<template>
  <div class="container" style="background-color:white">
    <h1>Formulaire Nouveau Produit</h1>
    <div class="form-group">
    <label> Nom </label>
      <textarea v-model="name" id="name" class="form-control" placeholder="Nom"></textarea>
    </div>
    
    
    <div class="form-group">
      <label> Instructions </label>
      <textarea v-model="instructions" class="form-control" placeholder="Instructions"></textarea>
    </div>

    <div class="form-group">
      <label> Posologie </label>
      <textarea v-model="posology" class="form-control" placeholder="Posologie"></textarea>
    </div>

     <div class="form-group">
     <label> Type </label>
      <select class="form-control" v-model="form">
      <option disabled value="">Choisissez</option>
      <option>Géllule</option>
      <option>Sirop</option>
      <option>Comprimés</option>
      <option>Paumade</option>
      <option>Goutelettes</option>
      </select>
    </div>

     <div class="form-group">
     <label> Prix de l'unité </label>
      <input type="number" name="sampleValue"  class="form-control" v-model="sampleValue" required>
    </div>

    <div class="form-group">
      <button @click="Insert" class="btn btn-primary">Valider</button>
      <button @click="Refresh" class="btn btn-success">Rafraichir</button>
      <button @click="Cancel" class="btn btn-success">Annuler</button>
    </div>
    <form ref='uploadForm' 
      id='uploadForm' 
      action='http://localhost:3000/products/upload' 
      method='post' 
      encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
    </form>   
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
import VuejsDialog from "vuejs-dialog"
export default {
  name: 'Produit',
  data () {
    return {
      name: '',
      form: '',
      sampleValue: null,
      instructions: ''
    }
  },
    mounted() {
            // To demonstrate functionality of exposed component functions
            // Here we make focus on the user input
            this.$refs.name.focus();
        },
  methods: {
    async  Insert () {
      if (this.name!="" )
      {
         
       const response = await ProductService.insert({
        name: this.name,
        form: this.form,
        instructions: this.instructions,
        sampleValue: this.sampleValue
      })
       alert("Produit ajouté avec succès");
       this.$router.push({name: 'Products'})
      }
      else
 
      {
        if (this.name=="")
        {
            
        alert("Veuillez entrer un nom de produit!");
        }
        if (this.sampleValue <0 )
        {
           alert("Le prix ne peut pas être négatif");
     
        }
      }
   
    },
    async Cancel()
    {
      this.$router.push({name: 'Delegate'});
    },
    async Refresh()
    {
      this.name="";
      this.form="";
      this.instructions="";
      this.sampleValue="";
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
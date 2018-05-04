<!-- eslint-disable -->
<template>
  <div id="inbox">
	 <form id="slides-form">
      <div class="row  container-fluid">
        <div class="col-md-12">
          <h2>New presentation</h2>
          <div class="form-group">
              Product Name:
              <select class="form-control" name='name' required>
              
             <option  value="Maxilase">Maxilase</option>
             <option  value="Drill">Drill</option>
             </select>
           </div>
            <div class="form-group">
              <button class="btn btn-pharma" id="addslide" @click="addSlides">Add a slide</button>
              <a href="/" class="btn btn-primary">Annuler</a>
              <button @click="Insert" class="btn btn-primary">Valider</button>
            </div>
            <label for="presentation-title"> Titre de la Presentation</label>
            <textarea v-model="name" id="name" class="form-control" placeholder="Titre" ></textarea>
        </div>
      </div>
      <div class="container-fluid">
        <h3>Add slides to presentation!</h3>
        <div class="row panel" id="slides" style="overflow-y: scroll; max-height: 500px;">
          <div class="col-md-6">
            <div class="thumbnail">
              
              <div class="form-group">
                <label for="presentation-title">Choisir une image</label>
                  <form ref='uploadForm' 
                       id='uploadForm' 
                        action='http://localhost:8081/products/upload' 
                         method='post' 
                        encType="multipart/form-data">
                    <input v-on:change="slide1" type="file" name="slides[0].image" />
                  </form>   
              </div>
              
              <div class="form-group">
                <label>Description</label>
                <textarea v-model="text1" class="form-control" name="slides[0].description"></textarea>
              </div>
              
            </div>
          </div>
        </div>
      </div> 
   </form>		  	
	</div>
</template>

<script>
/* eslint-disable */

import PresentationService from '@/services/PresentationService'
import VuejsDialog from "vuejs-dialog"
const form2js = require('form2js')

export default {
  name: 'Produit',
  data () {
    return {
        productsList: ["Maxilase","Drill"],
      name: '',
      form: '',
      sampleValue: null,
      slides: [],
      description: []
    }
  },
    mounted: function () {
    
  },
  methods: {
     async  Insert (event) {
      event.preventDefault()
      var prensetation = $('#slides-form').serializeArray()
      var prensetationObject = form2js.form2js('slides-form', '.', true,
        function (node) {
          if (node.id && node.id.match(/callbackTest/)) {
            return { name: node.id, value: node.innerHTML }
          }
        }
      )
      console.log(prensetationObject)
      try {
        const response = await PresentationService.insert(prensetationObject)
        this.Cancel()
      } catch (err) {
        console.log(err)
      }
    },
    Cancel()
    {
      this.$router.push({name: '/Login'});
    },
    Refresh()
    {
      this.name="";
      this.form="";
      this.instructions="";
      this.sampleValue="";
    },
    addSlides(event)
    {
      event.preventDefault()
      let n = Math.floor(Math.random()*(500-0+1)+0)
      $('#slides').append(`<div class="col-md-6">
              <div class="thumbnail">
                <div class="form-group">
                  <label for="presentation-title">Choisir une image</label>
                  <form ref='uploadForm' 
                        id='uploadForm' 
                        action='http://localhost:8081/products/upload' 
                        method='post' 
                        encType="multipart/form-data">
                      <input v-on:change="slide3" type="file"  name="slides[${n}].image" />
                  </form>   
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea v-model="text3" class="form-control" name="slides[${n}].description"></textarea>
                </div>
              </div>
            </div>`);
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
<!-- eslint-disable -->
<template>
  <div>
    <h3>New report form</h3>
    <div class="form-group">
      <select name="report-type" v-model="category" class="form-control">
        <option value="" disabled>Please select category</option>
        <option value="Pharmacy">Pharmacy</option>
        <option value="Wholesaler">Wholesaler</option>
        <option value="Hospital">Hospital</option>
        <option value="Clinic">Clinic</option>
        <option value="Doctor">Doctor</option>
      </select>
    </div>
    <div v-if="category === 'Pharmacy'">
      <form name="pharmacy-form" id="pharmacy-form" method="POST">
        <div class="form-group">
          <label for="pharmacy-name">Pharmacy name</label>
          <input type="text" name="pharmacyName" class="form-control" v-model="pharmacyName">
        </div>
        <div class="form-group">
          <label for="visit-objectif">Objectif de la visite</label>
          <select name="visitObjectif" class="form-control" v-model="visitObjectif">           
            <option value="Visite de lancement">Visite de lancement</option>       
            <option value="Visite de rappel">Visite de rappel</option>        
            <option value="Réponse à objection">Réponse à objection</option>       
            <option value="Convaincre de prescrire">Convaincre de prescrire</option>       
            <option value="Mise en place">Mise en place</option>       
            <option value="Proposition challenge">Proposition challenge</option>       
            <option value="Suivi challenge">Suivi challenge</option>       
            <option value="Commande pack">Commande pack</option>       
            <option value="Mise en place produits">Mise en place produits</option>        
            <option value="Recouvrement">Recouvrement</option>        
            <option value="Livraison">Livraison</option>       
            <option value="Recuil statistique">Recuil statistique</option>        
            <option value="Remise Bon Achat">Remise Bon Achat</option>        
            <option value="Autres">Autres</option>        
          </select>
        </div>
        <div class="form-group">
          <label for="pharmacy-potential">Potential</label>
          <select name="pharmacyPotential" class="form-control" v-model="pharmacyPotential">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div class="form-group">
          <h3>Potential products</h3>
            <div id="potential-products-table">
            </div>
          <button class="btn btn-danger btn-block" @click="addPotentialProduct">Add a product</button>
        </div>
        <div class="form-group">
          <h3>Order</h3>
          <select class="form-control" name="order.type" v-model="orderIsPack">
            <option value="" disabled>Please select order type</option>
            <option value="Regular">Regular</option>
            <option value="Pack gros 1">Pack gros 1</option>
            <option value="Pack gros 2">Pack gros 2</option>
            <option value="Pack gros 3">Pack gros 3</option>
          </select>
          <br>
          <div id="order-table" v-if="orderIsPack === 'Regular'">
            <product v-for="index in orderCount" :key="index"></product>
            <br>
          </div>
          <button class="btn btn-danger btn-block" @click="addOrderProduct" v-if="orderIsPack === 'Regular'">Add more products</button>
        </div>
        <div class="form-group">
          <h3>Samples</h3>
          <div id="order-table">
            <sample v-for="index in sampleCount" :key="index"></sample>
            <br>
          </div>
          <button class="btn btn-danger btn-block" @click="addSampleProduct">Add samples</button>
        </div>
        <div class="form-group">
          <h3>Notes</h3>
          <textarea class="form-control" cols="10" rows="5" name="notes"></textarea>
        </div>
        <div class="form-group">
          <button class="btn btn-success" @click="submitForm">Add report</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import ReportsService from '@/services/ReportsService'
import DelegatesService from '@/services/DelegatesService'
import ProductsService from '@/services/ProductsService'
import ProductServlet from './ProductServlet'
import SamplesServlet from './SamplesServlet'

const form2js = require('form2js')

export default {
  name: 'Form',
  components: {
    'product': ProductServlet,
    'sample': SamplesServlet
  },
  data () {
    return {
      category: '',
      pharmacyName: '',
      visitObjectif: '',
      pharmacyPotential: '',
      productsList: [],
      orderCount: 0,
      orderIsPack: '',
      sampleCount: 0
    }
  },
  methods: {
    async submitForm (event) {
      event.preventDefault()
      var pharmacy = $('#pharmacy-form').serializeArray()
      var pharmacyObject = form2js.form2js('pharmacy-form', '.', true,
        function (node) {
          if (node.id && node.id.match(/callbackTest/)) {
            return { name: node.id, value: node.innerHTML };
          }
        }
      );
      pharmacyObject.type = this.category
      pharmacyObject.delegate = this.$store.getters.getDelegate
      console.log(pharmacyObject)
      const response = await ReportsService.addReport(pharmacyObject)
      console.log(response)
    },
    addPotentialProduct (event) {
      event.preventDefault()
      let index = this.randomIntFromInterval(5,100)
      $('#potential-products-table').append(`
          <div id="potential-products-table">
              <div class="row">
                <div class="col-md-5">
                  Product: <input type="text" name="potentialProducts[${index}].productName" class="form-control">
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-2">
                  Note: <input type="text" name="potentialProducts[${index}].note" class="form-control">
                </div>
              </div>
              <br>`)
    },
    randomIntFromInterval (min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    },
    addOrderProduct (event) {
      event.preventDefault()
      this.orderCount += 1
    },
    addSampleProduct (event) {
      event.preventDefault()
      this.sampleCount += 1
    }
  },
  mounted: function () {
    ProductsService.getProducts().then(res => this.productsList = res.data)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

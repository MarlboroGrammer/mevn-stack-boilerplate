<!-- eslint-disable -->
<template>
  <div>
    <div class="row">
      <div class="col-md-5">
        Product name:
        <select class="form-control"
        :name='name'>
          <option v-for="product in productsList" :value="product.name">{{product.name}}</option>
        </select>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-1">
        Quantite: <input type="number" :name='quantity' class="form-control">
      </div>
    </div>
    <br>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'ProductServlet',
  data () {
    return {
      productsList: this.$parent.productsList,
      index: this.$parent.randomIntFromInterval(5, 100),
      name: ``,
      quantity: ``
      
    }
  },
  methods: {
  },
  mounted: function () {
    this.name = `order.products[${this.index}].productName`
    this.quantity = `order.products[${this.index}].quantity`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

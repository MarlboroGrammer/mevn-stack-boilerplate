<!-- eslint-disable -->
<template>
  <div>
    <div class="row">
      <div class="col-md-5">
        Product name:
        <select class="form-control"
        :name='name' required v-model="productName">
          <option disabled>Please select a product</option>
          <option v-for="product in productsList" :value="product.name">{{product.name}}</option>
        </select>
      </div>
      <div class="col-md-1">
        Quantite: <input type="number" :name='quantity' class="form-control">
      </div>
      <div class="col-md-1">
        Price: <input type="number" :name="priceName" class="form-control" :value='price' readonly>
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
      quantity: ``,
      productName: '',
      price: 0,
      priceName: ``
    }
  },
  watch: {
    productName: function () {
      console.log(this.productsList.filter(x => x.name === this.productName)[0].sampleValue)
      this.price = this.productsList.filter(x => x.name === this.productName)[0].sampleValue
    }
  },
  methods: {
  },
  mounted: function () {
    this.name = `order.products[${this.index}].productName`
    this.quantity = `order.products[${this.index}].quantity`
    this.priceName = `order.products[${this.index}].price`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

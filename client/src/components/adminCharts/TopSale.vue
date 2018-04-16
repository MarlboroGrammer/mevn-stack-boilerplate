<template>
  <div>
    <h3>Top sale was mode on: {{maxSale.date | formatDate}}</h3>
    <h4>Delegate: {{maxSale.delegate.name}}&nbsp;{{maxSale.delegate.surname}}</h4>
    <div class="row sale-info">
        <div class="col-md-6">
          <div class="panel">
            <div class="panel-body red-panel">
              <div class="row">
                <div class="col-md-4">
                  <i class="fa fa-tag"></i>
                </div>
                <div class="col-md-8">
                  Amount Closed
                  <h4>{{maxSale.amount}} DT</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="panel">
            <div class="panel-body green-panel">
              <div class="row">
                <div class="col-md-4">
                  <i class="fa fa-medkit"></i>
                </div>
                <div class="col-md-8">
                  Most Sold Item
                  <h4>{{topProduct.productName}}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <div class="panel">
            <div class="panel-body blue-panel">
              <div class="row">
                <div class="col-md-2">
                  <i class="fa fa-user"></i>
                </div>
                <div class="col-md-4">
                  Client Potential
                  <h4>{{maxSale.report.potential}}</h4>
                </div>
                <div class="col-md-4" v-if="maxSale.report.type == 'Pharmacy'">
                  Pharmacy Name
                  <h4>{{maxSale.report.pharmacy}}</h4>
                </div>
                <div class="col-md-4" v-if="maxSale.report.type == 'Wholesaler'">
                  Wholesaler Name
                  <h4>{{maxSale.report.wholesaler}}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import SalesService from '@/services/SalesService'

function getTopSale (salesArray) {
  return salesArray.filter(s => s.amount === Math.max.apply(Math, salesArray.map(o => o.amount)))[0]
}
function getTopProduct (productsArray) {
  return productsArray.filter(p => p.quantity === Math.max.apply(Math, productsArray.map(o => o.quantity)))[0]
}
async function getSales () {
  try {
    const response = await SalesService.getSales()
    return response.data
  } catch (err) {
    return undefined
  }
}
export default {
  name: 'TopSale',
  data () {
    return {
      maxSale: {},
      topProduct: {}
    }
  },
  methods: {
  },
  mounted: function () {
    console.log('Top sale mounted')
    getSales().then(data => {
      this.maxSale = getTopSale(data)
      this.topProduct = getTopProduct(this.maxSale.report.order.products)
    })
  }
}
</script>
<style>
  .panel i{
    font-size: 55px;
  }
  .red-panel{
    background-color: #fc8675;
    color: white;
    border-radius: 2%;
  }

 .green-panel{
    background-color: rgb(54, 169, 206);
    color: white;
    border-radius: 2%;
  }
 .blue-panel{
    background-color: rgb(129, 206, 74);
    color: white;
    border-radius: 2%;
  }
 .navy-panel{
    background-color: rgb(1, 3, 38);
    color: white;
    border-radius: 2%;
  }
  .sale-info{
    margin-top: 45px;
  }
</style>

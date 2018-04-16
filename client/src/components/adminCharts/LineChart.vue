<!-- eslint-disable -->
<template>
  <div>
    <div class="col-md-6">
      <vue-highcharts :options="lineChartOptions" ref="lineCharts"></vue-highcharts>
    </div>
    <div class="col-md-4">
      <vue-highcharts :options="pieChartOptions" ref="pieChart"></vue-highcharts>
    </div>
    <div class="col-md-2">
      <!-- gui fixture -->
    </div>
    <div class="col-md-6">
      <topsale></topsale>
    </div>
    <div class="col-md-4">
      <vue-highcharts :options="drilldownOptions" ref="drilldownChart"></vue-highcharts>
    </div>
    
  </div>
</template>

<script>
/* eslint-disable */
import VueHighcharts from 'vue2-highcharts'
import Highcharts from 'highcharts'
import SalesService from '@/services/SalesService'
import Drilldown from '../../../node_modules/highcharts/modules/drilldown.js'
import TopSale from '@/components/adminCharts/TopSale'

function getTopSale(salesArray) {
  return salesArray.filter(s => s.amount === Math.max.apply(Math,salesArray.map(o => o.amount)))[0]
}
function millimesToDT (millimes) {
  return millimes / 1000;
}
function getMonthFromISODate (date) {
  let retDate = date.toISOString().slice(0,10).split('-')[1]
  switch (retDate) {
    case '01':
      return 'Jan'
      break
    case '02':
      return 'Feb'
      break
    case '03':
      return 'Mar'
      break
    case '04':
      return 'Apr'
      break
    case '05':
      return 'May'
      break
    case '06':
      return 'Jun'
      break
    case '07':
      return 'Ju'
      break
    case '08':
      return 'Aug'
      break
    case '09':
      return 'Sep'
      break
    case '10':
      return 'Oct'
      break
    case '11':
      return 'Nov'
      break
    case '12':
      return 'Dec'
      break   
  }
}
async function getSales (){
  try{
    const response = await SalesService.getSales()
    return response.data
  } catch (err) {
    return undefined
  }
}

function getYearlyArray () {
  let retArr = []
  
  retArr['Jan'] = 0
  retArr['Feb'] = 0
  retArr['Mar'] = 0
  retArr['Apr'] = 0
  retArr['May'] = 0
  retArr['Jun'] = 0
  retArr['Jul'] = 0
  retArr['Aug'] = 0
  retArr['Sep'] = 0
  retArr['Oct'] = 0
  retArr['Nov'] = 0
  retArr['Dec'] = 0

  return retArr
}

export default{
    components: {
        VueHighcharts,
        'topsale': TopSale
    },
    data(){
      return{
        maxSale: {},
        lineChartOptions: {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Overall sales chart'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            title: {
              text: 'DT'
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: []
        },
        pieChartOptions: {
          chart: {
              type: 'pie',
              options3d: {
                  enabled: true,
                  alpha: 45
              }
          },
          title: {
              text: 'Sales distribution'
          },
          plotOptions: {
              pie: {
                  innerSize: 100,
                  depth: 45
              }
          },
          series: []
        },
        drilldownOptions: {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Top sale products'
          },
          xAxis: {
            type: 'category'
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true
              }
            }
          },
          series: []
        }
      }
    },
    methods: {
      load () {
        console.log('Mounted!')
        getSales().then(data => {
          console.log('One boi:', data[0])
          this.maxSale = getTopSale(data)

          let wholesalerDataArray = getYearlyArray()
          let pharmacyDataArray = getYearlyArray()

          let pharmacyData = data.filter(x => x.type === 'Pharmacy')
          let wholesalerData = data.filter(x => x.type === 'Wholesaler')
          
          wholesalerData.forEach(s => {
            let month = getMonthFromISODate(new Date(s.date))
            wholesalerDataArray[month] += millimesToDT(s.amount)
          })

          pharmacyData.forEach(s => {
            let month = getMonthFromISODate(new Date(s.date))
            pharmacyDataArray[month] += millimesToDT(s.amount)
          })

          let asyncWholesalersData = {
            name: 'Wholesalers Sales',
            marker: {
              symbol: 'square'
            },
            data: [wholesalerDataArray['Jan'], wholesalerDataArray['Feb'], wholesalerDataArray['Mar'], 
            wholesalerDataArray['Apr'], wholesalerDataArray['May'], wholesalerDataArray['Jun'], 
            wholesalerDataArray['Jul'],wholesalerDataArray['Aug'], wholesalerDataArray['Sep'], 
            wholesalerDataArray['Oct'], wholesalerDataArray['Nov'], wholesalerDataArray['Dec']]
          }

          let asyncPharmacyData = {
            name: 'Pharmacies Sales',
            marker: {
              symbol: 'square'
            },
            data: [pharmacyDataArray['Jan'], pharmacyDataArray['Feb'], pharmacyDataArray['Mar'], 
            pharmacyDataArray['Apr'], pharmacyDataArray['May'], pharmacyDataArray['Jun'], 
            pharmacyDataArray['Jul'],pharmacyDataArray['Aug'], pharmacyDataArray['Sep'], 
            pharmacyDataArray['Oct'], pharmacyDataArray['Nov'], pharmacyDataArray['Dec']]
          }

          let lineCharts = this.$refs.lineCharts

          lineCharts.delegateMethod('showLoading', 'Loading...')
          setTimeout(() => {
              lineCharts.addSeries(asyncWholesalersData)
              lineCharts.addSeries(asyncPharmacyData)
              lineCharts.hideLoading()
          }, 2000)
          // Pie chart data
          let asyncPiechartData = {
              name: 'Amount',
              data: [
                  ['Pharmacies', millimesToDT(pharmacyData.map(p => p.amount).reduce((a, b) => a + b))],
                  ['Wholesalers', millimesToDT(wholesalerData.map(p => p.amount).reduce((a, b) => a + b))] 
              ]
          }
          let pieChart = this.$refs.pieChart

          pieChart.delegateMethod('showLoading', 'Loading...')
          setTimeout(() => {
              pieChart.addSeries(asyncPiechartData)
              pieChart.hideLoading()
          }, 2000)
          // Top sale drilldown chart
          let productsDrillDownData = []

          this.maxSale.report.order.products.forEach(p => {
            let productObj = {
              name: p.productName,
              y: p.quantity
            }
            productsDrillDownData.push(productObj)
          })
          let asyncDrillDownData = {
              name: 'Quantity',
              colorByPoint: true,
              data: productsDrillDownData 
          }

          let drilldownChart = this.$refs.drilldownChart
          drilldownChart.delegateMethod('showLoading', 'Loading...')
          setTimeout(() => {
              drilldownChart.addSeries(asyncDrillDownData)
              drilldownChart.hideLoading()
          }, 2000)

        })
      } 
    },
    mounted: function () {
      this.load()
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .charts-links{
    text-decoration: none;
    list-style: none;
  }

</style>

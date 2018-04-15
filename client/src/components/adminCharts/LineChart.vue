<!-- eslint-disable -->
<template>
  <div>
    <div class="col-md-10">
      <vue-highcharts :options="lineChartOptions" ref="lineCharts"></vue-highcharts>
    </div>
    <!--<div class="col-md-5">
      <vue-highcharts :options="stackChartOptions"></vue-highcharts>
    </div>-->
  </div>
</template>

<script>
/* eslint-disable */
import VueHighcharts from 'vue2-highcharts'
import Highcharts from 'highcharts'
import SalesService from '@/services/SalesService'

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

getSales().then(data => {
  console.log(data.map(s => getMonthFromISODate(new Date(s.date))))
})
const asyncData = {
  name: 'Tokyo',
  marker: {
    symbol: 'square'
  },
  data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
    y: 26.5,
    marker: {
      symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
    }
  }, 23.3, 18.3, 13.9, 9.6]
}
export default{
    components: {
        VueHighcharts
    },
    data(){
      return{
        lineChartOptions: {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Monthly Average Temperature'
          },
          subtitle: {
            text: 'Source: WorldClimate.com'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            title: {
              text: 'Temperature'
            },
            labels: {
              formatter: function () {
                return this.value + '°';
              }
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
          series: [asyncData]
        }
      }
    },
    methods: {
      mounted: function () {

      } 
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

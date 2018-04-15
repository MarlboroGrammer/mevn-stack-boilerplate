<!-- eslint-disable -->
<template>
  <div>
    <div class="col-md-10">
      <vue-highcharts :options="stackChartOptions"></vue-highcharts>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueHighcharts from 'vue2-highcharts'
import Highcharts from 'highcharts'

export default{
    components: {
        VueHighcharts
    },
    data(){
      return{
        stackChartOptions: {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Stacked column chart'
          },
          xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Total fruit consumption'
            },
            stackLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              }
            }
          },
          legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
          },
          tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
              }
            }
          },
          series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
          }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
          }]
        }
      }
    },
    methods: {
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

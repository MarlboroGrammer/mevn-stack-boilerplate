<!-- eslint-disable -->
<template>
  <div>
    <div class="row">
      <div class="col-md-2">
        <div class="panel panel-body">
          <ul class="charts-links">
            <li>
              <a href="">Stacked Chart</a>
              <hr>
            </li>
            <li>
              <a href="">Line Chart</a>
              <hr>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-5">
        <vue-highcharts :options="lineChartOptions" ref="lineCharts"></vue-highcharts>
      </div>
      <div class="col-md-5">
        <vue-highcharts :options="stackChartOptions"></vue-highcharts>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueHighcharts from 'vue2-highcharts'
import Highcharts from 'highcharts'

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
        },
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

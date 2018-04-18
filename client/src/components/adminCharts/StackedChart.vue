<!-- eslint-disable -->
<template>
  <div>
    <div class="col-md-10">
      <vue-highcharts :options="stackChartOptions" ref="stackedChart"></vue-highcharts>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ActionsService from '@/services/ActionsService'
import DelegatesService from '@/services/DelegatesService'
import VueHighcharts from 'vue2-highcharts'
import Highcharts from 'highcharts'

async function getActions () {
  try {
    const response = await ActionsService.getActions()
    return response.data
  } catch (err) {
    return undefined
  }
}

async function getDelegate (delegateId) {
  try {
    const response = await DelegatesService.getDelegateById(delegateId)
    return response.data
  } catch (err) {
    return undefined
  }
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
            text: 'Overall Profitability'
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            min: 0,
            title: {
              text: 'DT'
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
          series: []
        }
      }
    },
    methods: {
    },
    mounted: function () {
      let stackedChartDataArray = []
      let namesArray = []
      getActions().then(data => {
        data.forEach(a => {
          stackedChartDataArray[a.delegate._id] = {
            CA: 0,
            Charges: 0
          }
          namesArray[a.delegate._id] = a.delegate.name.concat(' ', a.delegate.surname)
        })
        let delegateName = ''
        getDelegate(key).then(delegate => {
          delegateName = delegate.name + ' ' + delegate.surname
        })
        console.log('Initialised boi:', stackedChartDataArray)
        data.forEach(a => {
          if (a.amount > 0) {
            stackedChartDataArray[a.delegate._id].CA += (a.amount / 1000)
          } else {
            stackedChartDataArray[a.delegate._id].Charges += ((a.amount * -1) / 1000)
          } 
        })
        let caData = [], chargesData = [], totalCA = 0, totalCharges = 0

        for (var key in stackedChartDataArray) {
          totalCA += stackedChartDataArray[key].CA
          totalCharges += stackedChartDataArray[key].Charges
          caData.push({name: namesArray[key], y: stackedChartDataArray[key].CA})
          chargesData.push({name: namesArray[key], y: stackedChartDataArray[key].Charges})
        }

        //final push in arrays for total count
        caData.push({name: 'Total', y: totalCA})
        chargesData.push({name: 'Total', y:totalCharges})
      
        let chargesObj = {
          name: 'Charges',
          data: chargesData
        }, caObj = {
          name: 'CA',
          data: caData
        }

        let stackedChartSeries = [chargesObj, caObj]
        let stackedChart = this.$refs.stackedChart

        console.log(stackedChartSeries)
        stackedChart.delegateMethod('showLoading', 'Loading...')
        setTimeout(() => {
          stackedChart.addSeries(chargesObj)
          stackedChart.addSeries(caObj)
          stackedChart.hideLoading()
        }, 2000)

      })
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

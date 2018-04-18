<!-- eslint-disable -->
<template>
  <div>
    <div class="col-md-3">
      <div id="tunisiamap">
        <img src="@/assets/images/loading.gif">
      </div>  
    </div>
    <div class="col-md-3 before-data" v-if='govSelected == false'>
      <h2>Select government</h2>
      <p>Data will show here</p>
    </div>
    <div class="col-md-7" v-if='govSelected == true'>
      <h2>Currently viewing data of <strong>{{govName}}</strong></h2>
      <div v-if='visits.length > 0'>
        <vue-highcharts :options="pieChartOptions" ref="pieChart"></vue-highcharts>
      </div>
      <h2 v-if='visits.length === 0'>No data was found</h2>
    </div>
    <div class="col-md-2"></div>
    <div class="col-md-4" v-if='govSelected == true && visits.length > 0'>
      <h2>Delegates assigned to this area:</h2>
      <ul class="delegates-list">
        <li v-for="delegate in delegates">{{delegate.name}}&nbsp;{{delegate.surname}} 
          <a href="#">
            <i class="fa fa-eye" @click="getDelegateVisits(delegate._id)"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="col-md-4" v-if='govSelected == true && isSelected == false'>
      <h2>Select a degelate to see his performance</h2>
      <p>Click on the eye next to delegate</p>
    </div>
    <div class="col-md-6"  v-if="isSelected && delegateVisits.length > 0">
      <h3>Visits of this delegate:</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Addres</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="delegateVisit in delegateVisits">
            <td>{{delegateVisit.visitType}}</td>
            <td>{{delegateVisit.start_date | formatDate}}</td>
            <td>{{delegateVisit.end_date | formatDate}}</td>
            <td>{{delegateVisit.Adresse}}</td>
            <td>{{delegateVisit.status}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VisitService from '@/services/VisitService'
import VueHighcharts from 'vue2-highcharts'
import DelegatesService from '@/services/DelegatesService'
import Highcharts from 'highcharts'

async function getVisits (){
  try{
    const response = await VisitService.getVisits()
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
function getGovFromBoi (adresseBoi) {
  return adresseBoi.split(',')[1].trim()
}

function getCount (array, crit) {
  let tmp = array
  return tmp.filter(t => t.status === crit).length
}
export default{
    components: {
      VueHighcharts
    },
    data(){
      return{
        govName: '',
        govSelected: false,
        visits: [],
        delegates: [],
        isSelected: false,
        delegateVisits: [],
        visitsCopy: [],
        pieChartOptions: {
          chart: {
              type: 'pie',
              options3d: {
                  enabled: true,
                  alpha: 45
              }
          },
          title: {
              text: 'Coverage rate'
          },
          plotOptions: {
              pie: {
                  innerSize: 100,
                  depth: 45
              }
          },
          series: []
        }
      }
    },
    methods: {
      getDelegateVisits (id) {
        this.isSelected = true
        this.delegateVisits = this.visits.filter(v => v.delegate === id)
        console.log(this.delegateVisits)
      },
      setGovName (govName) {
        this.govSelected = true
        this.isSelected = false
        this.govName = govName
        this.visits = this.visitsCopy
        this.visits = this.visits.filter(v => getGovFromBoi(v.Adresse) === this.govName)

        if (this.visits.length > 0) { 
          let asyncPiechartData = {
            name: 'Visits',
            data: [
                ['Done', getCount(this.visits, 'Done')],
                ['Not done', getCount(this.visits, 'Not done')] 
            ]
          }

          let pieChart = this.$refs.pieChart
          pieChart.delegateMethod('showLoading', 'Loading...')
          setTimeout(() => {
            pieChart.removeSeries()
            pieChart.addSeries(asyncPiechartData)
            pieChart.hideLoading()
          }, 1000)
          this.visits.forEach(v => {
            this.delegates = []
            getDelegate(v.delegate).then(d => {
              this.delegates.push(d)
            })
          })
        }
      },
      drawTunisiaMap () {
        var width = 220, height = 500
        var path = d3.geo.path()
        var svg = d3.select("#tunisiamap").append("svg")
            .attr("width", width)
            .attr("height", height)
        let self = this
        d3.json("https://gist.githubusercontent.com/mohamed-ali/8732826/raw/901a577fafad6277e38f2c0f6bf09561fd4124c9/tunisia.json", function(error, topology) {
            var featureCollection = topojson.feature(topology, topology.objects.governorates)
            console.log(featureCollection)
            var bounds = d3.geo.bounds(featureCollection)
            var centerX = d3.sum(bounds, function(d) {return d[0];}) / 1.15,
                centerY = d3.sum(bounds, function(d) {return d[1];}) / 2

            var projection = d3.geo.mercator()
              .scale(3000)
              .center([centerX, centerY])
              
            path.projection(projection)
            var div = d3.select("body").append("div") 
              .attr("class", "tooltip")       
              .style("opacity", 0)

            svg.selectAll("path")
                .data(featureCollection.features)
                .enter().append("path")
                .style('fill', '#ccc')
                .attr("d", path)
                .on("click", function(d, i) {
                  self.setGovName(d.properties.gov_name_f)
                  d3.select(this).attr("r", 10)
                  .style("fill", "#00AEEC")
                })
                .on('mouseover', function(d) {
                  d3.select(this).attr("r", 10).style("fill", "#00AEEC")
                })
                .on('mouseout', function(d) {
                  d3.select(this).attr("r", 10).style("fill", "#ccc")
                })

        });
      }
    },
    mounted: function () {
      setTimeout(() => {
          $('#tunisiamap').html('')
          this.drawTunisiaMap()
          getVisits().then(data => {
            this.visits = data
            this.visitsCopy = this.visits
          })
      }, 2000) 

    },
    watch: {
      'govSelected': function () {
        console.log(this.govSelected)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  svg {
    border: 1px solid #ccc !important;
  }
  div.tooltip { 
    position: absolute;     
    text-align: center;     
    width: 60px;          
    height: 28px;         
    padding: 2px;       
    font: 12px sans-serif;    
    background: lightsteelblue; 
    border: 0px;    
    border-radius: 8px;     
    pointer-events: none;     
}
</style>

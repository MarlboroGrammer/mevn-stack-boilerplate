<!-- eslint-disable -->
<template>
  <div>
    <nav class="navbar navbar-absolute-top pharma-nav">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="row">
            <div class="col-xs-2 visible-xs navbar-header-column">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
            </div>
            <div class="col-xs-8 col-sm-2 navbar-brand-column">
                <a class="navbar-brand" href="/">
                    <img class="logo" src="../assets/images/logo_pharmakeys.png" alt="Logo PharmaKeys" width="120" />
                </a>
            </div>
            <div class="col-xs-12 col-sm-10">
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="hidden-xs">
                            <a class="blue-link" href="">Change Password</a>
                        </li>
                        <li>
                          <a class="top-link" href="">Help</a>
                        </li>
                        <li>
                        <a class="top-link" @click="logout()">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="clearfix visible-xs"></div>
        </div>
      </div>
    </nav>
    <div class="container-fluid main-panel">

      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#activity">Activity</a>
        </li>
        <li>
          <a data-toggle="tab" href="#reports">Reports</a>
        </li>
        <li>
          <a data-toggle="tab" href="#calendar">Calendar</a>
        </li>
        <li>
          <a data-toggle="tab" href="#inbox">Presentations</a>
        </li>
        <li>
          <a data-toggle="tab" href="#overview">Overview</a>
        </li>
      </ul>

      <div class="tab-content">
        <div id="activity" class="tab-pane fade in active">
        </div>
        <div id="reports" class="tab-pane fade">
          <h2>Reports Management</h2>
          <div class="row">
            <div class="col-md-12">
              <button class="btn btn-danger" @click="loadAddComponent()" v-if="!isAdd">Add a report</button>
              <div :is="currentComponent"></div>
              <button class="btn btn-primary" @click="loadListComponent()" v-if="isAdd">Cancel</button>
            </div>
          </div>
        </div>

        <div id="calendar" class="tab-pane fade">
          <h3>Menu 2</h3>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.  </p>
        </div>
        <div id="inbox" class="tab-pane fade">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="presentation-title">Presentation Title</label>
                <input type="text" name="presentation-title" class="form-control">
              </div>
              <div class="form-group">
                <button class="btn btn-pharma" id="addslide">Add a slide</button>
                <button class="btn btn-primary" id="save-btn">Save</button>
              </div>
            </div>
          </div>
          <div class="row" id="slides" style="overflow-y: scroll; max-height: 500px;">

          </div>
        </div>
        <div id="overview" class="tab-pane fade">
        <h2><strong>Account overview</strong></h2>
        <div class="row">
          <div class="col-md-3 user-info">
            <img src="src/assets/images/faycel.png" width="200">
            <br>
            <label for="first-name">Full name</label>
            <div class="form-group">
              <input id="first-name" class="form-control" />
            </div>
            <label for="first-name">Full job title</label>
            <div class="form-group">
              <input id="first-name" class="form-control" />
            </div>
            <label for="first-name">Phone number</label>
            <div class="form-group">
              <input id="first-name" class="form-control" />
            </div>
            <label for="first-name">Email</label>
            <div class="form-group">
              <input id="first-name" class="form-control" />
            </div>
          </div>
          <div class="col-md-9 comm-info">
            <h2>
              <span class="blue-heading">Statistics</span>
            </h2>
            <div class="stat-box">
              <div class="row">
                <div class="col-md-3">
                  <div class="panel">
                    <div class="panel-body red-panel">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-tag"></i>
                        </div>
                        <div class="col-md-8">
                          Total sales
                          <h4>4522 DT</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="panel">
                    <div class="panel-body green-panel">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-tag"></i>
                        </div>
                        <div class="col-md-8">
                          Total Records
                          <h4>4522 DT</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="panel">
                    <div class="panel-body blue-panel">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-tag"></i>
                        </div>
                        <div class="col-md-8">
                          Total sales
                          <h4>4522 DT</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="panel">
                    <div class="panel-body navy-panel">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-tag"></i>
                        </div>
                        <div class="col-md-8">
                          Total sales
                          <h4>4522 DT</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <br>
              <div class="col-md-5">
                <h2>
                  <span class="blue-heading">
                    Communication options
                    <a href="">
                      <i class="fa fa-plus"></i>
                    </a>
                    <a href="">
                      <i class="fa fa-twitter"></i>
                    </a>
                    <a href="">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </span>
                </h2>
                <form>
                  <table>
                    <tr>
                      <td><label for  = "user-phonenumber">Phone number</label></td>
                      <td class="pull-right">
                        <input type = "tel" name = "user-phonenumber" id="user-phonenumber">
                      </td>
                    </tr>
                    <tr>
                      <td><label for  = "user-skype">Skype</label></td>
                      <td class="pull-right">
                        <input type = "tel" name = "user-skype" id   = "user-skype">
                      </td>
                    </tr>
                    <tr>
                      <td><label for  = "user-facebook">Facebook</label></td>
                      <td class="pull-right">
                        <input type = "tel" name = "user-facebook" id   = "user-facebook">
                      </td>
                    </tr>
                    <tr>
                      <td><label for  = "user-twitter">Twitter</label></td>
                      <td class="pull-right">
                        <input type = "tel" name = "user-twitter" id   = "user-twitter">
                      </td>
                    </tr>
                    <tr>
                      <td><label for  = "user-dnsf">Do not show phone</label></td>
                      <td class="pull-right">
                        <select>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><label for  = "user-phonenumber">Do not show email</label></td>
                      <td class="pull-right">
                        <select>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>
                    </tr>
                  </table>
                </form>
              </div>
              <div class="col-md-7">
                <h2>
                  <span class="blue-heading">New tasks</span>
                </h2>
                <table class="table">
                <thead class="thead-inverse thi">
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Due date</th>
                    <th>Notes</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Visit doctor in Ariena</td>
                    <td>15/06/2018</td>
                    <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.</td>
                    <td><button class="btn btn-pharma">Check</button></td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Visit doctor in Ariena</td>
                    <td>15/06/2018</td>
                    <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.</td>
                    <td><button class="btn btn-pharma">Check</button></td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Visit doctor in Ariena</td>
                    <td>15/06/2018</td>
                    <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.</td>
                    <td><button class="btn btn-pharma">Check</button></td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-return-assign */
import ListReports from '@/components/delegateReports/List'
import FormReports from '@/components/delegateReports/Form'

export default {
  name: 'Delegate',
  components: {
    'list': ListReports,
    'form': FormReports
  },
  data () {
    return {
      isAdd: false,
      reports: [],
      currentComponent: ListReports
    }
  },
  methods: {
    logout () {
      console.log('Logout clicked')
      this.$store.dispatch('logout')
      this.$router.push({name: 'Login'})
    },
    loadAddComponent () {
      this.currentComponent = FormReports
      this.isAdd = true
    },
    loadListComponent () {
      this.currentComponent = ListReports
      this.isAdd = false
    }
  },
  mounted: function () {
    // console.log(this.currentDelegate)
    // this.getDelegate(this.$store.state.user._id)
    // console.log(this.currentDelegate)
    // D3 JSON code, to be implemented
    // this.$refs.tunisiamap.append('hi')
    /* d3.json('http://localhost:3000/api/data2', function (error, data) {
      if (error) {
        throw new Error()
      }
      var margin = {top: 30, right: 20, bottom: 30, left: 50}
      var width = 800 - margin.left - margin.right
      var height = 270 - margin.top - margin.bottom

      data = data.filter((d) => d.at >= '2014-01-01' && d.at <= '2014-02-01')

      this.drawPieChart(data.filter((done) => done.status === 'Done').length, data.filter((notDone) => notDone.status === 'Not done').length)
      this.drawTunisiaMap()

      var visistBydDate = d3.nest().key(function (d) { return d.at }).entries(data)
      let formattedData = []
      let maxX = 0
      visistBydDate.forEach(function (d) {
        let formattedD = {
          at: new Date(d.key),
          done: d.values.filter((x) => x.status === 'Done').length,
          total: d.values.length
        }
        formattedData.push(formattedD)
        maxX = (maxX < formattedD.total ? formattedD.total : maxX)
      })
      formattedData.sort(function (a, b) { return a['at'] - b['at'] })
      console.log('Formatted data:', formattedData)
      var x = d3.time.scale().range([0, width])
      var y = d3.scale.linear().range([height, 0])

      var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(formattedData.length)

      console.log(maxX)
      var yAxis = d3.svg.axis().scale(y).orient('left').ticks(maxX)

      var valueline = d3.svg.line()
        .x(function (d) { return x(d.at) })
        .y(function (d) { return y(d.total) })
      var valueline2 = d3.svg.line()
        .x(function (d) { return x(d.at) })
        .y(function (d) { return y(d.done) })

      var svg = d3.select(this.$refs.linechart)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      x.domain(d3.extent(formattedData, function (d) { return d.at }))
      y.domain([0, d3.max(formattedData, function (d) { return d.total })])

      svg.append('path')
        .attr('class', 'line')
        .attr('d', valueline(formattedData))

      svg.append('path')
        .attr('class', 'line')
        .style('stroke', 'red')
        .attr('d', valueline2(formattedData))

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(1,' + height + ')')
        .call(xAxis)

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)

      svg.append('text')
        .attr('transform', 'translate(' + (width - 10) + ',' + y(formattedData[0].total + 0.15) + ')')
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .style('fill', 'blue')
        .text('Total')

      svg.append('text')
        .attr('transform', 'translate(' + (width - 10) + ',' + y(formattedData[0].done - 0.85) + ')')
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .style('fill', 'red')
        .text('Done')
    }) */
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  path {
    stroke: steelblue;
    stroke-width: 2;
    fill: none;
  }
  .axis path,
  .axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
  }
  #tunisiamap svg {
    border: 1px solid #ccc;
  }
  #tunisiamap path {
    fill: #ccc;
    stroke: #fff;
    stroke-width: .5px;
  }
  #tunisiamap path:hover {
    fill: #00AEEC;
  }
</style>

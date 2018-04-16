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
                            <a class="top-link" @click="logout">Logout</a>
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
          <a data-toggle="tab" href="#visits">Visits</a>
        </li>
        <li>
          <a data-toggle="tab" href="#inbox">Presentations</a>
        </li>
        <li>
          <a data-toggle="tab" href="#overview">Overview</a>
        </li>
        <li>
          <a data-toggle="tab" href="#products">Products</a>
        </li>
      </ul>

      <div class="tab-content">
        <div id="activity" class="tab-pane fade in active">
          <div class="row">
            <div class="col-md-2">
              <div class="panel panel-body">
                <ul class="charts-links">
                  <li>
                    <button @click="loadChart('Stacked')">Stacked Chart</button>
                    <hr>
                  </li>
                  <li>
                    <button @click="loadChart('Line')">Line Chart</button>
                    <hr>
                  </li>
                </ul>
              </div>
            </div>
            <div :is="currentChart"></div>
          </div>
        </div>
        <div id="reports" class="tab-pane fade">
          <div class="row">
            <div :is="currentComponent"></div>
          </div>
        </div>

        <div id="visits" class="tab-pane fade">
          <visit-admin></visit-admin>
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
        </div>
        <div id="products" class="tab-pane fade">
          <Products></Products>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-return-assign */
import AdminList from '@/components/adminReports/List'
import AdminReport from '@/components/adminReports/Report'
import LineChart from '@/components/adminCharts/LineChart'
import StackedChart from '@/components/adminCharts/StackedChart'
import VisitAdmin from '@/components/VisitsAdmin'
import Products from '@/components/Products'

export default {
  name: 'Admin',
  components: {
    'list': AdminList,
    'visit-admin': VisitAdmin,
    'Products': Products
  },
  data () {
    return {
      currentComponent: AdminList,
      reportToApproveID: '',
      currentChart: LineChart
    }
  },
  methods: {
    logout () {
      console.log('Logout clicked')
      this.$store.dispatch('logout')
      this.$router.push({name: 'Login'})
    },
    singleReport () {
      this.currentComponent = AdminReport
    },
    back () {
      this.currentComponent = AdminList
    },
    loadChart (selectedChart) {
      switch (selectedChart) {
        case 'Line':
          this.currentChart = LineChart
          break
        case 'Stacked':
          this.currentChart = StackedChart
      }
    }
  },
  mounted: function () {
  },
  beforeCreate: function () {
    if (this.$store.getters.isLoggedIn === false || this.$store.getters.getUser.role !== 'Admin') {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .charts-links{
    text-decoration: none;
    list-style: none;
    padding: 0;
  }
  .charts-links button{
    background-color: transparent;
  }
  .charts-links button {
    width: 141px;
    box-sizing: border-box;
    color: rgb(129, 206, 74);
    display: block;
    font-size: 1.25em;
    margin: 0 1em 0.3em 0;
    padding: 0.5em 1em;
    text-align: center;
    flex: 1;
    border: thin solid rgb(129, 206, 74);
  }

  .charts-links button:hover{
      color: #fff;
      background: rgb(129, 206, 74);
      border-color: rgb(129, 206, 74);
      text-decoration: none;
  }

  .main-panel .nav-tabs li a {
    margin-left: 5px;
    line-height: 1.42857143;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
    padding-left: 88px;
    padding-right: 101px;
  }

  @media only screen
  and (min-device-width : 768px)
  and (max-device-width : 1024px)
  and (orientation : landscape){
    .main-panel .nav-tabs li a {
      margin-left: 5px;
      line-height: 1.42857143;
      border: 1px solid transparent;
      border-radius: 4px 4px 0 0;
      padding-left: 50px;
      padding-right: 56px;
    }
  }
</style>

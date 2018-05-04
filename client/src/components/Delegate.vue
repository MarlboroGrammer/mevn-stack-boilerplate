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
          <a data-toggle="tab" href="#reports">Reports</a>
        </li>
        <li>
          <a data-toggle="tab" href="#calendar">Calendar</a>
        </li>
        <li>
          <a data-toggle="tab" href="#map">Map</a>
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
        <div id="reports" class="tab-pane fade in active">
          <h2>Reports Management</h2>
          <div class="row">
            <div class="col-md-12">
              <div :is="currentComponent"></div>
            </div>
          </div>
        </div>

        <div id="calendar" class="tab-pane fade">
          <Calendar></Calendar>
        </div>
        <div id="map" class="tab-pane fade">
          <DelegateMap></DelegateMap>
        </div>
        <div id="inbox" class="tab-pane fade">
          <div :is="currentComponent2"></div>
        </div>

        <div id="overview" class="tab-pane fade">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-return-assign */
import ListReports from '@/components/delegateReports/List'
import FormReports from '@/components/delegateReports/Form'
import DelegateMap from '@/components/DelegateMap'
import Calendar from '@/components/Calendar'
import Presentation from '@/components/Presentation'
import map from '@/components/map'

export default {
  name: 'Delegate',
  components: {
    'list': ListReports,
    'Calendar': Calendar,
    'DelegateMap': DelegateMap,
    'Presentation': Presentation,
    'Map': map
  },
  data () {
    return {
      isAdd: false,
      reports: [],
      currentComponent: ListReports,
      mapReportComponent: map,
      currentComponent2: Presentation,
      currentVisitId: '5ae88ea168c5bae702532662'
    }
  },
  methods: {
    logout () {
      console.log('Logout clicked')
      this.$store.dispatch('logout')
      this.$router.push({name: 'Login'})
    },
    back () {
      this.currentComponent2 = Presentation
    },
    loadAddComponent () {
      this.currentComponent = FormReports
      this.isAdd = true
    },
    loadListComponent () {
      this.currentComponent = ListReports
      this.isAdd = false
    },
    loadAddForMap () {
      this.mapReportComponent = FormReports
      this.isAdd = true
    },
    cancelAddForMap () {
      this.mapReportComponent = map
      this.isAdd = false
    }
  },
  mounted: function () {
  },
  beforeCreate: function () {
    if (this.$store.getters.isLoggedIn === false || this.$store.getters.getUser.role !== 'Delegate') {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-panel .nav-tabs li a {
    margin-left: 5px;
    line-height: 1.42857143;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
    padding-left: 90px;
    padding-right: 94px;
  }
</style>

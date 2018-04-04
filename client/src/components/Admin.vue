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
                          <router-link to="/">
                            <a class="top-link" href="/">Logout</a>
                          </router-link>
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
          <register></register>
        </div>
        <div id="reports" class="tab-pane fade">
          <div class="row">
            <div class="col-md-3">
              <div class="custom-search-input">
                <div class="input-group">
                    <input type="text" class="search-query form-control" placeholder="Search" name="report-keywords" />
                    <span class="input-group-btn">
                        <button class="btn btn-danger" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
              </div>
            </div>
            <div class="col-md-2">
               <div class="form-group report-type-container">
                  <label for="report-type">Type</label>
                  <select name="report-type" class="form-control">
                    <option value="Doctors">Doctors</option>
                    <option value="Pharmacists">Pharmacists</option>
                    <option value="Wholesalers">Wholesalers</option>
                    <option value="Hospitals">Hospitals</option>
                    <option value="Clinics">Clinics</option>
                  </select>
               </div>
            </div>
            <div class="col-md-2">
              <label for="report-from">From</label>
              <datepicker name="report-from"></datepicker>
            </div>
            <div class="col-md-2">
              <label for="report-to">To</label>
              <datepicker name="report-to"></datepicker>
            </div>
          </div>
          <div class="row">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Type</th>
                  <th scope="col">Date</th>
                  <th scope="col">Delegate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in reports">
                  <th scope="row">3</th>
                  <td>{{ report.type }}</td>
                  <td>{{ report.date | formatDate }}</td>
                  <td>{{ report.delegate.surname}}</td>
                </tr>
              </tbody>
            </table>
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
                    <th>Type</th>
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
import Register from './Register'
import Datepicker from 'vuejs-datepicker'
import ReportsService from '@/services/ReportsService'

export default {
  name: 'Admin',
  components: {
    'register': Register,
    Datepicker
  },
  data () {
    return {
      reports: []
    }
  },
  methods: {
    async getReports () {
      try {
        const response = await ReportsService.getReports()
        return response.data
      } catch (err) {
        return undefined
      }
    }
  },
  mounted: function () {
    this.getReports().then(data => this.reports = data)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* Credits to https://bootsnipp.com/dotstrap for this stylish search bar */
  .custom-search-input .search-query {
    padding-right: 3px;
    padding-right: 4px \9;
    padding-left: 3px;
    padding-left: 4px \9;
    margin-bottom: 0;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .custom-search-input button {
    border: 0;
    background: none;
    padding: 2px 5px;
    margin-top: 32px;
    position: relative;
    left: -28px;
    margin-bottom: 0;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    color:#D9230F;
  }
  .custom-search-input .search-query:focus + button {
    z-index: 3;
  }
  .custom-search-input .search-query button:focus{
    border-style: none;
  }
  .search-query{
    margin-top: 24px
  }
</style>

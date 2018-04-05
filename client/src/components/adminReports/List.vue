<!-- eslint-disable -->
<template>
  <div>
    <div class="row">
    <br>
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
          <select name="report-type" class="form-control" v-model="searchType">
            <option value="Doctor">Doctor</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Wholesaler">Wholesaler</option>
            <option value="Hospital">Hospital</option>
            <option value="Clinic">Clinic</option>
          </select>
       </div>
    </div>
    <div class="col-md-2">
      <label for="report-from">From</label>
      <datepicker name="report-from" v-model="dateFromFilter" :input-class="'form-control'"></datepicker>
    </div>
    <div class="col-md-2">
      <label for="report-to">To</label>
      <datepicker name="report-to" v-model="dateToFilter" :input-class="'form-control'" ></datepicker>
    </div>
    <div class="col-md-2">
      <br>
      <button class="btn btn-success btn-block" @click="filterReports">Search</button>
    </div>
    </div>
    <paginate ref="paginator"
          name="reports"
          :list="reports"
          :per="2"
        >
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Delegate</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        
          <tr v-for="(report, index) in paginated('reports')">
            <th scope="row">{{index + 1}}</th>
            <td>{{ report.date | formatDate }}</td>
            <td>{{ report.delegate.surname}}</td>
            <td v-if="report.status === 'Pending'"><span class="badge progress-bar-warning">{{report.status}}</span></td>
            <td v-if="report.status === 'Accepted'"><span class="badge progress-bar-success">{{report.status}}</span></td>
            <td v-if="report.status === 'Rejected'"><span class="badge progress-bar-danger">{{report.status}}</span></td>
            <td><button class="btn btn-primary" @click="viewReport(report._id)">View</button></td>
          </tr>
        
      </tbody>
    </table>
    </paginate>
    <div class="text-center">
      <paginate-links for="reports" :show-step-links="true"></paginate-links>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-return-assign */
import ReportsService from '@/services/ReportsService'
import Datepicker from 'vuejs-datepicker'
import AdminReport from '@/components/adminReports/Report'

export default {
  name: 'List',
  components: {
    Datepicker,
    'report': AdminReport
  },
  data () {
    return {
      reports: [],
      reportsCopy: [],
      dateFromFilter: null,
      dateToFilter: null,
      searchType: '',
      paginate: ['reports']
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
    },
    viewReport (id) {
      this.$parent.reportToApproveID = id
      this.$parent.singleReport()
    },
    filterReports () {
      console.log('List before fitler:', this.reports)
      /* if (!this.dateFromFilter) {
        this.reports = this.reports.filter(x => new Date(x.date) >= this.dateFromFilter)
      }
      if (!this.dateToFilter) {
        this.reports = this.reports.filter(x => new Date(x.date) <= this.dateToFilter)
      }
      /*if (this.searchType !== '') {
        console.log(this.searchType)
        this.reports = this.reports.filter(x => x.type === this.searchType)
        console.log('List after type fitler:', this.reports)
      } */
    }
  },
  mounted: function () {
    this.getReports().then(data => this.reports = data)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  ul.paginate-links{
    font-family: CamptonBold;
    font-size: 18px;
  }
  ul.paginate-links li{
    text-align: center;
    display: inline;
    margin: 10px;
    padding: 5px;
    padding-right: 8px;
    border: 1px solid rgb(54, 169, 206);
    border-radius: 15%;
  }
  ul.paginate-links li.active{
    background-color: rgb(54, 169, 206);
  }
  ul.paginate-links li.active a{
    color: white;
  }
  ul.paginate-links li.right-arrow, ul.paginate-links li.left-arrow{
    border: none;
  }
</style>

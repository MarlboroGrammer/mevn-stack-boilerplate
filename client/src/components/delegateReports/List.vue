<!-- eslint-disable -->
<template>
  <div>
    <h3>My reports</h3>
    <paginate ref="paginator"
      name="reports"
      :list="reports"
      :per="10"
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
        <tr v-for="(report, index) in  paginated('reports')">
          <th scope="row">{{index + 1}}</th>
          <td>{{ report.date | formatDate }}</td>
          <td>{{ report.delegate.surname}}</td>
          <td v-if="report.status === 'Pending'"><span class="badge progress-bar-warning">{{report.status}}</span></td>
          <td v-if="report.status === 'Accepted'"><span class="badge progress-bar-success">{{report.status}}</span></td>
          <td v-if="report.status === 'Rejected'"><span class="badge progress-bar-danger">{{report.status}}</span></td>
        </tr>
      </tbody>
    </table>
    </paginate>
    <div class="text-center">
      <paginate-links for="reports" :show-step-links="true" v-if="reports.length > 0"></paginate-links>
    </div>
  </div>
</template>

<script>
import ReportsService from '@/services/ReportsService'

export default {
  name: 'List',
  data () {
    return {
      reports: [],
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
    }
  },
  mounted: function () {
    this.getReports().then(reps => {
      reps = reps.filter(x => x.delegate._id === this.$store.getters.getDelegate)
      this.reports = reps
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul.paginate-links{
    font-family: CamptonBold;
    font-size: 18px;
    display: inline-flex;
    list-style: none;
    cursor: pointer;
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

<!-- eslint-disable -->
<template>
  <div>
    <h3>My reports</h3>
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
</template>

<script>
import ReportsService from '@/services/ReportsService'

export default {
  name: 'List',
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
    this.getReports().then(reps => {
      reps = reps.filter(x => x.delegate._id === this.$store.getters.getDelegate)
      this.reports = reps
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

import Api from '@/services/Api'

export default {
  getReports () {
    return Api().get('/reports/')
  },
  getReportsById (delegateId) {
    return Api().get(`/reports/delegate/${delegateId}`)
  },
  addReport (report) {
    return Api().post('/reports/add', report)
  }
}

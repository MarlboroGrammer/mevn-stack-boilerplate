import Api from '@/services/Api'

export default {
  getReports () {
    return Api().get('/reports/')
  }
}

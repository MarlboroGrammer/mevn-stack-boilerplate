import Api from '@/services/Api'

export default {
  getDelegate (credentialsId) {
    return Api().get(`/delegates/${credentialsId}`)
  },
  getDelegateById (delegateId) {
    return Api().get(`delegates/d/${delegateId}`)
  }
}

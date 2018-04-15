import Api from '@/services/Api'

export default {
  getSales () {
    return Api().get('sales/')
  }
}

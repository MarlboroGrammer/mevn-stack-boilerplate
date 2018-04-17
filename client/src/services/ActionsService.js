import Api from '@/services/Api'

export default {
  getActions () {
    return Api().get('actions')
  }
}

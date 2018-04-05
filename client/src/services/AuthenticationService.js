import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().get('users/register', credentials)
  },
  login (credentials) {
    return Api().post('users/authenticate', credentials)
  }
}

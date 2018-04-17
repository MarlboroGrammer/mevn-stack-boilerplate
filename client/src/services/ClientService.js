import Api from '@/services/Api'

export default {
  getClient () {
    return Api().get('clients/client')
  },
  
  addClient (client) {
    return Api().post('clients/client', client)
  }
  ,
  deleteClient (id) {
    return Api().delete('clients/client/'+id)
  },
  putClient (client) {
    return Api().put('clients/client/'+client._id,client)
}
}
/* eslint-disable */
import Api from '@/services/Api'

export default {
  insert (visit) {
    return Api().post('visits/admin/add', visit)
  },
  getVisits () {
    return Api().get('visits/admin/data')
  },
  deleteVisits(visit)
  {
     return Api().delete('visits/admin/data/'+visit._id)
  },
  putVisits(visit)
  {
    return Api().put('visits/admin/data/'+visit._id,visit)
  }
}
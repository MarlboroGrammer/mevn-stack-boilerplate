/* eslint-disable */
import Api from '@/services/Api'

export default {
  insert (visit) {
    return Api().post('visits/admin/add', visit)
  },
  getVisits () {
    return Api().get('visits/admin/data')
  },
  getVisitById (id) {
    return Api().get(`visits/admin/data/${id}`)
  },
  deleteVisits(visit)
  {
     return Api().delete('visits/admin/data/'+visit._id)
  },
  putVisits(visit)
  {
    return Api().put('visits/admin/data/'+visit._id,visit)
  },
  doVisit (id) {
    return Api().put(`visits/admin/done/${id}`)
  }
}
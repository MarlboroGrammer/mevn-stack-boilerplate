/* eslint-disable */
import Api from '@/services/Api'

export default {
  insert (presentation) {
    return Api().post('presentation/', presentation)
  },
  getPresentations () {
    return Api().get('presentation/')
  },
  getPresentation (id) {
    console.log('test api')
    console.log(id)
    return Api().get(`presentation/${id}`)
  }
}
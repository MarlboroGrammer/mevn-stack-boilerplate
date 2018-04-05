import Api from '@/services/Api'

export default {
  insert (product) {
    return Api().post('products/admin/add', product)
  },
  getProducts () {
    return Api().get('products/admin/display')
  },
  deleteProducts(product)
  {
     return Api().delete('products/admin/display/'+product._id)
  },
  putProducts(product)
  {
    return Api().put('products/admin/display/'+product._id,product)
  }
}
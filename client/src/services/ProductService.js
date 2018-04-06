import Api from '@/services/Api'

export default {
  insert (product) {
    return Api().post('products/', product)
  },
  getProducts () {
    return Api().get('products/')
  },
  deleteProducts(product)
  {
     return Api().delete('products/'+product._id)
  },
  putProducts(product)
  {
    return Api().put('products/'+product._id,product)
  }
}
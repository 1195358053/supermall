import {ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
export default {
    addCart(context, payload) {
      return new Promise((resolve,reject) => {


        // 判断传来的商品的iid是否与购物车商品的iid相等，判断商品是否已经存在
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit(ADD_COUNTER, payload);
        resolve('当前的商品数量+1')
      } else {
        context.commit(ADD_TO_CART, payload);
        resolve('添加了新的商品') 
      }


      })
    }
  
}
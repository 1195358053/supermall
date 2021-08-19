import {ADD_COUNTER,
        ADD_TO_CART
} from './mutation-types'

export default {
    // mutations是用于改变state的状态，vuex对数据进行跟踪
    [ADD_COUNTER](state, payload) {
        for(let i of state.cartList) {
            if(i.iid === payload.iid){
                i.count++
            }
            console.log(state.cartList)
        }
      },
      [ADD_TO_CART](state, payload) {
        payload.count = 1;
        payload.isChecked = false
        state.cartList.push(payload)
        // console.log(state.cartList)
      }
}
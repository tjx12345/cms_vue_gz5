 import GoodsTools from '../components/goods/goodsTools.js';
 let Cart = {
     state: {
         prods: GoodsTools.get()
     },
     mutations: {
         add(state, product) {
             state.prods.push(product);
             GoodsTools.save(state.prods);
         },
         addNum(state, index, num) {
             state.prods[index].num += num;
             GoodsTools.save(state.prods);
         },
         addNum(state, index) {
             state.prods[index].num++;
         },
         save(state, prods) {
             state.prods = prods;
             GoodsTools.save(state.prods);
         },
         subNum(state, index) {
             state.prods[index].num--;
         },
         del(state, index) {
             state.prods.splice(index, 1);
             GoodsTools.save(state.prods);
         }
     },
     actions: {
         addProdToCart({ getters, commit }, prod) {
             let shopCart = getters.getProds;
             let index = shopCart.findIndex(function(p) {
                 return p.id == prod.id;
             });
             if (index === -1) {
                 commit('add', prod);
             } else {
                 commit('addNum', {
                     index,
                     num: prod.num
                 });
             }
         },
         saveNewCart({ commit }, prods) {
             commit('save', prods);
         },
         subProdNum({ commit }, index) {
             commit('subNum', index);
         },
         addProdNum({ commit }, index) {
             commit('addNum', index);
         },
         delProd({ commit }, index) {
             commit('del', index);
         }
     },
     getters: {
         getProds(state) {
             return state.prods;
         },
         getTotalCount(state) {
             let sum = 0;
             state.prods.forEach(function(ele) {
                 sum += ele.num;
             });
             return sum;
         },
         payment(state) {
             let pickCount = 0;
             let pickPrice = 0;
             let tmp = state.prods;
             for (var i = tmp.length - 1; i >= 0; i--) {
                 if (tmp[i].isSelected) {
                     pickCount++;
                     pickPrice += tmp[i].sell_price * tmp[i].num;
                 }
             }
             return {
                 pickPrice,
                 pickCount
             }
         }
     }
 }

 export default Cart;

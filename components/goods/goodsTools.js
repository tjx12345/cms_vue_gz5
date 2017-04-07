export default {
    addCart(prodId, num) {
            let shopCart = this.get();
            let goods = shopCart.find(function(prod) {
                return prod.id == prodId;
            });
            if (!goods) {
                shopCart.push({ id: prodId, num })
            } else {
                goods.num += num;
            }

            this.save(shopCart);

        },
        save(shopCart) {
            localStorage.setItem('goods', JSON.stringify(shopCart));
        },
        get() {
            return JSON.parse(localStorage.getItem('goods') || '[]');
        },
        getTotalCount() {
            let sum = 0;
            this.get().forEach(function(ele) {
                sum += ele.num;
            });
            return sum;
        },
        delCart(index) {
            let newCart = this.get().splice(index, 1);
            this.save(newCart);
        }
}

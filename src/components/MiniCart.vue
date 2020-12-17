<template>
    <div class="mini-cart">
        <b-modal id="mini-cart" size="xl" title="My Bag" hide-footer>
            <ul>
                    <li :key="index" v-for="(item, index) in this.$store.state.cart" class="media">
                      <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
                      <div class="media-body">
                        <h5 class="mt-0">{{item.productName}}

                          <span class='float-right' @click="$store.commit('removeFromCart',item)">X</span>
                        </h5>
                        <p class="mt-0">{{item.productPrice | currency}}</p>
                        <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                      </div>
                    </li>

            </ul>
                  <div class="form-group float-right">
                       <button type="button" class="btn btn-secondary m-1" data-dismiss="modal">Continue Shopping</button>
                       <button type="button" class="btn btn-primary" @click="checkout">Checkout</button>
                  </div>
         </b-modal>
    </div>
</template>

<script>
export default {
    name: 'MiniCart',
    props: {
    msg: String
  },
   methods:{
    checkout(){
      
      this.$router.push('/checkout')  
    }
  }
}
</script>
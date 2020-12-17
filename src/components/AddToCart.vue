<template>
  <div class="add-to-cart">
   
        <button class="btn btn-primary" @click="addToCart"  v-b-modal.mini-cart> Add to Cart </button>
    
  </div>
</template>

<script>
export default {
  name: "add-to-cart",
  props: {
    name: String,
    price: String,
    image: String,
    pId: String
  },
  data(){
      return {
         item :{
            productName: this.name,
            productImage: this.image,
            productPrice: this.price,
            productId: this.pId,
            productQuantity: 1,
          }
      }
  },
  methods:{
    addToCart(){
      this.$store.commit('addToCart', this.item);
      
    }
  }
};
</script>




<template>
  <div>
    <nav-bar />
    <Hero />
     <products-list></products-list>
      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="../assets/img/product.svg" alt="" width="400">
          </div>
          <div class="col-md-6">
            <h3>Learn More About us</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
            </p>
             <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
          </div>
        </div>
      </div>
    <Login />
    <mini-cart></mini-cart>

  </div>
</template>

<script>
import Products from "@/sections/Products.vue";
import Login from './Login.vue';
export default {
  name: 'Home',
  components: {
    Login, Products
  }
}
</script>



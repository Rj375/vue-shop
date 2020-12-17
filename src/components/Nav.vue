<template>
  <div id="nav">
 <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand href="#/" class="logo" style="font-weight: bold; font-size: 28px; color: #fff;">Vue Shop
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>


      <b-navbar-nav class="ml-auto">
       
        <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
        <b-nav-item><router-link to="/products">Products</router-link></b-nav-item>
        <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
        


      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
           <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
         <b-button class="btn btn-secondary" v-b-modal.login>Get Started</b-button>
         <a class="btn btn-outline-info border-0 mx-2 my-2 my-sm-0" v-b-modal.mini-cart>
              <i class="fas fa-cart-plus"></i>
            </a>
         
        </b-nav-form>
      </b-navbar-nav>

    </b-collapse>

    
  </b-navbar>
</div>
</template>

<script>

export default {
  name: 'NavBar',
  
 
}
</script>



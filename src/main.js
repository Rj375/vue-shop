import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {fb} from './firebase'
import VueFirestore from 'vue-firestore'
import '@/assets/scss/main.scss'
import '@/assets/scss/admin.scss'
import '@/assets/scss/checkout.scss'
import '@/assets/scss/admin-theme.scss'
import jQuery from 'jquery'
import 'popper.js'
import Swal from 'sweetalert2'
import VueCarousel from 'vue-carousel';
import Vue2Filters from 'vue2-filters'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.component('Hero', require('./components/Hero.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('NavBar', require('./components/Nav.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);
Vue.component('products-list', require('./sections/ProductList.vue').default);

require('firebase/firestore')

Vue.use(VueFirestore, {
    key: 'id',         // the name of the property. Default is '.key'.
    enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.use(VueFirestore)
Vue.use(VueCarousel)
Vue.use(Vue2Filters)
Vue.config.productionTip = false

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;
window.$ = window.jQuery = jQuery;
window.Swal = Swal;


let app = '';
fb.auth().onAuthStateChanged(function(user) {
   if(!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
   }
});




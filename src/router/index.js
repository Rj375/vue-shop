import Vue from 'vue'
import VueRouter from 'vue-router'
import {fb} from '../firebase'


Vue.use(VueRouter)

const routes = [
  {
     path: '/',
     name: 'Home',
     component: () => import('../components/Home.vue')
  },
 
  {
     path: '/about',
     name: 'About',
     component: () => import('../components/About.vue')
  },
  {
     path: '/products',
     name: 'Products',
     component: () => import('../sections/Products.vue')
  },
  {
     path: '/checkout',
     name: 'Checkout',
     component: () => import('../components/Checkout.vue')
  },
  
    

  {
     path: '/admin',
     name: 'Admin',
     component: () => import('../admin-panel/Admin.vue'),
     meta: { requiresAuth: true },
     //nested routing ho yo
     children: [
        {
         path: 'overview',
         name: 'Overview',
         component: () => import('../admin-panel/Overview.vue')
        },
        {
         path: 'products',
         name: 'Products',
         component: () => import('../admin-panel/Products.vue')
        },
        {
         path: 'orders',
         name: 'Orders',
         component: () => import('../admin-panel/Orders.vue')
        },
        {
         path: 'profile',
         name: 'Profile',
         component: () => import('../admin-panel/Profile.vue')
        }
     ]
     
  }
 

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
   const currentUser = fb.auth().currentUser
 
   if (requiresAuth && !currentUser) {
       next('/')
   } else if (requiresAuth && currentUser) {
       next()
   } else {
       next()
   }
 })

export default router

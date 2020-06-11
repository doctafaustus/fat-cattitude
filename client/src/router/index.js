import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/items/:category',
      name: 'ProductListing',
      component: () => import('@/views/ProductListing.vue')
    },
    {
      path: '/item/:id',
      name: 'Product',
      component: () => import('@/views/ProductPage.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/Cart.vue')
    },
    {
      path: '/order-confirmation',
      name: 'OrderConfirmation',
      alias: '/order-status',
      component: () => import('@/views/OrderConfirmation.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/views/Help.vue')
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('@/views/PrivacyPolicy.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Ignore if just using $router.replace() with params
    if (to.path === from.path && Object.keys(to.query).length) return;
    return { x: 0, y: 0 };
  }
});



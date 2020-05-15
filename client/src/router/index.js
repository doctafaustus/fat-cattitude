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
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Ignore if just using $router.replace() with params
    if (to.path === from.path && Object.keys(to.query).length) return;
    return { x: 0, y: 0 };
  }
});



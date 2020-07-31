// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


Vue.filter('toCurrency', value => {
  if (typeof value !== 'number') return value;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  return formatter.format(value);
});

window.baseURL = (window.location.host.includes('fatcattitude.com')) ? 
`https://${window.location.host}/api` : 'http://localhost:8081/api';
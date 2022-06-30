import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Toast from 'vue-toastification';

Vue.use(Vuelidate)
Vue.use(Toast, { timeout: 5000 });

Vue.component('Pagination', require('laravel-vue-pagination'));



import Main from './layouts/Main'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-toastification/dist/index.css';
import 'vue2-datepicker/index.css';

new Vue({
  router,
  store,
  render: h => h(Main)
}).$mount('#app')

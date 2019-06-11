import Vue from 'vue';
import App from './App';
import './js/register-sw';
import './style/reset.less';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});

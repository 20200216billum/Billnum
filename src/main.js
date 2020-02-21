// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router';
import Barrage from './shujudata/barrage.js' //加载弹幕文件
import Explosioneffect from './shujudata/explosioneffect.js' //加载弹幕文件
import VueCookies from 'vue-cookies';  //引入cookies插件
import i18n from './i18n/index.js'; //引入语言包
import Axios from './shujuData/api.js'; //加载接口文件
import Public from './shujuData/public.js'; //加载公用js方法文件
import LangFn from './shujuData/lang.js'; //翻译
import store from "./store/index.js";
import 'babel-polyfill';  //兼容ie
import md5 from 'js-md5';
import 'animate.css';
import 'swiper/dist/css/swiper.min.css';

// import "./assets/index.less"; //  加载less
import "./assets/font_wskz/iconfont.css"; //  加载图标
Vue.use(VueCookies);

Vue.config.productionTip = false
Vue.prototype.$barrage = Barrage;
Vue.prototype.$explosioneffect = Explosioneffect;
Vue.prototype.$http= Axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$public = Public;
Vue.prototype.$LangFn = LangFn;

Axios.get(Axios.translates, {params:{}}).then(res => {
  if (res.data.code == 200) {
      store.commit("setLangArr", res.data.data)
  }
})

Vue.use(ElementUI,{
  i18n: function(path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  }
  //i18n:(key,value) =>i18n.t(key,value) //重点！！在注册Element时设置i18n的处理方法（这里有个小坑）
});
// 设置一个cookie
// this.$cookies.set("default_unit_second","input_value","0");

// Vue.$cookies.get(keyName)  //获取一个cookie


// 删除一个cookie
// Vue.$cookies.remove(keyName [, path [, domain]]) 
/* eslint-disable no-new */

// 跳转页面后，到下一个页面顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0)
})

new Vue({
  el: '#app',
  i18n: i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})

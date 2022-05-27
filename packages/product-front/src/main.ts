import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi from "@vue/composition-api";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

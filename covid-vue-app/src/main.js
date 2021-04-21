import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

//We want to use VueRouter to set up the routes.
import { routes } from "./routes";
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes,
});

//Mount the application.
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");

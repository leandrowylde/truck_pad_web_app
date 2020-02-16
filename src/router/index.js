import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewDriver from "../views/NewDriver.vue";
import EditDriver from "../views/EditDriver.vue";
import Drivers from "../views/Drivers.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/drivers/new",
    name: "NewDriver",
    component: NewDriver
  },
  {
    path: "/drivers/:id",
    name: "EditDriver",
    component: EditDriver
  },
  {
    path: "/drivers",
    name: "Drivers",
    component: Drivers
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;

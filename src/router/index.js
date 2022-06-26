import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [

  {
    path: "/test",
    name: "test",
    component: () =>
      import( "../views/test/test.vue"),
  },

  {
    path: "/register",
    name: "register",
    component: () =>
      import( "../views/login/register.vue"),
  },
  {
    path: "/",
    name: "login",
    component: () =>
      import( "../views/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/ts",
    name: "teacherAndstudent",
    component: () =>
    import( "../views/teacherAndstudent/index.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

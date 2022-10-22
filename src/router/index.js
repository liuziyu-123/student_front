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
    path: "/studentCourse",
    name: "studentCourse",
    component: () =>
    import( "../views/student/course/index.vue"),
  },

  {
    path: "/teacherCourse",
    name: "teacherCourse",
    component: () =>
    import( "../views/teacher/course/index.vue"),
  },

  {
    path: "/subject",
    name: "subject",
    component: () =>
    import( "../views/subject/index.vue"),
  },

  {
    path: "/grade",
    name: "grade",
    component: () =>
    import( "../views/grade/index.vue"),
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

  {
    path: "/clas",
    name: "clas",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/system/class/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

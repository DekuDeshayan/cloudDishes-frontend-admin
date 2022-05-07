import { createRouter, createWebHistory } from "vue-router";
import AdminDashboard from "../views/pages/AdminDashboard.vue";
import AdminTemplate from "../views/AdminTemplate.vue";
import Login from "../views/pages/Login.vue";
import NotFound from "../views/errors/404.vue";
import Unauthorized from "../views/errors/401.vue";
import Receptionist from "../views/pages/Receptionist.vue";
import Customer from "../views/pages/Customer.vue";
import Manager from "../views/pages/Manager.vue";
import Restaurant from "../views/pages/Restaurant.vue";
import Role from "../models/enums/Role";
import Store from "../store/index";


const routes = [
  {
    path: "/",
    component: AdminTemplate,
    children : [
      {
        path: "",
        name: "dashboard",
        component: AdminDashboard,
        meta : {roles : [Role.ADMIN, Role.MANAGER, Role.RECEPTIONIST]},
      },
      {
        path: "receptionist",
        name: "receptionist",
        component: Receptionist,
        meta : {roles : [Role.MANAGER, Role.ADMIN]},
      },
      {
        path: "customer",
        name: "customer",
        component: Customer,
        meta : {roles : [Role.MANAGER, Role.ADMIN]},
      },
      {
        path: "manager",
        name: "manager",
        component: Manager,
        meta : {roles : [Role.MANAGER, Role.ADMIN]},
      },
      {
        path: "restaurant",
        name: "restaurant",
        component: Restaurant,
        meta : {roles : [Role.MANAGER, Role.ADMIN]},
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    name: "404",
    path: "/404",
    component: NotFound,
  },
  {
    name: "401",
    path: "/401",
    component: Unauthorized,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

/*
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "admin-dashboard",
    component: AdminDashboard,
  },
  {
    name : "notfound",
    path: "/404",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];
*/


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const {roles} = to.meta;
  const currentUser = Store.getters['currentUser'];

  if(roles?.length){
    if (!currentUser){
      return next({path: '/login'});
    }

    if(!roles.includes(currentUser.role)){
      return next({path : '/401'})
    }
  }
  
  next();
});


export default router;

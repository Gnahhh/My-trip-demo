import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),

  // path => component
  routes: [
    {
      path: "/redirect",
      component: () => import('../views/home/Home.vue'),
    },
    {
      path: "/home",
      component: () => import('../views/home/Home.vue'),
    },
    {
      path: "/favor",
      component: () => import('../views/favor/Favor.vue'),
    },
    {
      path: "/order",
      component: () => import('../views/order/Order.vue'),
    },
    {
      path: "/message",
      component: () => import('../views/message/Message.vue'),
    },
    {
      path: "/city",
      component: () => import('../views/city/City.vue'),
      meta: { notShowTabbar: true } // 不显示Tabbar
    }
  ]
});

export default router;

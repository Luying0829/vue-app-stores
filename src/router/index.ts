import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'appSearch',
      component: ()=> import('../views/search/indexPage.vue')
    },
    {
      path: "/appDetail",
      name: 'appDetail',
      component: ()=> import('../views/detail/AppDetail.vue')
    }
  ]
})

export default router

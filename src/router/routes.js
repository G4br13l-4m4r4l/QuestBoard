const routes = [
  {
    path: '/login',
    component: () => import('../pages/login/Login.vue'),
  },
  {
    path: '/',
    component: () => import('../pages/index.vue'),
  },
]
export default routes

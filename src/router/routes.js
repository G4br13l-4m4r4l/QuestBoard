const routes = [
  {
    path: '/login',
    component: () => import('../pages/login/Login.vue'),
  },
  {
    path: '/',
    component: () => import('../pages/index.vue'),
    children: [
      {
        path: 'config',
        component: () => import('../pages/config/config.vue'),
      },
    ],
  },
]
export default routes

const sectionPage = () => import('../pages/SectionPage.vue')

const routes = [
  { path: '/login', component: () => import('../pages/login/Login.vue') },
  {
    path: '/',
    component: () => import('../pages/index.vue'),
    children: [
      { path: 'sessoes', component: sectionPage, props: { section: 'sessoes' } },
      { path: 'campanhas', component: sectionPage, props: { section: 'campanhas' } },
      { path: 'biblioteca', component: sectionPage, props: { section: 'biblioteca' } },
      { path: 'missoes', component: sectionPage, props: { section: 'missoes' } },
      { path: 'votacoes', component: sectionPage, props: { section: 'votacoes' } },
      { path: 'ferramentas', component: sectionPage, props: { section: 'ferramentas' } },
      { path: 'config', component: () => import('../pages/config/config.vue') },
    ],
  },
]

export default routes

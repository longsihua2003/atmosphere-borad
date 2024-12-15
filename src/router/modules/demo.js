export default [
  {
    path: '/',
    // 跳转到borad
    redirect: '/borad',
  },
  {
    path: '/borad',
    name: 'borad',
    component: () => import('@/views/BoradView.vue'),
    meta: {
      title: '襄荆高速公路路面压电俘能现场监控可视化平台',
    },
  },
];

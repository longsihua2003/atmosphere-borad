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
  },
];

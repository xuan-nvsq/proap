import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: '默认路径',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/register',
    name: '注册第一页',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/reregister',
    name: '注册第二页',
    component: () => import('../views/Reregister.vue'),
  },
  {
    path: '/forget',
    name: '忘记密码',
    component: () => import('../views/Forget.vue'),
  },
  {
    path : '/select',
    name : '选择端口',
    component: () => import('../views/Select.vue'),
  },
  {
    path: '/userverification',
    name: '用户端验证',
    component: () => import('../views/Userverification.vue'),
  },
  {
    path: '/user',
    name: '用户端首页',
    component: () => import('../views/user/User.vue'),
    children: [
      {
        path: 'uhome',
        name: '用户端总览',
        component: () => import('../views/user/Uhome.vue'),
      },
      {
        path: 'udialogue',
        name: '用户大模型对话',
        component: () => import('../views/user/Udialogue.vue'),
      },
      {
        path: 'ulibrary',
        name: '用户知识库',
        component: () => import('../views/user/Ulibrary.vue'),
      },
      {
        path: 'umanage',
        name: '用户信息管理',
        component: () => import('../views/user/Umanage.vue'),
      }]
},
{
  path: '/doctor',
  name: '医生端总览',
  component: () => import('../views/docter/Doctor.vue'),
  children: [
    {
      path: 'dhome',
      name: '医生端首页',
      component: () => import('../views/docter/Dhome.vue'),
    },
    {
      path: 'dcontroldata',
      name: '医生端数据管理页面',
     component: () => import('../views/docter/Dcontroldata.vue'),
    },
    {
      path: 'democlassify',
      name: '医生端情绪分析页面',
      component: () => import('../views/docter/Democlassify.vue'),
    },
    {
      path: 'dmanage',
      name: '医生端信息管理页面',
      component: () => import('../views/docter/Dmanage.vue'),
    }]
},
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
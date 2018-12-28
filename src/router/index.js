import App from '../App'

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //页面为空的时候默认跳转到登录页
    {
      path: '',
      component: r => require.ensure([], () => r(require('../components/login/Login')), 'login')
    },
    {
      path: 'index',
      component: r => require.ensure([], () => r(require('../components/Index')), 'index')
    },
    {
      path: 'spotindex',
      component: r => require.ensure([], () => r(require('../components/Home/Index')), 'spotindex')
    },
    {
      path: 'menu',
      component: r => require.ensure([], () => r(require('../components/common/Menu')), 'Menu')
    },
    ],
}]

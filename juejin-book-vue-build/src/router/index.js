import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// 异步引入 Home 组件
// const Home = resolve => {
//   require.ensure(['../views/Home.vue'], () => {
//     resolve(require('../views/Home.vue'))
//   })
// }
// const About = resolve => {
//   require.ensure(['../views/About.vue'], () => {
//     resolve(require('../views/About.vue'))
//   })
// }
// 给文件命名 /* webpackChunkName: "about" */
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')

Vue.use(VueRouter)
const base = `${process.env.BASE_URL}` // 获取二级目录
console.log(base)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: base, // 设置 base 值
  // base: process.env.BASE_URL,
  routes
})

export default router

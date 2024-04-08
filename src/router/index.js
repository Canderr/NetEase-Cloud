import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import HomeView from '../views/Home.vue'
import ItemMusic from '../views/ItemMusic.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import InfoUser from '../views/InfoUser.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ItemMusic',
    name: 'ItemMusic',
    component: ItemMusic
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/InfoUser',
    name: 'InfoUser',
    // 局部路由守卫，判断用户是否登录跳转页面
    beforeEnter: (to, from, next) => {
      if(store.state.Islogin){
        next()
        console.log(store.state.Islogin)
      }else{
        next('/Login')
        console.log(store.state.Islogin)
      }
    },
    component: InfoUser
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

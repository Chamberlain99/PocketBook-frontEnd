// router/index.js
import Home from '@/container/Home'
import Data from '@/container/Data'
import User from '@/container/User'
import Detail from '@/container/Detail'
import Login from '@/container/Login'
import UserInfo from '@/container/UserInfo'
// import Account from '@/container/Account'

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/userinfo",
    component: UserInfo
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/detail",
    component: Detail
  },
  {
    path: "/login",
    component: Login
  },
  // {
  //   path: "/account",
  //   component: Account
  // },
  
];

export default routes
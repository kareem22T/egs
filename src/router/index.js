import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ForgotPassView from '../views/ForgotPassView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import ChangePassView from '../views/ChangePassView.vue'
import VerifyView from '../views/VerifyView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/forgot-password',
    name: 'forgot_password',
    component: ForgotPassView
  },
  {
    path: '/edit-profile',
    name: 'edit_profile',
    component: EditProfileView
  },
  {
    path: '/change-password',
    name: 'change_password',
    component: ChangePassView
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

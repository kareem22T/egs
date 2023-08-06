import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TermsView from '../views/TermsView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ForgotPassView from '../views/ForgotPassView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import ChangePassView from '../views/ChangePassView.vue'
import ResetPassView from '../views/ResetPassView.vue'
import VerifyView from '../views/VerifyView.vue'

import authMiddleware from '@/middleware/auth';
import guestMiddleware from '@/middleware/guest';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { auth: false }
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsView,
    meta: { auth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { auth: false, guest: true}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { auth: false, guest: true }
  },
  {
    path: '/forgot-password',
    name: 'forgot_password',
    component: ForgotPassView,
    meta: { auth: false }
  },
  {
    path: '/reset-password',
    name: 'reset_password',
    component: ResetPassView,
    meta: { auth: false }
  },
  {
    path: '/edit-profile',
    name: 'edit_profile',
    component: EditProfileView,
    meta: { auth: true }
  },
  {
    path: '/change-password',
    name: 'change_password',
    component: ChangePassView,
    meta: { auth: true }
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyView,
    meta: { auth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(guestMiddleware);
router.beforeEach(authMiddleware);
export default router

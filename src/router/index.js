import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DealsView from '../views/DealsView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'
import TermsView from '../views/TermsView.vue'
import FaqView from '../views/FaqView.vue'
import NewsView from '../views/NewsView.vue'
import ArticleView from '../views/ArticleView.vue'
import WishlishView from '@/views/WishlishView.vue'
import CartView from '@/views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import OrdersView from '@/views/OrdersView.vue'
import OrderView from '@/views/OrderView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ForgotPassView from '../views/ForgotPassView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import ChangePassView from '../views/ChangePassView.vue'
import ResetPassView from '../views/ResetPassView.vue'
import VerifyView from '../views/VerifyView.vue'
import SearchView from '../views/SearchView.vue'

import CategoryView from '../views/CategoryView.vue'
import PhysicalStoreView from '../views/PhysicalStoreView.vue'
import DigitalStoreView from '../views/DigitalStoreView.vue'
import ProductView from '../views/ProductView.vue'
import CardView from '../views/CardView.vue'

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
    path: '/deals',
    name: 'deals',
    component: DealsView,
    meta: { auth: false }
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactView,
    meta: { auth: false }
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: AboutView,
    meta: { auth: false }
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsView,
    meta: { auth: false }
  },
  {
    path: '/faq',
    name: 'faq',
    component: FaqView,
    meta: { auth: false }
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView,
    meta: { auth: false }
  },
  {
    path: '/news/:id',
    name: 'newsView',
    component: ArticleView,
    meta: { auth: false }
  },
  {
    path: '/my-wishlist',
    name: 'wishlist',
    component: WishlishView,
    meta: { auth: true }
  },
  {
    path: '/my-cart',
    name: 'cart',
    component: CartView,
    meta: { auth: true }
  },
  {
    path: '/my-orders',
    name: 'orders',
    component: OrdersView,
    meta: { auth: true }
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
    meta: { auth: false }
  },
  {
    path: '/physical-store/:name/:id',
    component: PhysicalStoreView,
    meta: {type: 1, category_name: 'Physical Store', category_path: 'physical-store'}
  },
  {
    path: '/checkout',
    component: CheckoutView
  },
  {
    path: '/order/:id',
    component: OrderView,
  },
  {
    path: '/digital-store/:name/:id',
    component: DigitalStoreView,
    meta: {type: 1, category_name: 'Digital Store', category_path: 'digital-store'}
  },
  {
    path: '/digital-store/sub_category/:name/:id',
    component: DigitalStoreView,
    meta: {type: 2, category_name: 'Digital Store', category_path: 'digital-store'}
  },
  {
    path: '/digital-store/:countray_name/:country_id/:category_name/:id',
    component: DigitalStoreView,
    meta: {type: 3, category_name: 'Digital Store', category_path: 'digital-store'}
  },
  {
    path: '/product/:id',
    component: ProductView,
  },
  {
    path: '/card/:id',
    component: CardView,
  },
  {
    path: '/category',
    component: CategoryView,
    children: [
      {
        path: '/category/:cat',
        component: CategoryView,
      },
      {
        path: '/category/World2Egypt',
        component: CategoryView,
        meta: {id: 1, type: 0}
      },
      {
        path: '/category/physical-store',
        component: CategoryView,
        meta: {id: 2, type: 0, category_name: 'Physical Store', category_path: 'physical-store'},
      },
      {
        path: '/category/digital-store',
        component: CategoryView,
        meta: {id: 3, type: 0, category_name: 'Digital Store', category_path: 'digital-store'}
      },
    ],
  },
  {
    path: '/search/:search',
    component: SearchView
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(guestMiddleware);
router.beforeEach(authMiddleware);
export default router

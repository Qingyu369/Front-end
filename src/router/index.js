import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Index.vue';
import All from '../views/allgames.vue';
import DiscountsGames from '../views/DiscountsGames.vue';
import MyShopping from '../views/MyShopping.vue';
import MyItems from '../views/MyItems.vue';
import MyItemsAd from '../views/MyItemsAd.vue';
import IndexManager from '../views/IndexManager.vue';
import AllgamesManager from '../views/AllgamesManager.vue';
import DiscountsGamesManager from '../views/DiscountsGamesManager.vue';
import MyGames from '../views/MyGames.vue';
import MyGamesAd from '../views/MyGamesAd.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/allgames',
    name: 'All',
    component: All
  },
  {
    path: '/DiscountsGames',
    name: 'Discounts',
    component: DiscountsGames
  },
  {
    path: '/MyShopping',
    name: 'MyShopping',
    component: MyShopping
  },
  {
    path: '/MyItems',
    name: 'MyItems',
    component: MyItems
  },
  {
    path: '/MyItemsAd',
    name: 'MyItemsAd',
    component: MyItemsAd
  },
  {
    path: '/IndexManager',
    name: 'IndexManager',
    component: IndexManager
  },
  {
    path: '/AllgamesManager',
    name: 'AllgamesManager',
    component: AllgamesManager
  },
  {
    path: '/DiscountsGamesManager',
    name: 'DiscountsGamesManager',
    component: DiscountsGamesManager
  },
  {
    path: '/MyGames',
    name: 'MyGames',
    component: MyGames
  },
  {
    path: '/MyGamesAd',
    name: 'MyGamesAd',
    component: MyGamesAd
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/UserRegister',
    name: 'UserRegister',
    component: UserRegister
  },
  // 可以在这里添加其他路由
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
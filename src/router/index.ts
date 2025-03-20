/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import Home from "../pages/index.vue";
import Rocket from "../pages/rockets/containers/index.vue";
import RocketDetail from "../pages/rockets/containers/detail.vue";
import RocketCreate from "../pages/rockets/containers/create.vue";

const routes = [
  {
    path: "/",
    name: "homepage",
    component: Home,
  },
  {
    path: "/rockets",
    name: "rockets",
    component: Rocket,
  },
  {
    path: "/rockets/:id",
    name: "RocketDetail",
    component: RocketDetail,
    props: true,
  },
  {
    path: "/rockets/create",
    name: "RocketCreate",
    component: RocketCreate,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

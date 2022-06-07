import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _31319b30 = () => interopDefault(import('../pages/clientes/index.vue' /* webpackChunkName: "pages/clientes/index" */))
const _7a260cd1 = () => interopDefault(import('../pages/produtos/index.vue' /* webpackChunkName: "pages/produtos/index" */))
const _6d8a0c4c = () => interopDefault(import('../pages/clientes/novo.vue' /* webpackChunkName: "pages/clientes/novo" */))
const _5f60628b = () => interopDefault(import('../pages/produtos/novo.vue' /* webpackChunkName: "pages/produtos/novo" */))
const _c0b37bf0 = () => interopDefault(import('../pages/produtos/components/form-produto.vue' /* webpackChunkName: "pages/produtos/components/form-produto" */))
const _06f6d564 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/clientes",
    component: _31319b30,
    name: "clientes"
  }, {
    path: "/produtos",
    component: _7a260cd1,
    name: "produtos"
  }, {
    path: "/clientes/novo",
    component: _6d8a0c4c,
    name: "clientes-novo"
  }, {
    path: "/produtos/novo",
    component: _5f60628b,
    name: "produtos-novo"
  }, {
    path: "/produtos/components/form-produto",
    component: _c0b37bf0,
    name: "produtos-components-form-produto"
  }, {
    path: "/",
    component: _06f6d564,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

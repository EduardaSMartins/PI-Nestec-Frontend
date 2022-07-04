import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _31319b30 = () => interopDefault(import('../pages/clientes/index.vue' /* webpackChunkName: "pages/clientes/index" */))
const _7a260cd1 = () => interopDefault(import('../pages/produtos/index.vue' /* webpackChunkName: "pages/produtos/index" */))
const _6d8a0c4c = () => interopDefault(import('../pages/clientes/novo.vue' /* webpackChunkName: "pages/clientes/novo" */))
const _3859790a = () => interopDefault(import('../pages/clientes/components/form-cadastro.vue' /* webpackChunkName: "pages/clientes/components/form-cadastro" */))
const _c0b37bf0 = () => interopDefault(import('../pages/produtos/components/form-produto.vue' /* webpackChunkName: "pages/produtos/components/form-produto" */))
const _c06d3224 = () => interopDefault(import('../pages/produtos/novo/novo.vue' /* webpackChunkName: "pages/produtos/novo/novo" */))
const _171ab212 = () => interopDefault(import('../pages/produtos/editar/_id.vue' /* webpackChunkName: "pages/produtos/editar/_id" */))
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
    path: "/clientes/components/form-cadastro",
    component: _3859790a,
    name: "clientes-components-form-cadastro"
  }, {
    path: "/produtos/components/form-produto",
    component: _c0b37bf0,
    name: "produtos-components-form-produto"
  }, {
    path: "/produtos/novo/novo",
    component: _c06d3224,
    name: "produtos-novo-novo"
  }, {
    path: "/produtos/editar/:id?",
    component: _171ab212,
    name: "produtos-editar-id"
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

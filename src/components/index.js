import esIdentify from './identify/index.js'
let components = {
  esIdentify
}

const install = function (Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[ key ])
  })
}

export default Object.assign(components, {install})

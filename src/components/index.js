import qmcIdentify from './identify/index.js'
let components = {
  qmcIdentify
}

const install = function (Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[ key ])
  })
}

export default Object.assign(components, {install})

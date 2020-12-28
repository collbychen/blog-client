import Vue from 'vue'

const getErr = (err, _this, info) => {
  _this.$store.dispatch('getErr', {
    err: err.stack,
    hook: info
  })
}

const errorCatch = (err, vm, info) => {
  getErr(err, vm, info)
}

Vue.config.errorHandler = errorCatch

Vue.prototype.$throw = (err, vm, info) => errorCatch(err, vm, info)

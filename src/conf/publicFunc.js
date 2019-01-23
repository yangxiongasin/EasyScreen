
const PBULICFUNC = {
  getDate() {
    let date = new Date()
    let dataVal = ''
    dataVal += date.getFullYear() + '-'
    date.getMonth() >= 9 ? dataVal += (date.getMonth() + 1) + '-' : dataVal += '0' + (date.getMonth() + 1) + '-'
    date.getDate() >= 9 ? dataVal += (date.getDate()) + ' ' : dataVal += '0' + (date.getDate()) + ' '
    date.getHours() >= 9 ? dataVal += (date.getHours()) + ':' : dataVal += '0' + (date.getHours()) + ':'
    date.getMinutes() >= 9 ? dataVal += (date.getMinutes()) + ':' : dataVal += '0' + (date.getMinutes()) + ':'
    date.getSeconds() >= 9 ? dataVal += (date.getSeconds()) : dataVal += '0' + (date.getSeconds()) + ''
    return dataVal
  },
  packedArray (arr, objVal) {
    let result = []
    let hash = {}
    for (let i = 0; i < arr.length; i++) {
      let elem = arr[i][objVal]
      if (!hash[elem]) {
        result.push(arr[i])
        hash[elem] = true
      }
    }
    return result
  },
  packedArrayDelete (val, oldval) {
    for (let i = 0; i < val.length; i++) {
      for (let j = 0; j < oldval.length; j++) {
        if (oldval[j].osId === val[i].osId) {
          oldval.splice(j, 1)
          j = j - 1
        }
      }
    }
    return oldval
  },
  deleteObj (obj) {
    for (let key in obj) {
      if (key.indexOf('_') !== -1) {
        delete obj[key]
      }
    }
    return obj
  },
  cloneObj (obj) {
    var newObj = {}
    if (obj instanceof Array) {
      newObj = []
    }
    for (var key in obj) {
      var val = obj[key]
      newObj[key] = typeof val === 'object' ? this.cloneObj(val) : val
    }
    return newObj
  },

  fullScreen (elem) {
    let el = document.querySelectorAll(elem)[0]
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
    if (typeof rfs !== 'undefined' && rfs) {
      rfs.call(el)
    }
  },
  exitScreen () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
}

export default PBULICFUNC

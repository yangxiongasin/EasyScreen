/* globals localStorage */
import AidpCons from '@/config/constant' // 常量配置
import store from '@/store'

export default {
  /**
   * 获取当前token，优先从store里面取，如果不存在则从localStorage取
   * @returns {null}
   */
  getToken() {
    return store.getter.user
  },
  /**
   * 是否登录
   * @returns {boolean}
   */
  isloggedIn() {
    return !!this.getToken()
  },
  onChange() {}
}

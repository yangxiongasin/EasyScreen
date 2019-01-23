<template>
  <div class="layout layout--one-screen bg-gray-lightest-5">
    <div :class="['menu-backdrop', {'show': isOpen===true}]" @click="closeSidebar"></div>
    <div :class="['layout-sidebar bg-gray-darker show',{'layout-sidebar--folded': isOpen===false}]">
      <router-link :to="{ name: 'home' }" class="layout-logo-left">
        <img src="../assets/images/logo-white.png" alt="" class="layout-logo-img" width="22">
        <span class="text-base text-white align-middle ml-12 layout-logo-text">EasyScreen</span>
      </router-link>
      <t-menu :open-position="openPosition" :open-names="openNames" :active-name="activeName" :class="[{'menu--folded': isOpen===false}]" type="dark" accordion @on-select="jump">
        <template v-for="item in menuData">
          <t-tooltip v-if="item.menuType === 1" :key="item.menuId" :disabled="isOpen" :content="item.menuName" placement="right">
            <t-menu-item :name="item.url">
              <t-icon :type="item.icon"></t-icon>
              <span v-show="isOpen">{{ item.menuName }}</span>
            </t-menu-item>
          </t-tooltip>
          <t-submenu v-else :key="item.menuId" :name="'' + item.menuId">
            <template slot="title">
              <t-icon :type="item.icon"></t-icon>
              <span>{{ item.menuName }}</span>
            </template>
            <template v-if="item.childrenMenuList">
              <t-menu-item v-for="i in item.childrenMenuList" :key="i.menuId" :name="i.url">{{ i.menuName }}</t-menu-item>
            </template>
          </t-submenu>
        </template>
      </t-menu>
    </div>
    <div class="layout-content">
      <nav class="navbar  navbar-expand-lg bg-white layout-nav--top px-4">
        <a :class="{'rotate-90':!isOpen}" href="javascript:;" class="text-muted">
          <i class="aid aid-menu text-xxl" @click="switchedSidebarState"></i>
        </a>
        <span class="splitter"></span>
        <span class="text-lg text-muted align-middle ml-2 mr-auto layout-logo-text">{{ currentView }}</span>
        <t-dropdown trigger="click" placement="bottom-end">
          <t-badge class="ml-4">
            <t-avatar :dot="false" :text="userName" size="sm"></t-avatar>
            <t-icon type="arrow-down-drop" size="20"></t-icon>
          </t-badge>
          <t-dropdown-menu slot="list">
            <t-dropdown-item @on-click="$_loginOut">退出</t-dropdown-item>
          </t-dropdown-menu>
        </t-dropdown>
      </nav>

      <div class="layout-main" style="top: 60px; bottom: 0; background: #f00">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {
    // props data
  },
  data() {
    return {
      oldRouterVal: '',
      menuData: [],
      reisezeTimer: null,
      activeName: '',
      openNames: [],
      manual: false, // 是否点击切换按钮
      isOpen: this.initSidebarState(),
      openPosition: this.initMenuPosition()
    }
  },
  computed: {
    ...mapGetters('frame', ['currentView']),
    userName () {
      return this.$store.getters.getLoginInfo.userName
    }
  },
  watch: {
    $route(val, oldVal) {
      this.oldRouterVal = oldVal.name
      if (val.meta.isMenu) {
        this.activeName = val.name
      }
    }
  },
  mounted() {
    this.loadMenu()
    window.addEventListener('resize', () => {
      if (!this.manual) {
        if (this.reisezeTimer !== null) {
          clearTimeout(this.reisezeTimer)
        }
        this.reisezeTimer = setTimeout(this.onWindowResize, 400)
      } else {
        return
      }
    })
  },
  methods: {
    // methods
    loadMenu() {
      this.$qmc.post(this.$service.menuList).then(res => {
        if (res.data && res.data.code === 200) {
          this.menuData = res.data.data
          this.$nextTick(() => {
            this.activeName = this.$route.name
            for (let i = 0; i < this.menuData.length; i++) {
              if (this.menuData[i].url === this.activeName) {
                this.openNames = ['1']
              } else {
                for (let j = 0; j < this.menuData[i].childrenMenuList.length; j++) {
                  if (this.menuData[i].childrenMenuList[j].url === this.activeName) {
                    this.openNames = ['' + this.menuData[i].childrenMenuList[j].parentMenuId]
                  }
                }
              }
            }
          })
        }
      })
    },
    // 路由跳转
    jump(val) {
      this.$router.push({ name: val })
    },
    $_loginOut() {
      const vm = this
      vm.$qmcJson
        .post(vm.$service.loginOut)
        .then(res => {
          if (res.data && res.data.code === 200) {
            vm.$Message.success(res.data.data.message)
            vm.$store.commit('setLoginStatus', false)
            vm.$store.commit('setRememberStatus', false)
            vm.jump('login')
          } else {
            vm.$Message.danger(res.data.data.message)
          }
        })
        .catch(res => {
          vm.$Message.danger(res.data.data.message)
        })
    },
    switchedSidebarState() {
      this.isOpen = !this.isOpen
      this.openPosition = this.openPosition === 'down' ? 'right' : 'down'
      this.manual = true
    },
    closeSidebar() {
      this.isOpen = false
      this.openPosition = this.openPosition === 'right'
    },
    initSidebarState() {
      if (document.body.clientWidth > 992) {
        return true
      } else {
        return false
      }
    },
    initMenuPosition() {
      if (document.body.clientWidth > 992) {
        return 'down'
      } else {
        return 'right'
      }
    },
    onWindowResize() {
      if (document.body.clientWidth > 992) {
        this.isOpen = true
        this.openPosition = 'down'
      } else {
        this.isOpen = false
        this.openPosition = 'right'
      }
    }
  }
}
</script>

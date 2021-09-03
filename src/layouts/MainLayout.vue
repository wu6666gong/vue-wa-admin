<template>
  <BaseLayout :menus="menus">
    <router-view></router-view>
  </BaseLayout>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import BaseLayout from './components/MainLayout/Layout.vue'
export default {
  components: {
    BaseLayout
  },
  setup(){
    const store = useStore()
    const addRouters = computed(() => store.state.permission.addRouters)
    const menus = computed(() => {
       let mainMenu =  addRouters.value.find(item => item.path === '/')
       return (mainMenu && mainMenu.children) || []
    })
    return {
      addRouters,
      menus
    }
  }
}
</script>

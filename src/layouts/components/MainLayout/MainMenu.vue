<template>
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" @click="handleMenuItemClick" :selectable="false">
        <template v-for="item in menus" :key="item.name">
            <template v-if="!item.children || item.hideChildrenInMenu">
                <a-menu-item :key="item.path" :target="item">
                    <template #icon v-if="item.meta.icon">
                      <menuIcon :icon="item.meta.icon"></menuIcon>
                    </template>
                    {{ item.meta && item.meta.title }}
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu-info="item" :key="item.path" />
            </template>
        </template>
    </a-menu>
</template>
<script>
import { ref, watch } from 'vue'
import subMenu from './MainSubMenu.vue'
import menuIcon from "./MainMenuIcon.vue";
import { useRoute, useRouter } from "vue-router";
export default {
    components: {
        'sub-menu': subMenu,
         menuIcon,
    },
    props: {
        menus: {
            type: Array,
            default(){
                return []
            }
        }
    },
    setup(props) {
          const route = useRoute()
          const router = useRouter()
          const selectedKeys = ref(route.matched.map(item => item.path))
          const openKeys = ref([])
          const routeMatch = route.matched.map(item => item.path)
          routeMatch.shift()
          openKeys.value = routeMatch
          watch(() => route.matched, (newMatched) => {
              selectedKeys.value = newMatched.map(item => item.path)
          })
          function handleMenuItemClick(d){
              let item = (d.item && d.item.target) || {}
              // 判断路径是http开头的打开窗口  
              if(d.key.startsWith('http')) {
                window.open(d.key, item.target || '_blank')
              } else {
                router.push({
                    path: d.key
                })
              }
          }
          return {
            selectedKeys,
            openKeys,
            handleMenuItemClick
          }
    },
}
</script>

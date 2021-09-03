<template>
    <div id="main-layout">
        <a-layout :style="{height: '100vh'}">
            <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
                <div class="logo">
                    logo
                </div>
                <MainMenu :menus="menus" :collapsed="collapsed"></MainMenu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0">
                    <LayoutHeader v-model:collapsed="collapsed"></LayoutHeader>
                </a-layout-header>
                <a-layout-content
                    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
                >
                    <slot></slot> 
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>

</template>
<script>
  import { ref,provide } from 'vue'
  import MainMenu from './MainMenu.vue'
  import LayoutHeader from "./LayoutHeader.vue";
export default {
    components: {
        MainMenu,
        LayoutHeader
    },
    props: {
        menus: {
            type:  Array,
            default(){
                return []
            }
        }
    },
    setup(props){
       const collapsed = ref(false)
       provide('menu-collapsed', collapsed)
       return {
           collapsed
       }
    }
}
 
  
</script>

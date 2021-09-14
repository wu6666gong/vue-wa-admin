<template>
    <div class="layout-header">
        <div class="switch-collapsed">
            <menu-unfold-outlined
                v-if="collapsed"
                class="trigger"
                @click="collapsedChange"
            />
            <menu-fold-outlined v-else class="trigger" @click="collapsedChange" />
        </div>

        <div class="layout-header-info">
            <!-- 全屏幕 -->
           <FullScreen></FullScreen>
           <!-- 头像 -->
           <Avatar></Avatar>
        </div>
    </div>
</template>
<script>
import { ref, toRefs, watch } from 'vue'
import {MenuUnfoldOutlined,MenuFoldOutlined,} from '@ant-design/icons-vue';
import Avatar from "./Avatar.vue";
import FullScreen from './FullScreen.vue'
export default {
    emits: ['update:collapsed'],
    components: {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        Avatar,
        FullScreen
    },
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
       const { collapsed } = toRefs(props)
       const collapsedSwitch = ref(false)
       collapsedSwitch.value = collapsed.value
       watch(collapsed, (newValue) => {
           collapsedSwitch.value = newValue
       })
       function collapsedChange(){
           context.emit('update:collapsed', !collapsedSwitch.value)
       }
       return {
           collapsedChange
       }
    },
}
</script>
<style scoped lang="less">
.layout-header{
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
}
</style>
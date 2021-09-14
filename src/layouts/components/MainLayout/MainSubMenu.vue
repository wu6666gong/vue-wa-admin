<template>
     <a-sub-menu :key="menuInfo.path">
            <template #icon v-if="menuInfo.meta.icon"><UserOutlined/></template>
            <template #title>{{ menuInfo.meta && menuInfo.meta.title }}</template>
            <template v-for="item in menuInfo.children" >
                <template v-if="(!item.children || item.hideChildrenInMenu) && !item.hidden">
                    <a-menu-item :key="item.path"  :target="item">
                        <template #icon v-if="item.meta.icon">
                            <UserOutlined/>
                        </template>
                         {{ item.meta && item.meta.title }}
                    </a-menu-item>
                </template>
                <template v-else-if="item.children && item.children.length && !item.hideChildrenInMenu && !item.hidden">
                     <sub-menu :menu-info="item" :key="item.path" />
                </template>
                <template v-else>
                </template>
            </template>
       </a-sub-menu>
</template>
<script>
import { UserOutlined } from '@ant-design/icons-vue';
export default {
    name: 'SubMenu',
    props: {
        menuInfo: {
            type: Object,
            default: () => ({}),
        }
    },
    components: {
        UserOutlined,
     }
}
</script>
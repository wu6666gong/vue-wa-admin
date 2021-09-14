<template>
     <a-sub-menu :key="menuInfo.path">
            <template #icon v-if="menuInfo.meta.icon"><UserOutlined/></template>
            <template #title>{{ menuInfo.meta && menuInfo.meta.title }}</template>
            <template v-for="item in menuInfo.children" >
                <template v-if="!item.children || item.hideChildrenInMenu">
                    <a-menu-item :key="item.path" :target="item.meta.target">
                        <template #icon v-if="item.meta.icon">
                            <UserOutlined/>
                        </template>
                         {{ item.meta && item.meta.title }}
                    </a-menu-item>
                </template>
                <template v-else>
                     <sub-menu :menu-info="item" :key="item.path" />
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
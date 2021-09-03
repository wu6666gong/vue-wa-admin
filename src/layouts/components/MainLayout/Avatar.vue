<template>
    <a-dropdown>
        <div class="avatar">
            <a-avatar :src="userinfo.avatar" />
            <span class="name">{{userinfo.name}}</span>
        </div>
        <template #overlay>
            <a-menu>
                <a-menu-item>
                    <div class="dropdown-item">
                       <UserOutlined /> 个人中心
                    </div>
                </a-menu-item>
                <a-menu-item>
                    <div class="dropdown-item">
                        <SettingOutlined /> 个人设置
                    </div>
                </a-menu-item>
                 <a-menu-divider />
                <a-menu-item @click="handleLogout">
                    <div class="dropdown-item">
                        <LogoutOutlined /> 退出登陆
                    </div>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>   
</template>
<script>
import { computed } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { UserOutlined,SettingOutlined,LogoutOutlined } from '@ant-design/icons-vue';
export default {
    components: {
        UserOutlined,
        SettingOutlined,
        LogoutOutlined
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      const userinfo =  computed(() => store.state.user.userInfo)
      function handleLogout () {
        store.dispatch('user/logout', {}).then(() => {
            router.push({
                name: 'login'
            })
        })   
      }
      return {
          userinfo,
          handleLogout
      }
    },
}
</script>
<style lang="less" scoped>
.name{
    margin-left: 10px;
    color: rgba(0,0,0,0.65);
}
.avatar{
    padding: 0 10px;
    &:hover{
        background-color: rgba(0,0,0,.025);
    }
}
.dropdown-item{
    width: 130px;
    color: rgba(0,0,0,0.65);;
}
</style>
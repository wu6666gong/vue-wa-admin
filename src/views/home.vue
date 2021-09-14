<template>
    首页
    <a-button @click="handleLogout">退出</a-button>
    <div style="height:2000px;">测试回到顶部</div>
</template>

<script setup>
import { userAPI } from '@/api'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const { push } = useRouter()
const store = useStore()
function handleLogout(){
    store.dispatch('user/logout', {}).then(() => {
        console.log('退出成功')
        push({
            name: 'login'
        })
    })
}
</script>
<template>
    <div id="login">
       <div class="login-main">
           <h2 class="login-header">欢迎来到WA-Admin后台系统</h2>
            <a-tabs v-model:activeKey="activeKey" :tabBarStyle="{ 'text-align': 'center', 'margin-top':'10px'}">
                <a-tab-pane key="1" tab="登陆">
                    <Login @on-success="handleLoginSuc"></Login>
                </a-tab-pane>
            </a-tabs>
       </div>
    </div>
</template>
<script setup>
import Login  from '@/components/login/index.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const activeKey = ref('1')
const { push } = useRouter()
const handleLoginSuc = function(data){
    console.log(data)
    push({
        path: '/home'
    })
}
</script>
<style scoped>
#login {
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/bg.jpeg');
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
}
.login-main{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    transform: translate(-50%, -50%);
    margin-top: -200px;
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
}
.login-header{
    text-align: center;
}
</style>
<template>
    <div class="login-input" >
        <a-form ref="formRef" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
           <a-form-item name="name">
                <a-input v-model:value="form.name"  placeholder="请输入账号">
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="pwd">
                <a-input v-model:value="form.pwd"  placeholder="请输入密码">
                     <template #prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input>
            </a-form-item>
            <div class="login-sub">
              <a-button type="primary" @click="onSubmit">提交</a-button>
            </div>
     </a-form>     
    </div>
     
</template>
<script setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { reactive, ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const labelCol = reactive({span: 0})
const wrapperCol = reactive({span: 24})
let emit = defineEmits(["on-success"]);
const store = useStore()
const form = reactive({
    name: '',
    pwd: ''
})
const rules = reactive({
    name: [{ required: true, message: '请输入账号'}],
    pwd: [ {required: true, message: '请输入密码'}]
})
const formRef = ref()
const {push} = useRouter()
function onSubmit(){
    formRef.value.validate().then(() => {
        store.dispatch('user/logins').then(res => {
            emit('on-success', res)  
        })
    }).catch((error) => {
        console.log('error', error);
    });
}
</script>
<style scoped lang="less">
.login-input{
    width: 400px;
    margin:  0 auto;
}
.login-sub{
    text-align: center;
}
</style>
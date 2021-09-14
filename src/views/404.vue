<template>
    <div class="no-page">
        <img src="@/assets/404.png" alt="">
        <a-button type="primary" @click="handleBack">返回首页({{time}})</a-button>
    </div>
</template>
<script>
import {onBeforeUnmount, ref} from 'vue'
import { useRouter} from 'vue-router'
 export default {
     setup(){
         let time = ref(5)
         let router = useRouter()
         function countdown(){
             if(time.value === 0) {
                 handleBack()
                 clearInterval(countdownInterval)
             } else {
                 time.value--
             }
         }
        const countdownInterval =  setInterval(countdown, 1000);
        function handleBack(){
            router.push({
                path: '/'
            })
        }
        onBeforeUnmount(() => {
            if(countdownInterval){clearInterval(countdownInterval)}
        })
         return {
             time,
             handleBack
         }
     }
 }
</script>
<style lang="less" scoped>
.no-page{
    width: 400px;
    height: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-100%);
    text-align: center;
    img{
        width: 100%;
        position: relative
    }
}
</style>
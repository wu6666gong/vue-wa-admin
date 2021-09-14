<template>
   <a-tooltip title="全屏" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="toggle" class="full-screen">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </a-tooltip>
</template>
<script>
import { useFullscreen } from '@vueuse/core'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
export default {
    name: 'FullScreen',
    components: {
        FullscreenExitOutlined,
        FullscreenOutlined
    },
    setup(){
        const { toggle, isFullscreen } = useFullscreen();
        return {
            toggle,
            isFullscreen
        }
    }
}
</script>
<style scoped>
.full-screen{
    margin-right: 10px;
    font-size: 19px;
    vertical-align: middle;
}
</style>
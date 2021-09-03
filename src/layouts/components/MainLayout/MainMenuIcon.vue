<template>
    <template v-if="!isSvg">
         <component :is="icon"></component>
    </template>
    <template v-else> 
       <SvgIcon :name="icon.split('-')[1]" :style="{width:collapsed?'16px':'14px',height:collapsed?'16px':'14px'}" color="#ffffffa6"></SvgIcon>
    </template>
</template>
<script>
import { computed, toRefs, inject } from 'vue'
import  * as allIcon from '@ant-design/icons-vue';
import SvgIcon from "@/components/SvgIcon/index.vue";
export default {
    props: {
        icon: {
          type: [String, Object],
          default: ''
        }
    },
    components: {
        ...allIcon,
        SvgIcon
    },
    setup(props) {
        let { icon } = toRefs(props)
        let collapsed = inject('menu-collapsed')
        let isSvg = computed(() => {
            return icon.value.startsWith('svgIcon')   
        }) 
        return {
            isSvg,
            collapsed
        }
    },
}
</script>
<template>
    <svg aria-hidden="true" :style="style">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>
<script>
  import { computed } from 'vue';
export default {
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: '#fff',
      },
      style: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    setup(props) {
        const symbolId = computed(() => `#${props.prefix}-${props.name}`);
        return { symbolId };
    },
}
</script>
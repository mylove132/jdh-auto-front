<template>
  <svg :class="svgClass" aria-hidden="true">
    <use
      xlink:href="D:\liuzhanhui\vue\jdh-auto-front\src\assets\icons\login.svg"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

interface SvgIcon {
  iconClass: string;
  className?: string;
}

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props: SvgIcon) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => 'svg-icon');

    return {
      iconName,
      svgClass
    };
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
    cursor: pointer;
    content: '';
  }
}
</style>

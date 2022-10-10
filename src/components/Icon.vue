<template>
  <div :class="classList" >
    <Github v-if="icon == 'github'" class="icon icon-fill inline-block" />
    <Discord v-if="icon == 'discord'" class="icon icon-fill inline-block" :class="classList"/>
    <Twitter v-if="icon == 'twitter'" class="icon icon-fill inline-block"/>
  </div>
</template>

<script>

export default {
  props: {
    icon: {
      type: String
    },
    classList: {
      type: String
    },
    scale: {
      type: String,
      default: '1'
    },
  },

  components: {
      Github: () => import('@/assets/images/IconGithub.svg'),
      Discord: () => import('@/assets/images/IconDiscord.svg'),
      Twitter: () => import('@/assets/images/IconTwitter.svg'),
  },

  methods: {
    SvgWidth(SvgWidth) {
      return `${SvgWidth * this.scale}px`;
    }
  }
};
</script>

<style>
.icon {
    line-height: 1;
}
</style>

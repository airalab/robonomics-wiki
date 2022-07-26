<template><LocalePage/></template>

<script>

export default {
  components: {
      LocalePage: () => import('../../summary/[title].vue'),
    }
  }

</script>
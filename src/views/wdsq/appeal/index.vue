<template>
  <nav-bar title="在线诉求反映"></nav-bar>
  <div></div>
</template>

<script setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
  console.log(route.params.mode)
</script>

<style lang="scss" scoped></style>

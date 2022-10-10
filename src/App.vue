<template>
  <router-view></router-view>
</template>

<script setup>
  import { onMounted } from 'vue'
  onMounted(() => {
    console.log('我是傻逼')
  })
</script>

<style scoped></style>

<template>
  <button class="btn">
    <RouterLink to="/a"> A </RouterLink>
  </button>
  <RouterView />
</template>

<script setup>
  import { onMounted } from 'vue'
  import { getStatisticsData } from '@/apis'
  onMounted(() => {
    getStatisticsData().then(
      () => {},
      () => {},
    )
  })
</script>

<style scoped lang="scss">
  .btn {
    margin: 100px;
    padding: 5px 10px;
    border: 1px solid #000;
  }
</style>

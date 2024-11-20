<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HeaderTitle from '@/components/HeaderTitle.vue';
</script>

<template>
  <div class="content">
    <header>
      <HeaderTitle class="base-header" title="可视化大屏测试标题"></HeaderTitle>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

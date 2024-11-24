<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HeaderTitle from '@/components/HeaderTitle.vue';
</script>

<template>
  <div class="content">
    <HeaderTitle class="base-header" title="气象监测大屏"></HeaderTitle>
    <RouterView class="content-main" />
  </div>
</template>

<style scoped>
.content {
  @apply flex flex-col h-screen w-screen justify-center items-center;

  .base-header {
    @apply w-full;
  }

  .content-main {
    @apply h-[calc(100%-70px)];
  }

  /* display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%; */
}
</style>

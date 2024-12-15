<template>
  <div class="relative">
    <div class="d-flex jc-center title_wrap">
      <div class="zuojuxing"></div>
      <div class="youjuxing"></div>
      <div class="guang"></div>
      <div class="d-flex jc-center">
        <div class="title">
          <span class="title-text">{{ title }}</span>
        </div>
      </div>
      <div class="timers">
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  title: String,
});

// const time = () => {
//   const date = new Date();
//   // YYYY-MM-DD HH:mm:ss
//   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
// };
const time = ref('');
setInterval(() => {
  const date = new Date();
  // YYYY-MM-DD HH:mm:ss 个位补0
  time.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  // time.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}, 1000);
// console.log(time())
</script>

<style scoped lang="scss">
.title_wrap {
  height: 60px;
  background-image: url('@/assets/img/top.png');
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;

  .guang {
    position: absolute;
    bottom: -26px;
    background-image: url('@/assets/img/guang.png');
    background-position: 80px center;
    width: 100%;
    height: 56px;
  }

  .zuojuxing,
  .youjuxing {
    position: absolute;
    top: -2px;
    width: 140px;
    height: 6px;
    background-image: url('@/assets/img/juxing1.png');
  }

  .zuojuxing {
    left: 11%;
  }

  .youjuxing {
    right: 11%;
    transform: rotate(180deg);
  }

  .timers {
    position: absolute;
    right: 20px;
    top: 30px;
    font-size: 18px;
    // 斜体
    font-style: italic;
    display: flex;
    align-items: center;
  }
  @media (max-width: 768px) {
    .timers {
      // font-size: 14px;
      display: none;
    }
  }
}
.title {
  position: relative;
  // width: 500px;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 60px;
  line-height: 46px;

  .title-text {
    @apply text-[1.5vw] font-bold;
    // font-size: 38px;
    font-weight: 900;
    letter-spacing: 6px;
    width: 100%;
    background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media (max-width: 768px) {
    .title-text {
      @apply text-[3vw];
      // font-size: 24px;
    }
  }
}
</style>

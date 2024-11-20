<template>
  <div class="eltable-div">
    <el-table v-loading="table_loading" :data="tableData" border max-height="180">
      <el-table-column fixed prop="create_time" label="时间" width="180" show-overflow-tooltip />
      <el-table-column prop="jiebin" label="结晶" width="120" />
      <el-table-column prop="shuimo" label="水膜" width="120" />
      <el-table-column prop="jixue" label="积雪" width="120" />
      <el-table-column prop="wendu" label="温度" width="120" show-overflow-tooltip />
      <el-table-column prop="shidu" label="湿度" width="120" />
      <el-table-column prop="fengsu" label="风速" width="120" />
      <el-table-column prop="fengxiang" label="风向" width="120" />
      <el-table-column prop="pm10" label="PM1.0" width="120" />
      <el-table-column prop="pm25" label="PM2.5" width="120" />
      <el-table-column prop="yuliang" label="雨量" width="120" />
      <el-table-column prop="yuqiang" label="雨强" width="120" />
      <el-table-column prop="nengjiandu" label="能见度" width="120" />
      <el-table-column prop="guangqiang" label="光强" width="120" />
      <el-table-column prop="dianliu" label="电流" width="120" />
      <el-table-column prop="dianya" label="电压" width="120" />
      <el-table-column prop="guangdian" label="光电" width="120" />
      <el-table-column prop="fengdian" label="风电" width="120" />
      <el-table-column prop="yadian" label="压电" width="120" />
      <el-table-column fixed="right" prop="correct" label="校准度" width="150" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getData } from '@/api/data';
const table_loading = ref(true);
const tableData = ref(null);

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

watch(
  () => props.data,
  (newVal) => {
    tableData.value = newVal;
    table_loading.value = false;
  },
);
</script>

<style lang="scss" scoped>
.eltable-div {
  @apply w-full;
}
.el-table {
  :deep(th) {
    @apply bg-black;
  }
  :deep(tr) {
    @apply bg-black;
  }
  :deep(tbody tr:hover > td) {
    background-color: #262727 !important;
  }
  :deep(.el-table-fixed-column--right) {
    background-color: black !important;
  }
  :deep(.el-table-fixed-column--left) {
    background-color: black !important;
  }
  :deep(.el-scrollbar) {
    background-color: black !important;
  }
  :deep(.el-loading-mask) {
    background-color: rgb(130, 129, 129) !important;
  }
}
</style>

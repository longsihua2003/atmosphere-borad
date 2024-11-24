<script setup>
import { BorderBox7 as DvBorderBox7 } from '@kjgl77/datav-vue3';
import BoradTable from '@/components/BoradTable.vue';
import TempandHumChart from '@/components/TempandHumChart.vue';
import THPieChart from '@/components/THPieChart.vue';
import ThreeConditionsChart from '@/components/ThreeConditionsChart.vue';
import ThreeCPieChart from '@/components/ThreeCPieChart.vue';
import WindChart from '@/components/WindChart.vue';
import PMChart from '@/components/PMChart.vue';
import RainChart from '@/components/RainChart.vue';
import VLChart from '@/components/VLChart.vue';
import CVChart from '@/components/CVChart.vue';
import CVPieChart from '@/components/CVPieChart.vue';
import SWPChart from '@/components/SWPChart.vue';
import SWPPieChart from '@/components/SWPPieChart.vue';

import {
  getData,
  handleData,
  TempandHum,
  ThreeConditions,
  WindSpeedandDirection,
  PM,
  Rainfall,
  VisibilityandLightIntensity,
  CurrentandVoltage,
  SolarWindPressure,
} from '@/api/data';
import { onMounted, ref, watch } from 'vue';

const TH = ref([]);
const THB = ref(true);
const THREE = ref([]);
const THREEB = ref(false);
const WSD = ref([]);
const WSDB = ref(false);
const PMT = ref([]);
const PMTB = ref(false);
const Rain = ref([]);
const RainB = ref(false);
const VL = ref([]);
const VLB = ref(false);
const CV = ref([]);
const CVB = ref(false);
const SWP = ref([]);
const SWPB = ref(false);

const ButtenList = [
  { name: '温、湿度', value: 'THB' },
  { name: '结冰、水膜、积雪', value: 'THREEB' },
  { name: '风速、风向', value: 'WSDB' },
  { name: 'PM情况', value: 'PMTB' },
  { name: '雨量、雨强', value: 'RainB' },
  { name: '能见度、光强', value: 'VLB' },
  { name: '电流、电压', value: 'CVB' },
  { name: '光电、风电、压电', value: 'SWPB' },
];
const tableData = ref(null);
async function setDate(start_time = null, end_time = null) {
  getData(start_time, end_time).then((res) => {
    tableData.value = res.result.list;
    handleData(res.result.list);
    TH.value = TempandHum.map((item) => {
      return {
        name: item.name,
        wendu: item.wendu,
        shidu: item.shidu,
      };
    });
    THREE.value = ThreeConditions.map((item) => {
      return {
        name: item.name,
        jiebin: item.jiebin,
        shuimo: item.shuimo,
        jixue: item.jixue,
      };
    });
    WSD.value = WindSpeedandDirection.map((item) => {
      return {
        name: item.name,
        fengsu: item.fengsu,
        fengxiang: item.fengxiang,
      };
    });
    PMT.value = PM.map((item) => {
      return {
        name: item.name,
        pm10: item.pm10,
        pm25: item.pm25,
      };
    });
    Rain.value = Rainfall.map((item) => {
      return {
        name: item.name,
        yuliang: item.yuliang,
        yuqiang: item.yuqiang,
      };
    });
    VL.value = VisibilityandLightIntensity.map((item) => {
      return {
        name: item.name,
        nengjiandu: item.nengjiandu,
        guangqiang: item.guangqiang,
      };
    });
    CV.value = CurrentandVoltage.map((item) => {
      return {
        name: item.name,
        dianliu: item.dianliu,
        dianya: item.dianya,
      };
    });
    SWP.value = SolarWindPressure.map((item) => {
      return {
        name: item.name,
        guangdian: item.guangdian,
        fengdian: item.fengdian,
        yadian: item.yadian,
      };
    });
    if (currentButten.value) {
      clickButten(currentButten.value);
    }
  });
}
onMounted(async () => {
  await setDate();
});
// THB.value = true;
// function clickButten(value) {
//   ButtenList.forEach((item) => {
//     console.log(item, value);
//     if (item.value === value) {
//       console.log(item.value);
//       eval(`${item.value} = !${item.value}`);
//     } else {
//       eval(`${item.value} = false`);
//     }
//   });
// }
const currentButten = ref('THB');
const hasCharts = computed(() => {
  return THB.value || THREEB.value || WSDB.value || PMTB.value || RainB.value || VLB.value || CVB.value || SWPB.value;
});

function clickButten(value) {
  // 如果点击的是当前的按钮，直接返回
  if (currentButten.value === value) {
    return;
  }
  currentButten.value = value;
  ButtenList.forEach((item) => {
    // 直接修改响应式数据
    if (item.value === value) {
      // 切换对应的布尔值
      item.value === 'THB' && (THB.value = !THB.value);
      item.value === 'THREEB' && (THREEB.value = !THREEB.value);
      item.value === 'WSDB' && (WSDB.value = !WSDB.value);
      item.value === 'PMTB' && (PMTB.value = !PMTB.value);
      item.value === 'RainB' && (RainB.value = !RainB.value);
      item.value === 'VLB' && (VLB.value = !VLB.value);
      item.value === 'CVB' && (CVB.value = !CVB.value);
      item.value === 'SWPB' && (SWPB.value = !SWPB.value);
    } else {
      // 隐藏其他的
      item.value === 'THB' && (THB.value = false);
      item.value === 'THREEB' && (THREEB.value = false);
      item.value === 'WSDB' && (WSDB.value = false);
      item.value === 'PMTB' && (PMTB.value = false);
      item.value === 'RainB' && (RainB.value = false);
      item.value === 'VLB' && (VLB.value = false);
      item.value === 'CVB' && (CVB.value = false);
      item.value === 'SWPB' && (SWPB.value = false);
    }
  });
}

// 日期选择
const select_data = ref(null);
watch(select_data, (newVal) => {
  let start_time = newVal[0];
  let end_time = newVal[1];
  start_time = new Date(start_time).getTime();
  // 转换为字符串
  start_time = start_time.toString();
  end_time = new Date(end_time).getTime();
  end_time = end_time.toString();
  setDate(start_time, end_time);
});
</script>

<template>
  <div class="container">
    <div class="table">
      <!-- <h1 class="text-3xl font-bold">数据总览</h1> -->
      <div class="block">
        <el-date-picker
          v-model="select_data"
          type="datetimerange"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm:ss"
        />
      </div>
      <BoradTable class="table-main" :data="tableData"></BoradTable>
    </div>
    <THPieChart :data="TH"></THPieChart>
    <SWPPieChart :data="SWP"></SWPPieChart>
    <ThreeCPieChart :data="THREE"></ThreeCPieChart>
    <CVPieChart :data="CV"></CVPieChart>

    <!-- <div class="echarts-show"> -->
    <!-- <h1 class="text-3xl my-5 font-bold">数据分析</h1> -->
    <!-- <dv-border-box7> -->
    <!-- <div class="echarts-container"> -->
    <!-- <div class="echarts-left">
            <el-button v-for="(item, index) in ButtenList" :key="index" type="primary" @click="clickButten(item.value)">
              {{ item.name }}
            </el-button>
          </div> -->
    <!-- <div class="echarts-right"> -->
    <div class="echarts-show">
      <dv-border-box7 class="p-5">
        <TempandHumChart class="flex-grow h-full" :data="TH"></TempandHumChart>
      </dv-border-box7>
      <dv-border-box7 class="my-5 p-5">
        <ThreeConditionsChart :data="THREE"></ThreeConditionsChart>
      </dv-border-box7>
      <dv-border-box7 class="my-5 p-5">
        <WindChart :data="WSD"></WindChart>
      </dv-border-box7>
      <dv-border-box7 class="my-5 p-5">
        <PMChart :data="PMT"></PMChart>
      </dv-border-box7>
      <dv-border-box7 class="my-5 p-5">
        <RainChart :data="Rain"></RainChart>
      </dv-border-box7>
      <dv-border-box7 class="my-5 p-5">
        <VLChart :data="VL"></VLChart>
      </dv-border-box7>
      <dv-border-box7 class="my-5 p-5">
        <CVChart :data="CV"></CVChart>
      </dv-border-box7>
      <dv-border-box7 class="my-5 p-5">
        <SWPChart :data="SWP"></SWPChart>
      </dv-border-box7>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <!-- </dv-border-box7> -->
    <!-- </div> -->
  </div>
</template>

<style lang="scss" scoped>
.container {
  @apply w-full h-full grid grid-cols-8 justify-items-center items-center auto-rows-fr;
  grid-auto-rows: 50vh;
  .table {
    @apply grid grid-cols-2 justify-items-center col-span-8 py-5 justify-items-auto items-center overflow-y-auto h-full;
    .block {
      @apply col-span-2;
    }
    .table-main {
      @apply col-span-2 mt-5 h-[100%-20px];
    }
  }
  .echarts-show {
    @apply col-span-8 py-10 w-full h-full;
    //   @apply flex justify-center items-center flex-col w-full h-full col-span-6;
    //   .echarts-right {
    //     @apply flex flex-col h-full w-full overflow-y-auto;
    //     > * {
    //       @apply py-10 px-5 overflow-x-hidden;
    //       // @apply flex-grow;
    //       flex: 0 0 100%;
    //     }
    //   }
  }

  > *:not(.table):not(.echarts-show) {
    @apply col-span-2 my-5; // 每个独立图表占一列
  }
  @media (max-width: 768px) {
    @apply overflow-y-auto w-full h-full grid grid-cols-2 items-center; // 修改为单列布局
    grid-auto-rows: 50vh;
    .table {
      @apply grid-cols-2 justify-items-center; // 表格单列
      .table-main {
        @apply mt-5 mt-5 h-[100%-20px]; // 高度调整为自适应
      }
    }

    // .echarts-show {
    //   @apply col-span-2; // 图表占单列
    //   .echarts-right {
    //     > * {
    //       flex: 0 0 100%; // 自动扩展
    //     }
    //   }
    // }

    > *:not(.table):not(.echarts-show) {
      @apply col-span-8 my-5; // 每个独立图表占一列
    }
  }
  // .echarts-right > * {

  // }
  // @apply flex justify-center items-center flex-col h-full w-full;
  // .borad-top {
  //   @apply flex justify-center items-center w-full overflow-y-auto;
  //   .table {
  //     @apply flex items-center justify-center flex-col overflow-y-auto;
  //     .table-top {
  //       @apply flex justify-between items-center;
  //       @apply w-full;
  //     }
  //     .table-main {
  //       @apply flex-grow w-full h-full overflow-hidden;
  //     }
  //   }
  // }
  // .echarts-show {
  //   @apply flex-grow w-full;
  //   @apply flex justify-center items-center flex-col;
  //   //设置长宽比为1:2
  //   // aspect-ratio: 2 / 1;
  //   .echarts-container {
  //     @apply flex justify-center items-center h-full;
  //     @apply p-5 mb-5;
  //     .echarts-left {
  //       @apply flex justify-start items-center flex-col overflow-y-auto overflow-x-hidden px-5 h-400px;
  //       :deep(.el-button) {
  //         @apply my-3 mx-5 w-200px;
  //       }
  //     }
  //     .echarts-right {
  //       @apply w-full pl-5 border-l-3 h-full;
  //       // @apply flex justify-center items-center;
  //       width: 100% !important;
  //     }
  //   }
  // }
}
</style>

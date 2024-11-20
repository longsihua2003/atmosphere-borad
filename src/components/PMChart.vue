<template>
  <div ref="chartsDom" class="w-full h-full"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { da } from 'element-plus/es/locales.mjs';
import { onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'PM值图表',
  },
  data: {
    type: Array,
    default: () => {
      return [
        {
          name: 'data1',
          pm25: '100',
          pm10: '50',
        },
        {
          name: 'data2',
          pm25: '3',
          pm10: '51',
        },
        {
          name: 'data3',
          pm25: '0',
          pm10: '52',
        },
        {
          name: 'data4',
          pm25: '1.4',
          pm10: '53',
        },
        {
          name: 'data5',
          pm25: '1.8',
          pm10: '54',
        },
      ];
    },
  },
});

// 绑定图表的dom对象
const chartsDom = ref(null);
// 图表对象
let mychart = null;

const colors = ['#DE6E6A', '#5A6FC0'];

const option = {
  color: '#ffffff',
  title: {
    text: props.title,
    textStyle: {
      color: '#ffffff',
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['PM2.5', 'PM10'],
    textStyle: {
      color: '#ffffff',
    },
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      data: [],
      axisLabel: {
        color: '#ffffff',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'PM值大小',
      min: 0,
      max: 150,
      position: 'left',
    },
  ],
  server: [],
};

onMounted(() => {
  mychart = echarts.init(chartsDom.value);
  option.xAxis[0].data = props.data.map((item) => item.name);
  option.series = [
    {
      name: 'PM2.5',
      type: 'line',
      data: props.data.map((item) => item.pm25),
      yAxisIndex: 0,
    },
    {
      name: 'PM10',
      type: 'line',
      data: props.data.map((item) => item.pm10),
      yAxisIndex: 0,
    },
  ];
  mychart.setOption(option);
});

// 监听窗口变化，自适应图表大小
window.addEventListener('resize', () => {
  mychart.resize();
});

// 卸载图表
onUnmounted(() => {
  window.removeEventListener('resize', () => {
    mychart.resize();
  });
});

function data_verification() {
  // 数据是否为空
  if (props.data.length === 0) {
    console.error('数据为空');
    return false;
  }
  // 数据是否为数组
  if (!Array.isArray(props.data)) {
    console.error('数据格式错误');
    return false;
  }
  // 数据格式是否正确
  for (const item of props.data) {
    if (typeof item !== 'object') {
      console.error('数据格式错误');
      return false;
    }
  }
  return true;
}

watch(
  () => props.data,
  (newVal) => {
    if (data_verification()) {
      option.xAxis[0].data = newVal.map((item) => item.name);
      option.series = [
        {
          name: 'PM2.5',
          type: 'line',
          data: newVal.map((item) => item.pm25),
          yAxisIndex: 0,
        },
        {
          name: 'PM10',
          type: 'line',
          data: newVal.map((item) => item.pm10),
          yAxisIndex: 0,
        },
      ];
      mychart.setOption(option);
    }
  },
);
</script>

<style lang="scss" scoped>
.echarts-div {
  @apply min-h-full min-w-full;
}
</style>

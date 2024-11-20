<template>
  <div ref="chartsDom" class="w-full h-full"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '电压、电流图表',
  },
  data: {
    type: Array,
    default: () => {
      return [
        {
          name: 'data1',
          dianliu: '25',
          dianya: '50',
        },
        {
          name: 'data2',
          dianliu: '26',
          dianya: '51',
        },
        {
          name: 'data3',
          dianliu: '27',
          dianya: '52',
        },
        {
          name: 'data4',
          dianliu: '28',
          dianya: '53',
        },
        {
          name: 'data5',
          dianliu: '29',
          dianya: '54',
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
    axisPointer: {
      type: 'cross',
    },
  },
  legend: {
    data: ['电流', '电压'],
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
      name: '电流',
      min: 0,
      max: 30,
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0],
        },
      },
      axisLabel: {
        formatter: '{value} A',
      },
    },
    {
      type: 'value',
      name: '电压',
      min: 500,
      max: 1500,
      position: 'right',
      axisLine: {
        lineStyle: {
          color: colors[1],
        },
      },
      axisLabel: {
        formatter: '{value} V',
      },
    },
  ],
  server: [],
};

onMounted(() => {
  mychart = echarts.init(chartsDom.value);
  option.xAxis[0].data = props.data.map((item) => item.name);
  option.series = [
    {
      name: '电流',
      type: 'line',
      data: props.data.map((item) => item.dianliu),
      yAxisIndex: 0,
    },
    {
      name: '电压',
      type: 'line',
      data: props.data.map((item) => item.dianya),
      yAxisIndex: 1,
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
          name: '电流',
          type: 'line',
          data: newVal.map((item) => item.dianliu),
          yAxisIndex: 0,
        },
        {
          name: '电压',
          type: 'line',
          data: newVal.map((item) => item.dianya),
          yAxisIndex: 1,
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

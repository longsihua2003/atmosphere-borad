<template>
  <div ref="chartsDom" class="w-full h-full"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '温度湿度图表',
  },
  data: {
    type: Array,
    default: () => {
      return [
        {
          name: 'data1',
          wendu: '25',
          shidu: '50',
        },
        {
          name: 'data2',
          wendu: '26',
          shidu: '51',
        },
        {
          name: 'data3',
          wendu: '27',
          shidu: '52',
        },
        {
          name: 'data4',
          wendu: '28',
          shidu: '53',
        },
        {
          name: 'data5',
          wendu: '29',
          shidu: '54',
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
    data: ['温度', '湿度'],
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
      name: '温度',
      min: 0,
      max: 100,
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0],
        },
      },
      axisLabel: {
        formatter: '{value} °C',
      },
    },
    {
      type: 'value',
      name: '湿度',
      min: 0,
      max: 100,
      position: 'right',
      axisLine: {
        lineStyle: {
          color: colors[1],
        },
      },
      axisLabel: {
        formatter: '{value} %',
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
      name: '温度',
      type: 'line',
      data: props.data.map((item) => item.wendu),
      yAxisIndex: 0,
    },
    {
      name: '湿度',
      type: 'line',
      data: props.data.map((item) => item.shidu),
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
          name: '温度',
          type: 'line',
          data: newVal.map((item) => item.wendu),
          yAxisIndex: 0,
        },
        {
          name: '湿度',
          type: 'line',
          data: newVal.map((item) => item.shidu),
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

<template>
  <div ref="chartsDom" class="w-full h-full"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '能见度、光强图表',
  },
  data: {
    type: Array,
    default: () => {
      return [
        {
          name: 'data1',
          nengjiandu: '25',
          guangqiang: '50',
        },
        {
          name: 'data2',
          nengjiandu: '26',
          guangqiang: '51',
        },
        {
          name: 'data3',
          nengjiandu: '27',
          guangqiang: '52',
        },
        {
          name: 'data4',
          nengjiandu: '28',
          guangqiang: '53',
        },
        {
          name: 'data5',
          nengjiandu: '29',
          guangqiang: '54',
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
      fontSize: 24,
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  grid: {
    top: '25%',
    bottom: '10%',
  },
  legend: {
    data: ['能见度', '光强'],
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
      name: '能见度',
      min: 0,
      max: 3000,
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0],
        },
      },
      axisLabel: {
        formatter: '{value} m',
      },
    },
    {
      type: 'value',
      name: '光强',
      min: 0,
      max: 6000,
      position: 'right',
      axisLine: {
        lineStyle: {
          color: colors[1],
        },
      },
      axisLabel: {
        formatter: '{value} mm',
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
      name: '能见度',
      type: 'line',
      data: props.data.map((item) => item.nengjiandu),
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colors[0],
      },
      yAxisIndex: 0,
    },
    {
      name: '光强',
      type: 'line',
      data: props.data.map((item) => item.guangqiang),
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colors[1],
      },
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
          name: '能见度',
          type: 'line',
          data: newVal.map((item) => item.nengjiandu),
          yAxisIndex: 0,
        },
        {
          name: '光强',
          type: 'line',
          data: newVal.map((item) => item.guangqiang),
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

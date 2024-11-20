<template>
  <!-- <dv-border-box12> -->
  <div ref="chartsDom" class="w-full h-full"></div>
  <!-- </dv-border-box12> -->
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '光电、风电、压电',
  },
  data: {
    type: Array,
    default: () => {
      return [
        {
          name: 'data1',
          guangdian: '0',
          fengdian: '1.34',
          yadian: '0',
        },
        {
          name: 'data2',
          guangdian: '2',
          fengdian: '0',
          yadian: '0',
        },
        {
          name: 'data3',
          guangdian: '0',
          fengdian: '1.53',
          yadian: '0',
        },
        {
          name: 'data4',
          guangdian: '0',
          fengdian: '0',
          yadian: '0',
        },
        {
          name: 'data5',
          guangdian: '0',
          fengdian: '0',
          yadian: '0',
        },
      ];
    },
  },
});

// 绑定图表的dom对象
const chartsDom = ref(null);
// 图表对象
let mychart = null;

const colors = ['#DE6E6A', '#F2CA6B', '#5A6FC0'];

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
      type: 'shadow',
    },
  },
  legend: {
    data: ['光电', '风电', '压电'],
    textStyle: {
      color: '#ffffff',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: [],
      axisLabel: {
        color: '#ffffff',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '光电',
      min: 20000,
      max: 30000,
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0],
        },
      },
      axisLabel: {
        formatter: '{value} V',
      },
    },
    {
      type: 'value',
      name: '风电',
      min: 20000,
      max: 50000,
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
    {
      type: 'value',
      name: '压电',
      min: 5000,
      max: 20000,
      position: 'right',
      offset: 80,
      axisLine: {
        lineStyle: {
          color: colors[2],
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
      name: '光电',
      type: 'line',
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colors[0],
      },
      data: props.data.map((item) => item.guangdian),
      yAxisIndex: 0,
    },
    {
      name: '风电',
      type: 'line',
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colors[1],
      },
      data: props.data.map((item) => item.fengdian),
      yAxisIndex: 1,
    },
    {
      name: '压电',
      type: 'line',
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colors[2],
      },
      data: props.data.map((item) => item.yadian),
      yAxisIndex: 2,
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
          name: '光电',
          type: 'line',
          emphasis: {
            focus: 'series',
          },
          itemStyle: {
            color: colors[0],
          },
          data: newVal.map((item) => item.guangdian),
          yAxisIndex: 0,
        },
        {
          name: '风电',
          type: 'line',
          emphasis: {
            focus: 'series',
          },
          itemStyle: {
            color: colors[1],
          },
          data: newVal.map((item) => item.fengdian),
          yAxisIndex: 1,
        },
        {
          name: '压电',
          type: 'line',
          emphasis: {
            focus: 'series',
          },
          itemStyle: {
            color: colors[2],
          },
          data: newVal.map((item) => item.yadian),
          yAxisIndex: 2,
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

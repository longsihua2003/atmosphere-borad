<template>
  <div ref="chartsDom" class="w-full h-full"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '风速风向图表',
  },
  data: {
    type: Array,
    default: () => {
      return [
        {
          name: 'data1',
          fengsu: '1',
          fengxiang: '50',
        },
        {
          name: 'data2',
          fengsu: '3',
          fengxiang: '51',
        },
        {
          name: 'data3',
          fengsu: '0',
          fengxiang: '52',
        },
        {
          name: 'data4',
          fengsu: '1.4',
          fengxiang: '53',
        },
        {
          name: 'data5',
          fengsu: '1.8',
          fengxiang: '54',
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
      // fontSize: 24,
    },
  },
  media: [
    {
      query: {
        minWidth: 768, // 屏幕宽度大于等于 768px 时应用
      },
      option: {
        title: {
          textStyle: {
            fontSize: 30, // 在大屏幕上使用更大的字体
          },
        },
        grid: {
          top: '22%',
          bottom: '10%',
        },
      },
    },
    {
      query: {
        maxWidth: 768, // 屏幕宽度小于 768px 时应用
      },
      option: {
        title: {
          textStyle: {
            fontSize: 15, // 在小屏幕上使用更小的字体
          },
        },
        grid: {
          top: '12%',
          bottom: '5%',
        },
      },
    },
  ],
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      const index = params[0].dataIndex;
      return `${params[0].name}<br />风速：${params[0].value}<br />风向：${props.data[index].fengxiang}`;
    },
  },
  // grid: {
  //   top: '20%',
  //   bottom: '10%',
  // },
  legend: {
    data: ['风速'],
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
      name: '风速',
      min: 0,
      max: 5,
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0],
        },
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
      name: '风速',
      type: 'line',
      data: props.data.map((item) => item.fengsu),
      itemStyle: {
        color: colors[0],
      },
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
          name: '风速',
          type: 'line',
          data: newVal.map((item) => item.fengsu),
          itemStyle: {
            color: colors[0],
          },
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

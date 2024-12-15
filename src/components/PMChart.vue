<template>
  <div ref="chartsDom" class="w-full h-full"></div>
</template>

<script setup>
import { name } from 'dayjs/locale/zh-cn';
import * as echarts from 'echarts';
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
        legend: {
          left: 'center',
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
          bottom: '10%',
          left: '12%',
          right: '12%',
        },
        legend: {
          left: 'right',
        },
        yAxis: {
          name: '',
        },
      },
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
  // grid: {
  //   top: '20%',
  //   bottom: '10%',
  // },
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
      name: 'PM2.5',
      type: 'line',
      data: props.data.map((item) => item.pm25),
      itemStyle: {
        color: colors[0],
      },
      yAxisIndex: 0,
    },
    {
      name: 'PM10',
      type: 'line',
      data: props.data.map((item) => item.pm10),
      itemStyle: {
        color: colors[1],
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
          name: 'PM2.5',
          type: 'line',
          data: newVal.map((item) => item.pm25),
          itemStyle: {
            color: colors[0],
          },
          yAxisIndex: 0,
        },
        {
          name: 'PM10',
          type: 'line',
          data: newVal.map((item) => item.pm10),
          itemStyle: {
            color: colors[1],
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

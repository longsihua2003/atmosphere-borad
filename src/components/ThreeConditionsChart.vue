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
    default: '结冰、水膜、积雪',
  },
  data: {
    type: Array,
    default: () => {
      return [
        {
          name: 'data1',
          jiebin: '0',
          shuimo: '1.34',
          jixue: '0',
        },
        {
          name: 'data2',
          jiebin: '2',
          shuimo: '0',
          jixue: '0',
        },
        {
          name: 'data3',
          jiebin: '0',
          shuimo: '1.53',
          jixue: '0',
        },
        {
          name: 'data4',
          jiebin: '0',
          shuimo: '0',
          jixue: '0',
        },
        {
          name: 'data5',
          jiebin: '0',
          shuimo: '0',
          jixue: '0',
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
    axisPointer: {
      type: 'shadow',
    },
  },
  // grid: {
  //   top: '20%',
  //   bottom: '10%',
  // },
  legend: {
    data: ['结冰', '水膜', '积雪'],
    textStyle: {
      color: '#ffffff',
    },
  },
  // grid: {
  //   left: '3%',
  //   right: '4%',
  //   bottom: '3%',
  //   containLabel: true,
  // },
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
      name: '厚度',
      type: 'value',
      min: 0,
      max: 5,
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0],
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
      name: '结冰',
      type: 'bar',
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colors[0],
      },
      data: props.data.map((item) => item.jiebin),
    },
    {
      name: '水膜',
      type: 'bar',
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colors[1],
      },
      data: props.data.map((item) => item.shuimo),
    },
    {
      name: '积雪',
      type: 'bar',
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colors[2],
      },
      data: props.data.map((item) => item.jixue),
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
          name: '结冰',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          itemStyle: {
            color: colors[0],
          },
          data: newVal.map((item) => item.jiebin),
        },
        {
          name: '水膜',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          itemStyle: {
            color: colors[1],
          },
          data: newVal.map((item) => item.shuimo),
        },
        {
          name: '积雪',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          itemStyle: {
            color: colors[2],
          },
          data: newVal.map((item) => item.jixue),
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

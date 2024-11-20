<template>
  <!-- <dv-border-box12> -->
  <div ref="chartsDom" class="w-full h-full"></div>
  <!-- </dv-border-box12> -->
</template>

<script setup>
import * as echarts from 'echarts';

const props = defineProps({
  title: {
    type: String,
    default: '默认图表',
  },
  // 多重折线图数据
  data: {
    type: JSON,
    // 传入数据格式应为
    // {
    //      x1: [y1,……],
    //      x2: [y2,……],
    //      ……
    // }
    default: () => {
      return {
        周一: [120, 132, 101, 134, 90, 230, 210],
        周二: [220, 182, 191, 234, 290, 330, 310],
        周三: [150, 232, 201, 154, 190, 330, 410],
        周四: [320, 332, 301, 334, 390, 330, 320],
        周五: [820, 932, 901, 934, 1290, 1330, 1320],
      };
    },
  },
});

// 绑定图表的dom对象
const chartsDom = ref(null);
// 图表对象
let mychart = null;

// 图表配置
const option = {
  color: '#ffffff',
  // backgroundColor: '#ffffff', // 背景色
  title: {
    text: props.title,
    textStyle: {
      color: '#ffffff',
    },
  },
  tooltip: {
    trigger: 'item',
  },
  // 图例
  legend: {
    data: [],
    textStyle: {
      color: '#ffffff',
    },
  },
  // 网格(调整图在div当中的占位)
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  // 工具栏
  toolbox: {
    feature: {
      // 保存为图片
      saveAsImage: {
        // iconStyle: {
        //     color: '#ffffff'
        // }
      },
      // // 数据视图
      // dataView: {
      //     iconStyle: {
      //         color: '#ffffff'
      //     }
      // }
    },
  },
  // x轴
  xAxis: {
    // 有多种轴情况，category(类目轴)、value(数值轴)、time(时间轴)、log(对数轴)
    type: 'category',
    // 是否在两端留白
    boundaryGap: false,
    data: [],
    axisLabel: {
      color: '#ffffff',
    },
  },
  // y轴
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#ffffff',
    },
  },
  // 系列
  series: [],
};

// 初始化图表
onMounted(() => {
  mychart = echarts.init(chartsDom.value);
  option.xAxis.data = Object.keys(props.data);
  option.legend.data = Object.keys(props.data);
  Object.keys(props.data).forEach((key) => {
    option.series.push({
      name: key,
      type: 'line',
      // 设置折线图是否堆叠
      // stack: '总量',
      data: props.data[key],
    });
  });
  mychart.setOption(option);
});

// 监听窗口变化，自适应图表
onMounted(() => {
  window.addEventListener('resize', () => {
    mychart.resize();
  });
});

// 卸载图表
onUnmounted(() => {
  window.removeEventListener('resize', () => {
    mychart.resize();
  });
});

function data_verification() {
  // 数据是否为空
  if (Object.keys(props.data).length === 0) {
    console.error('数据为空');
    return false;
  }
  // 数据是否为对象
  if (Object.prototype.toString.call(props.data) !== '[object Object]') {
    console.error('数据格式错误');
    return false;
  }
  // 数据格式是否正确
  for (const key in props.data) {
    if (!Array.isArray(data[key])) {
      console.error('数据格式错误');
      return false;
    }
  }
  return true;
}

// 监听数据变化
watch(props.data, (newData) => {
  if (!data_verification()) {
    return;
  }
  // 检测数据是否合理
  // 清空原有数据
  option.xAxis.data = [];
  option.legend.data = [];
  option.series = [];
  // 重新赋值
  option.xAxis.data = Object.keys(newData);
  option.legend.data = Object.keys(newData);
  option.series = [];
  Object.keys(newData).forEach((key) => {
    option.series.push({
      name: key,
      type: 'line',
      // 设置折线图是否堆叠
      // stack: '总量',
      data: newData[key],
    });
  });
  mychart.setOption(option);
});
</script>

<style lang="scss" scoped>
.echarts-div {
  @apply min-h-full min-w-full;
}
</style>

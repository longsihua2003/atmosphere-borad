// 温度、湿度数据
export const TempandHum = [];

// 3项情况数据（结冰、水膜、积雪）
export const ThreeConditions = [];

// 风速风向数据
export const WindSpeedandDirection = [];

// PM2.5和PM1.0数据
export const PM = [];

// 雨量、雨强数据
export const Rainfall = [];

// 能见度、光强数据
export const VisibilityandLightIntensity = [];

// 电流、电压数据
export const CurrentandVoltage = [];

// 光电、风电、压电数据
export const SolarWindPressure = [];

// 请求/处理数据
import { get } from '@/utils/request';
export const getData = async (start_time, end_time) => {
  // 默认start_time为当前时间戳-1天，end_time为当前时间戳。
  start_time = start_time || new Date().getTime() - 86400000;
  end_time = end_time || new Date().getTime();

  try {
    const res = get('/borad/1/20', {
      start_time,
      end_time,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 处理数据
export const handleData = (data) => {
  // data: Array
  // 返回处理后的数据
  // 如果原来有数据，进行清除
  if (
    TempandHum.length > 0 ||
    ThreeConditions.length > 0 ||
    WindSpeedandDirection.length > 0 ||
    PM.length > 0 ||
    Rainfall.length > 0 ||
    VisibilityandLightIntensity.length > 0 ||
    CurrentandVoltage.length > 0 ||
    SolarWindPressure.length > 0
  ) {
    TempandHum.splice(0, TempandHum.length);
    ThreeConditions.splice(0, ThreeConditions.length);
    WindSpeedandDirection.splice(0, WindSpeedandDirection.length);
    PM.splice(0, PM.length);
    Rainfall.splice(0, Rainfall.length);
    VisibilityandLightIntensity.splice(0, VisibilityandLightIntensity.length);
    CurrentandVoltage.splice(0, CurrentandVoltage.length);
    SolarWindPressure.splice(0, SolarWindPressure.length);
  }
  data.forEach((item) => {
    // 将item装化为json对象
    // 处理数据
    const temp_item = {
      name: item.create_time,
      wendu: item.wendu,
      shidu: item.shidu,
    };
    TempandHum.push(temp_item);

    const three_item = {
      name: item.create_time,
      jiebin: item.jiebin,
      shuimo: item.shuimo,
      jixue: item.jixue,
    };
    ThreeConditions.push(three_item);

    const wind_item = {
      name: item.create_time,
      fengsu: item.fengsu,
      fengxiang: item.fengxiang,
    };
    WindSpeedandDirection.push(wind_item);

    const pm_item = {
      name: item.create_time,
      pm25: item.pm25,
      pm10: item.pm10,
    };
    PM.push(pm_item);

    const rain_item = {
      name: item.create_time,
      yuliang: item.yuliang,
      yuqiang: item.yuqiang,
    };
    Rainfall.push(rain_item);

    const vis_item = {
      name: item.create_time,
      nengjiandu: item.nengjiandu,
      guangqiang: item.guangqiang,
    };
    VisibilityandLightIntensity.push(vis_item);

    const current_item = {
      name: item.create_time,
      dianliu: item.dianliu,
      dianya: item.dianya,
    };
    CurrentandVoltage.push(current_item);

    const solar_item = {
      name: item.create_time,
      guangdian: item.guangdian,
      fengdian: item.fengdian,
      yadian: item.yadian,
    };
    SolarWindPressure.push(solar_item);
  });
};

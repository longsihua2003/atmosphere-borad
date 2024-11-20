import requests
import time
import hmac
import hashlib


def get_data(start_time, end_time, page, page_size):
    """获取信息原路返回
    Args:
        start_time: 开始时间
        end_time: 结束时间
        page: 页数
        page_size: 每页数量
    """
    url = 'http://weather-api.jsjldzkj.com/api/getDeviceData/' + str(page) + '/' + str(page_size)

    # 密钥对
    appid = 'dashboard'
    key = 'shujukanban@2024'

    # 获取当前时间戳(取整13位)
    timestamp = str(int(time.time() * 1000))

    # 确保 JSON 结构完全一致，避免空格和字符编码问题
    data = '{"appid":"%s","timestamp":"%s"}' % (appid, timestamp)

    # 计算 authorization（sha256编码）
    authorization = hmac.new(key.encode('utf-8'), data.encode('utf-8'), hashlib.sha256).hexdigest()

    # 设置请求头
    headers = {
        'Authorization': authorization,
        'timestamp': timestamp
    }
    # 设置params
    params = {
        'search[start_time]': start_time,
        'search[end_time]': end_time
    }

    print(params)
    # 发送请求
    response = requests.get(url, headers=headers, params=params)
    # print(response.text)
    return response

if __name__ == '__main__':
    get_data(None,None,1,10)
#
# # 配置
# url = 'http://weather-api.jsjldzkj.com/api/getDeviceData/1/3'
#
# for i in response.json()['result']['list']:
#     print(i)
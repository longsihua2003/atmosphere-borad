import data
from flask import Flask, request, jsonify
# from flask_cors import CORS

app = Flask(__name__)
# 全局启用 CORS
# CORS(app)

@app.route('/api/borad/<int:page>/<int:page_size>', methods=['GET'])
def get_data(page, page_size):
    print(page, page_size)
    start_time = request.args.get('start_time', None)
    end_time = request.args.get('end_time', None)
    if start_time is None or end_time is None:
        return jsonify({'error': 'start_time or end_time is required'})
    response = data.get_data(start_time, end_time, page, page_size)
    # print(response.json())
    return jsonify(response.json())

@app.route('/api/dh', methods=['GET'])
def get_dh():
    # 测试数据
    return jsonify({'data': 'dh'})


if __name__ == '__main__':
    # app.run(port=8080, debug=True)
    app.run(port=52000, debug=True)
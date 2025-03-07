
#!/bin/bash

# 设置端口
FLASK_PORT=52000
VUE_PORT=5173

echo "=============================="
echo " 🚀  启动 Flask + Vue 项目"
echo "=============================="

# 启动 Flask
echo "🟢 启动 Flask 后端 (http://127.0.0.1:$FLASK_PORT)..."
cd backend && poetry run python backend.py & 

# 启动 Vue
echo "🟢 启动 Vue 前端 (http://localhost:$VUE_PORT)..."
npm run dev &  # 直接运行 Vue 项目，注意不需要进入 frontend 目录

echo "=============================="
echo "✅  Flask & Vue 启动成功！"
echo "🔗  Flask: http://127.0.0.1:$FLASK_PORT"
echo "🔗  Vue: http://localhost:$VUE_PORT"
echo "=============================="

# 保持进程运行
wait


---
Date: 2025-07-31 18:36:04
LastEditTime: 2025-07-31 18:40:23
---

# Linux 删除 nginx 服务

```bash
# 1. 禁用开机自启（即使文件还在也不会自动启动）
sudo systemctl disable nginx.service

# 2. 立即停止当前运行中的 nginx
sudo systemctl stop nginx.service

# 3. 找到并删除对应的 unit 文件
sudo rm -f /etc/systemd/system/nginx.service \
           /usr/lib/systemd/system/nginx.service \
           /lib/systemd/system/nginx.service

# 4. 让 systemd 重新加载配置
sudo systemctl daemon-reload

# 5. 可选：确认已不存在
systemctl list-unit-files | grep nginx   # 应无输出
systemctl cat nginx.service              # 应提示 No such file
```
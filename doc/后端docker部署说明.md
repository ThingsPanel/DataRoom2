# DataRoom 快速部署

## 1. 拉取镜像
```bash
docker pull registry.cn-hangzhou.aliyuncs.com/thingspanel/dataroom-server:2.1.0
```

## 2. 导出配置文件
```bash
mkdir -p /opt/tp/dataroom/sql
mkdir -p /opt/tp/dataroom/config

CONTAINER_ID=$(docker create registry.cn-hangzhou.aliyuncs.com/thingspanel/dataroom-server:2.1.0)
docker cp ${CONTAINER_ID}:/db/. /opt/tp/dataroom/sql/
docker cp ${CONTAINER_ID}:/app/dataRoom/config/application-docker.yml /opt/tp/dataroom/config/
docker rm ${CONTAINER_ID}
```

## 3. 初始化数据库
```bash
docker exec -i tp-mysql mysql -uroot -prootThingspanel dataroom < /opt/tp/dataroom/sql/init.sql
```

## 4. 修改配置
编辑 `/opt/tp/dataroom/config/application-docker.yml`，修改数据库连接信息

检查配置是否正确：
```bash
cat /opt/tp/dataroom/config/application-docker.yml | grep -A 3 datasource
```

## 5. 启动容器
使用 `host` 网络模式可省去端口映射，容器将直接占用宿主机的 9083 端口（或 `application-docker.yml` 中配置的端口）。

```bash
mkdir -p /opt/tp/dataroom/data

# 启动（host 网络）
docker run -d \
  --name dataroom \
  --network host \
  -e RUN_ENV=docker \
  -v /opt/tp/dataroom/config/application-docker.yml:/app/dataRoom/config/application-docker.yml \
  -v /opt/tp/dataroom/data:/data \
  registry.cn-hangzhou.aliyuncs.com/thingspanel/dataroom-server:2.1.0
```

## 6. 验证
```bash
docker logs -f dataroom
```

## 常用命令
```bash
# 停止
docker stop dataroom

# 重启
docker restart dataroom

# 查看日志
docker logs dataroom
```
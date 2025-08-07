FROM openjdk:8-jdk-alpine
# 创建运行目录
RUN mkdir -p /app/dataRoom
# 复制jar包到运行目录
COPY DataRoom/dataroom-server/target/dataroom-server.jar /app/dataRoom
# 创建配置文件目录
RUN mkdir -p /app/dataRoom/config
# 复制全部 YAML 配置文件到运行目录
COPY doc/docker/*.yml /app/dataRoom/config
# 创建资源保存目录
RUN mkdir -p /data
# 创建数据库文件目录
RUN mkdir -p /db
# 将 SQL 脚本复制到数据库目录，方便容器外部使用
COPY DataRoom/doc/*.sql /db
# 设置工作目录
WORKDIR /app/dataRoom
# 添加环境变量
ENV RUN_ENV=docker
# 移除 --server.servlet.context-path= 参数，让配置文件中的设置生效
ENTRYPOINT ["sh", "-c", "java -jar -Duser.timezone=GMT+8 dataroom-server.jar --spring.profiles.active=docker"]


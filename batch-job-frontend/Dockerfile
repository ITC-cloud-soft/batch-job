# 使用官方 Node.js 作为基础镜像，用于构建项目
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 到工作目录
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile

# 复制项目文件到工作目录
COPY . .

# 构建项目
RUN yarn build

# 使用 nginx 作为基础镜像来服务构建好的静态文件
FROM nginx:alpine

# 复制构建好的文件到 nginx 的 html 文件夹
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义的 nginx 配置文件 (如果有)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露容器的 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]

FROM node:10.15.3-alpine
MAINTAINER collby
RUN mkdir -p /app
COPY . /app
WORKDIR /app

#此为cnpm淘宝镜像
#RUN npm config set registry https://registry.npm.taobao.org

ENV NODE_ENV=production
ENV HOST 0.0.0.0
EXPOSE 3000

RUN npm install
RUN npm run build
CMD ["npm", "start"]

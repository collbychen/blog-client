FROM node:15.5.0-alpine3.10

MAINTAINER collby

ENV NODE_ENV=production
ENV HOST 0.0.0.0
EXPOSE 3000

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build
CMD ["npm", "start"]

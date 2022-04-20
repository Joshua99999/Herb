# syntax=docker/dockerfile:1
FROM node:16 AS build
WORKDIR /app
COPY package* yarn.lock ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
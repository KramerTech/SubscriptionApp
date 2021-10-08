FROM node:14.17.6-alpine
WORKDIR /app
COPY ./package.json .
COPY . .
RUN npm install && npm cache clean --force
RUN npm run build --prod

FROM nginx:1.20.1-alpine
COPY --from=0 /app/dist/webapp /usr/share/nginx/html
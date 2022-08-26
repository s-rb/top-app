FROM node:14-alpine
WORKDIR /opt/app
#Копируем package
ADD package.json package.json
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run build
#Выкидываем ненужные в продакшен зависимости
RUN npm prune --production
#Стартуем сервер
CMD ["npm start"]
#Покажем наружу порт
EXPOSE 3000
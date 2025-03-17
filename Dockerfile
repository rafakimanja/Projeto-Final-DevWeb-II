FROM node:latest AS build-react
WORKDIR /app
COPY ./app/package.json ./app/package-lock.json ./
RUN npm install
COPY ./app ./
RUN npm install
CMD ["npm", "start"]
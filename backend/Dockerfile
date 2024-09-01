FROM node:20-bullseye-slim
WORKDIR /code
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
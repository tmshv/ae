FROM node:10 as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY .babelrc next.config.js tsconfig.json tslint.json ./
COPY static ./static
COPY src ./src
COPY pages ./pages

RUN npm run build && npm run export


# Run
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=build /app/out /usr/share/nginx/html
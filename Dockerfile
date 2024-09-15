# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts-alpine AS development

ENV YARN_VERSION=4.2.2

# update dependencies, add libc6-compat and dumb-init to the base image
RUN apk update && apk upgrade && apk add --no-cache libc6-compat && apk add dumb-init

# install and use yarn 4.x
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

# Set working directory
WORKDIR /app

#
COPY package.json /app/package.json
COPY .yarn /app/.yarn
COPY yarn.lock /app/yarn.lock
COPY .yarnrc.yml /app/.yarnrc.yml

# Same as npm install
RUN yarn install --immutable
RUN npm i -g serve

COPY . /app

ENV CI=true
ENV PORT=3000

CMD [ "yarn", "start" ]

FROM development AS build

RUN yarn build

EXPOSE 3000

CMD ["serve", "-s", "dist"]

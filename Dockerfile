FROM node:16.14.2 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ENV NODE_OPTIONS=--max_old_space_size=4096

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production=false

COPY . . 

RUN yarn build
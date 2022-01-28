FROM node:16-alpine

COPY src src
COPY yarn.lock .
COPY package.json .
COPY svelte.config.js .
COPY tsconfig.json .

RUN yarn install
RUN yarn build

CMD ["node", "build/index.js"]

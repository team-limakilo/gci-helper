FROM node:16-alpine

COPY src src
COPY package.json .
COPY package-lock.json .
COPY svelte.config.js .
COPY tsconfig.json .

RUN npm ci
RUN npm run build

CMD ["node", "build/index.js"]

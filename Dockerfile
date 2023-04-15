FROM node:12.22.12-alpine3.15

ENV NODE_VERSION 12.22.1
ENV HOME /app
ENV PORT 8080

# uncomment this line if you're using localhost as DB_HOST
# or set host.docker.internal in your env file instead
# ENV DB_HOST host.docker.internal

RUN mkdir -p ${HOME}

WORKDIR ${HOME}

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-scripts

COPY tsconfig.json ./
COPY .env ./
COPY src ./src
#COPY fullchain.pem privkey.pem ./

# build app
RUN yarn install && yarn build

EXPOSE 8080
CMD ["yarn", "start"]
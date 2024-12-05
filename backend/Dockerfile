FROM node:lts AS development

ENV NODE_ENV $NODE_ENV

WORKDIR /code

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT 9229 9230

COPY package.json /code/package.json

COPY package-lock.json /code/package-lock.json

RUN npm ci

COPY . /code

CMD ["npm", "start"]

COPY --from=gloursdocker/docker / /

FROM node:lts AS development

ENV CI=false
ENV PORT=3000

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci

COPY . /code

CMD [ "npm", "start" ]

FROM development AS builder

RUN npm run build
RUN npm install -g serve

COPY --from=gloursdocker/docker / /

CMD ["serve", "-s", "build"]

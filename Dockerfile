FROM node:12

ARG ENVIRON1

ENV ENVIRON=$ENVIRON1

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY ./ /app/

CMD [ "node", "src/ReportBackend.js" ]

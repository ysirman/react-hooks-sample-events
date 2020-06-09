FROM node:12.16.1-alpine3.9
COPY ./react-hooks-101 /react-hooks-101
WORKDIR /react-hooks-101
RUN yarn install
EXPOSE 3000
ENV CI true
CMD npm start

FROM node

RUN mkdir /code
WORKDIR /code

ADD . /code

EXPOSE 3000

CMD ["npm", "start"]

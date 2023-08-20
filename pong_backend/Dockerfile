FROM node:18.16.0

WORKDIR /usr/src/app

COPY . .

COPY ./start_script.sh .

RUN chmod 777 ./start_script.sh

ENTRYPOINT ["sh", "./start_script.sh"]

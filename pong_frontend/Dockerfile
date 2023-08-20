FROM node:18.16.0

# USER node

WORKDIR /usr/src/app

COPY . .

COPY ./start_script.sh .

RUN chmod 777 ./start_script.sh

RUN npm install --force

ENTRYPOINT ["sh", "./start_script.sh"]
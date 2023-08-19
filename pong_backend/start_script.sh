npm install -g @nestjs/cli @nestjs/common@latest @nestjs/core @nestjs/platform-express nodemon
npm ci

nodemon --watch . --ext ts src/main.ts

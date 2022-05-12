# «COIN»

## Установка и запуск проекта
1. Для запуска данного проекта вам понадобится nodejs и npm.
2. Выполните `npm i` для установки нужных пакетов.
3. Команды:
  1. `npm run serve` запускает сервер, по умолчанию на `3000`-ом порту localhost.
  2. `npm start` одновременно запускает сервер (по умолчанию на `3000`-ом порту localhost), и запускает выполнение сборки в режиме разработки (по умолчанию на `8080`-ом порту localhost).
  3. `npm run dev` запускает выполнение сборки в режиме разработки (по умолчанию на `8080`-ом порту localhost).
  4. `npm run build` запускает выполнение минифицированной сборки для продакшена, которая будет находиться в директории папки `./dist`.
  5. `npm start:build` одновременно запускает сервер (по умолчанию на `3000`-ом порту localhost), и запускает выполнение минифицированной сборки для продакшена, которая будет находиться в директории папки `./dist` для запуска проета локально.
  6. `npm run test` запускает выполнение unit-tests от JavaScript-фреймворка `Jest` относительно валидации формы.
  7. `npm run cypress` одновременно запускает сервер, сборку в режиме разработки и выполнение end-2-end tests от JavaScript-фреймворка `Сypress` (по умолчанию тесты работают на `8080`-ом порту localhost), в открытом окне `Cypress` для запуска тестов открыть файл `coin.spec.js`.

## Логин и пароль для входа в аккаунт
* Логин: `developer`
* Пароль: `skillbox`

* Выполнен адаптив приложения (min-width: 450px).
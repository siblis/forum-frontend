#  forum_frontend

## документация vue

https://ru.vuejs.org/v2/guide/index.html

## установка ноды на винду

https://blog.teamtreehouse.com/install-node-js-npm-windows

команды для работы с проектом

## Project setup // установка зависимостей
```
npm install
```

### Compiles and hot-reloads for development // запуск сервера
```
npm run serve
```

### Compiles and minifies for production // сборка для продакшн
```
npm run build
```

### Lints and fixes files  // проверка ошибок
```
npm run lint
```

Инструкция по работе с проектом.

Проект собран сразу под работу с Vue, поэтому для его корректной сборки все страницы (в том числе, html) необходимо оформлять в виде компонентов.
Страницы лежат в папаке pages, компоненты - соответственно, в components.

Как добавлять новый элемент: выбирать/создавать компонент по названию страницы, писать html код внутри тега template,
писать стили к странице под кодом html в теге style (поддерживается sass).

Добавлен роутинг. Роуты настраиваются в файле main.js.

К проекту подключен Vuex


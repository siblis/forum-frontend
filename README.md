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
В папке components сделаны заготовки для первых страниц.
Когда они будут сверстаны, то будут разобраны на реальные компоненты, которым уже будет прикручиваться логика с помощью Vue.

Как верстать: выбирать компонент по названию страницы, писать html код внутри тега template (см. Example),
писать стили к странице под кодом html в теге style (чистый css без препроцессоров) - также см. пример Example.

Чтобы открыть нужную страницу, нужно переключить компонент в в App.vue

data: () => {
      return {
        page: 'ForumList'  ------> вот тут название своего компонента
      }




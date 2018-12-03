<template>
    <div class="container">
        <button class="enter">Вход</button>
        <br>
        <button class="reg">Регистрация</button>
        <br>
        <button class="public">Опубликовать тему</button>
        <br>
        <button class="cancel">Отмена</button>
        <br>
        <button class="add">Добавить тему  +</button>
        <br>
        <button class="entry">Войти</button>
    </div>
</template>

<script>
    export default {
        name: 'Example',
        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
button
    margin-bottom: 15px

.enter
    width: 84px
    height: 30px
    background: #c4c4c4
    border-radius: 5px
    //border-color:
    font-weight: 500
    font-size: 14px
    line-height: normal
    text-align: center
    color: #000000

.reg
    width: 129px
    height: 30px
    background: #c4c4c4
    border-radius: 5px
    font-weight: 500
    font-size: 14px
    line-height: normal
    text-align: center
    color: #000000

.public
    width: 176px
    height: 40px
    //box-shadow: 0 2px 2px rgba(0,0,0,0.1)
    font-weight: normal
    font-size: 16px
    line-height: normal
    text-align: center
    color: #000000
    background: #c4c4c4
    border-radius: 5px

.cancel
    width: 120px
    height: 40px
    box-shadow: 0 2px 2px rgba(0,0,0,0.1)
    font-weight: normal
    font-size: 16px
    line-height: normal
    text-align: center
    color: #000000
    background: #c4c4c4
    border-radius: 5px

.add
    width: 221px
    height: 45px
    background: #4d4d4d
    border-radius: 5px
    box-shadow: 0 2px 2px rgba(0,0,0,0.1)
    font-weight: normal
    font-size: 16px
    line-height: normal
    text-align: center
    color: #ffffff

.entry
    width: 380px
    height: 40px
    background: #959595
    border-radius: 5px
    box-shadow: 0 2px 2px rgba(0,0,0,0.1)
    font-weight: normal
    font-size: 16px
    line-height: normal
    text-align: center
    color: white
</style>

<template>
  <div>
    <div class="container">
      <div class="post_unit">
        <div class="left">
          <h3>PHP проблемы</h3>
          <p>apache2,openserv,server,php7,php5,php</p>
          <p class="author">Автор: Кирилл К.</p>
        </div>
        <div class="right">
          <p>12 <br> комментариев</p>
        </div>
      </div>
      <div class="post_unit">
        <div class="left">
          <h3>Что посоветуете?</h3>
          <p>С чего начать?,новичек помогите</p>
        </div>
        <div class="right">
          <p>1 <br> комментарий</p>
        </div>
      </div>
      <div class="post_unit">
        <div class="left">
          <h3>Ошибка при подключении к MySQL</h3>
          <p>mysql,java</p>

        </div>
        <div class="right">
          <p>2<br> ответа</p>
        </div>
      </div>
      <div class="post_unit">
        <div class="left">
          <h3>Не могу записать данные в mysql</h3>
          <p>mysql,java</p>
        </div>
        <div class="right">
          <p> 5 <br> ответов</p>
        </div>
      </div>
      <div class="post_unit">
        <div class="left">
          <h3>Как узнать склонен ли ты к этому?</h3>

        </div>
        <div class="right">
          <p>9</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ForumList',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    width: 1400px;

    margin: 0 auto;
  }
  .post_unit{
    padding: 30px;
    line-height: 6px;
    height: 100px;
    border: 1px solid darkgray;


  }


  .left{
    float: left;

  }
  .left, .headline p{
    color: gray;
    opacity: 0.7;
  }
  .left .author{
    color: red;
  }
  h3{
    color: darkslategray;

  }
  .headline{
    width: 100%;
    line-height: 6px;
  }
  .headline h2{
    color: darkslategray;
    font-size: 50px;

  }
  .right{
    width: 100px;
    float: right;
    line-height: 30px;
    text-align: center;
    color: green;
  }
  .post{
    margin-top: 50px;

  }
  .post img{
    float: left;
    margin-right: 10px;
  }
  .post li{
    list-style-type: none;
    display: inline;
    padding-left: 20px;
  }

  .post a{
    text-decoration: none
  ;
  }
  .comments{
    padding-top: 30px;


  }
  .main_coment{
    margin-bottom: 20px;
  }
  .comments img{
    margin-right: 10px;
  }
  .coment{
    margin-bottom: 20px;
  }
  .answer{
    color: gray;
    opacity: 0.7;
    margin-left: 30px;
  }
</style>

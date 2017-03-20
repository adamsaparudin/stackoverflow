<template>
  <div class="col-md-9" id="left">
    <!-- <h1>{{ teks }}</h1>
    <button type="button" name="button" v-on:click="trigger1">Go</button> -->
    <h3>Latest Questions</h3>
    <div class="row" v-for="question in questions">
      <div class="col-md-1">
        <span>{{ question.score }}</span><br>
        Votes
      </div>
      <div class="col-md-1">
        <span>{{ question.listAnswer.length }}</span><br>
        Answers
      </div>
      <div class="col-md-1">
        <span>1</span><br>
        Views
      </div>

      <div class="col-md-9">
        <a :href="'/questions/' + question._id"><h3>{{ question.title }}</h3></a>
        <p class="text-right">asked 4 sec ago <a href="#">{{ question.poster.username }}</a></p>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    name: 'LeftBar',
    props: ['teks', 'questions'],
    data() {
      return {
        listQuestion: '',
      }
    },
    methods: {
        trigger1() {
          this.$emit('trigger1')
        }
    }
  };
</script>

<style>
  #left {
    background-color: lightgreen;
  }
  span {
    font-size: 20px;
    text-align: center;
  }
</style>

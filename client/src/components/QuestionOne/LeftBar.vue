<template>
  <div class="col-md-9" id="left">
    <!-- <h1>{{ teks }}</h1>
    <button type="button" name="button" v-on:click="trigger1">Go</button> -->
    <h3>{{ questionOne.title }}</h3>
    <hr></hr>
    <div class="row">
      <div class="col-md-2">

      </div>
      <div class="col-md-10">
        <p>{{ questionOne.details }}</p>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    name: 'LeftBar',
    props: ['teks', 'questionOne'],
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
  p {
    font-size: 18px;
  }
</style>

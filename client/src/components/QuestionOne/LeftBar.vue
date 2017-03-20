<template>
  <div class="col-md-9" id="left">
    <!-- <h1>{{ teks }}</h1>
    <button type="button" name="button" v-on:click="trigger1">Go</button> -->
    <h3>{{ questionOne.title }}</h3>
    <hr></hr>


    <div class="row">
      <div class="col-md-1">
        <button v-on:click="voteQuestion(`http://localhost:3000/api/questions/${questionOne._id}/${$parent.$parent.userMeta._id}/upvote`)">Upvote</button>
        Score : {{ questionOne.score }}
        <button v-on:click="voteQuestion(`http://localhost:3000/api/questions/${questionOne._id}/${$parent.$parent.userMeta._id}/downvote`)">Downvote</button>
      </div>
      <div class="col-md-11">
        <p>{{ questionOne.details }}</p>
        <br>
        <p>{{ questionOne.listAnswer.length }} Answers</p>
        <hr>
      </div>

      <div v-for="answerOne in questionOne.listAnswer">
      <div class="col-md-2">
        <button v-on:click="voteAnswer(`http://localhost:3000/api/answer/${answerOne._id}/${$parent.$parent.userMeta._id}/upvote`)">Upvote</button>
        Score : {{ answerOne.score }}
        <button v-on:click="voteAnswer(`http://localhost:3000/api/answer/${answerOne._id}/${$parent.$parent.userMeta._id}/downvote`)">Downvote</button>
      </div>
      <div class="col-md-10">
        <div class="answer">
          <p>{{ answerOne.answer }}</p>
          <hr>
          <div class="col-md-12 comment" v-for="comment in answerOne.listComment">
            <p>{{ comment.comment }}</p>
            <hr>
          </div>
        </div>
      </div>
      </div>

    </div>
    <h4>Your answer</h4>
    <div class="post-answer row">
      <div class="col-md-10" style="margin: 10px;">
        <textarea v-model="answer" class="form-control" rows="7" style="background-color: #fff"></textarea><br>

        <button type="button" v-on:click="postAnswer" name="button">Go Go Go</button>
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
        answer: ''
      }
    },
    methods: {
      trigger1() {
        this.$emit('trigger1')
      },
      voteQuestion(url) {
        axios.put(url, {})
        .then( (res) => {
          if(res.data.score)
            this.questionOne.score = res.data.score
          else {
            console.log("Stupid Nigga");
          }
        })
        .catch( (error) => {
          console.log(error);
        })
      },
      voteAnswer(url) {
        axios.put(url, {})
        .then( (res) => {
          if(res.data.score) {
            let ansInd = this.questionOne.listAnswer.findIndex(x => x._id == res.data._id)
            let index = this.questionOne.listAnswer[ansInd].listGiveScore.findIndex(x => x.user == this.$parent.$parent.userMeta._id)
            console.log(index);
            this.questionOne.listAnswer[ansInd].score = res.data.score
          }
          else {
            console.log("Stupid Nigga");
          }
        })
        .catch( (error) => {
          console.log(error);
        })
      },
      postAnswer() {
        axios.post('http://localhost:3000/api/answer', {
          answer: this.answer,
          question: this.$route.params.id,
          poster: this.$parent.$parent.userMeta._id
        }).then( (res) => {
          console.log(res.data);
          window.location.href = `/questions/${res.data.question}`
        }).catch( (error) => {
          console.log(error);
        })
      }
    }
  };
</script>

<style>

  .comment {
    padding: 0px 0px 0px 10px;
  }

  .comment p {
    font-size: 14px;
  }
  #left {
    background-color: lightgreen;
  }
  span {
    font-size: 20px;
    text-align: center;
  }
  p {
    font-size: 16px;
  }
</style>

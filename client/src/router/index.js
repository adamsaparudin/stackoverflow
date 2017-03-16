import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Question from '@/components/Questions';
import QuestionOne from '@/components/QuestionOne/QuestionOne'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/questions',
      name: 'Question',
      component: Question,
    },
    {
      path: '/questions/:id',
      name: 'Question One',
      component: QuestionOne,
    },
  ],
});

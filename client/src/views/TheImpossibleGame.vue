<template>
  <section class="the-impossible-game">
    <h1>The Impossible Game</h1>

    <main>
      <h3 class="question-heading">
        <span class="question-label">Question <span class="current-question">1</span> of 8</span>: Click the right button.
      </h3>

      <div class="container q-1">

        <div class="question-inner">
          <button class="left-button" @click="wrong()">Button</button>
          <img class="man" src="../assets/man.png">
          <button class="right-button" @click="right()">Button</button>
        </div>

        <div v-show="isWrong" class="answer">{{wrongAnswerText[1]}}</div>
      </div>

      <div class="success">
        <h2>Correct!</h2>
        <button class="next">Next Question</button>
      </div>



      
    </main>

  </section>
</template>


<script>

export default {
  name: 'TheImpossibleGame',
  components: {
    
  },
  data () {
    return {
      questionNum: 1,
      isWrong: false,
      wrongAnswerText: {
        1: 'Incorrect! You were supposed to click the right button from the perpective of the man!'
      }
    }
  },
  methods: {
    wrong() {
      this.isWrong = true;
    },
    right() {
      console.log('right');
    }
  }
}
</script>


<style scoped lang="scss">
.the-impossible-game {
  padding: 80px;

  h1 {
    margin-bottom: 60px;
  }

  h3 {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 500;

    .question-label {
      font-weight: 700;
    }
  }

  main {
    background-color: #fff;
    padding: 40px;
    border: solid 1px #dedede;
    margin: 0 auto;
    max-width: 800px;

    .container {
      padding: 60px 0;
      width: 450px;
      margin: 0 auto;

      &.q-1 {
        .question-inner {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        button {
          height: 40px;
        }

        .man {
          width: 100px;
        }
      }

      button {
        cursor: pointer;
      }
    }

    .success {
      display: none;

      h2 {
        color: #19d219;
        margin-bottom: 40px;
      }
    }

    .answer {
      margin-top: 40px;
      font-size: 24px;
      line-height: 30px;
      color: #ff0000;
    }
  }
}
</style>

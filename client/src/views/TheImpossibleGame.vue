<template>
  <section class="the-impossible-game">
    <h1>The Impossible Game</h1>

    <main>
      <h3 class="question">
        <span class="question-label">Question <span class="current-question">1</span> of 8</span>: Click the right button.
      </h3>

      <div class="container q-1">
        <button class="left-button">Button</button>
        <img class="man" src="../assets/man.png">
        <button class="right-button">Button</button>
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
    }
  },
}
</script>


<style scoped lang="scss">
.the-impossible-game {
  padding: 80px;

  h1 {
    margin-bottom: 60px;
  }

  h3 {
    margin-bottom: 30px;
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

    .container {
      padding: 60px 0;

      button {
        cursor: pointer;
      }

      &.q-1 {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 450px;
        margin: 0 auto;

        button {
          height: 40px;
        }

        .man {
          width: 100px;
        }
      }
    }
  }
}
</style>

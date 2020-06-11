<template>
  <section class="about wrapper">
    <h1>About Us</h1>

  </section>
</template>


<script>

export default {
  name: 'About',
  components: {
    
  },
  data () {
    return {
    }
  },
}
</script>


<style scoped lang="scss">
.about {
  padding: 80px;

  h1 {
    margin-bottom: 60px;
  }



  @media (max-width: 834px) {
    padding: 20px;

    h1 {
      font-size: 32px;
      line-height: 36px;
      margin-bottom: 20px;
    }
  }
}
</style>

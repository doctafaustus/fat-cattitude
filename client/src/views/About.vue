<template>
  <section class="about wrapper">
    <h1>About Us</h1>
    <div class="about-us-wrapper">
      <p>
        There’s attitude and there’s <i><b>cattitude</b></i>—and Fat Cattitude has a lot of both. We’ve also got t-shirts, mugs, stickers, and hats with cats on them. What more could you want? Paw through our products to see which one (or four) you like.
      </p>

      <p>
        At Fat Cattitude, we don’t take ourselves too seriously, and you shouldn’t either. We’re just here to spread the love of all things cat and have a good laugh (and coerce you to live a <b>Fat Cat Lifestyle</b> 😺). 
      </p>

      <p>
        So if you like memes and cats, you’re in the right place. If you don’t like either, please get off of the internet.
      </p>

      <div class="about-us-signature">—Fat Cattitude</div>
      <a class="about-us-email" href="mailto:meow@fatcattitude.com">meow@fatcattitude.com</a>
    </div>
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

  .about-us-wrapper {
    font-size: 20px;
    line-height: 30px; 
    margin: 0 auto;
    max-width: 740px;

    p {
      text-align: left;
      margin-bottom: 30px;

    }

    .about-us-email {
      color: #00a5d4;
      font-size: 18px;
    }
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

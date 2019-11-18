<template>
  <section>
    <Header></Header>
    <div class="main">

      <!-- Eight Bit -->
      <div class="row eight-bit">
        <h1 class="section-title light">Show off your Fat Cattitude</h1>
        <div class="product-list wrapper">
          <ProductCard v-for="shirt in shirts" :key="shirt.id" :product="shirt"></ProductCard>
        </div>
      </div>

      <!-- Sticker -->
      <div class="row sticker">
        <div class="product-list wrapper">
          <div class="title-card">
            <h1 class="section-title">Don't be a Sticky Vicky</h1>
            <div class="subtitle">And get yourself<br>a sticker!</div>
          </div>
          <ProductCard v-for="sticker in stickers" :key="sticker.id" :product="sticker"></ProductCard>
        </div>
      </div>

      <!-- Side By Side -->
      <div class="row side-by-side">
        <div class="blocks wrapper">

          <div class="block">
            <h1 class="section-title light">NEW: Fat Cat Mug</h1>
            <div class="block-description">
              <span>Sometimes there's a place in our heart for something and we don't even know it.</span>
              <span>We've got that something for you.</span>
              <span>Introducing Burger Bun.</span>
            </div>

            <a class="cta" href="#">Gimme this!</a>

            <a class="block-image-link" href="#">
              <img class="block-image" src="https://ih1.redbubble.net/image.126250173.7747/mug%2Ctravel%2C210x230%2Ccenter-pad%2C210x230%2Cf8f8f8.u1.jpg">
            </a>
          </div>

          <div class="block">
            <h1 class="section-title light">Something Else</h1>
            <div class="block-description">
              <span>Sometimes there's a place in our heart for something and we don't even know it.</span>
              <span>We've got that something for you.</span>
              <span>Introducing Burger Bun.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import shirts from '@/model/shirts.js';
import stickers from '@/model/stickers.js';

export default {
  name: 'Home',
  components: {
    Header,
    ProductCard
  },
  data () {
    return {
      shirts,
      stickers
    }
  },
  mounted() {
    console.log(shirts);
  }
}
</script>


<style scoped lang="scss">
.wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

.row {
  padding: 60px 40px;
  background-position: center center;
  background-repeat: repeat;
  background-size: contain;

  &.eight-bit {
    background-image: url(https://i.ibb.co/z66wrWx/bag.png);
  }

  &.sticker {
    .product-list {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  &.side-by-side {
    padding-top: 0;
  }
}

.section-title,
.subtitle {
  font-family: 'Work Sans', sans-serif;
}

.section-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 60px;
  letter-spacing: 1.5px;

  &.light {
    color: #fff;
  }
}

.subtitle {
  color: #76768d;
  font-size: 28px;;
  line-height: 34px;
}

.cta {
  color: #fff;
  background-image: linear-gradient(270deg,#fb00ff,#fc2fa9,#fd5b57,#ff8a01);
  box-shadow: 0 3px 10px rgba(31,30,48,.15), inset 0 0 20px rgba(22,191,255,0);
  font-size: 20px;
  text-decoration: none;
  border-radius: 5px;
  padding: 16px 45px;
  display: inline-block;
  transition: all .20s ease;

  &:hover {
    filter: hue-rotate(-389deg);
  }
}

.product-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.side-by-side {
  .blocks {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 40% 60%;

    .block {
      background-image: url(../assets/bokeh-blue.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      padding: 50px;

      .section-title {
        margin-bottom: 24px;
      }

      .block-description {
        text-align: left;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        line-height: 23px;
        margin-bottom: 45px;

        span {
          display: block;
        }
      }

      .cta {
        margin-bottom: 40px;
      }

      .block-image-link {
        display: block;
        width: 50%;
        margin: 0 auto;

        .block-image {
          width: 100%;
        }
      }
    }
  }
}


</style>

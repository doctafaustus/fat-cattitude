<template>
  <section>
    <div class="main">

      <!-- Featured -->
      <div class="row featured">
        <div class="bg-layer"></div>
        <h1 class="section-title light"><span>Show off your </span><span>Fat Cattitude</span></h1>
        <div class="product-list wrapper">
          <ProductCard v-for="shirt in products.filter(product => product.category === 'featuredShirts')" :key="shirt.id" :product="shirt"></ProductCard>
        </div>
      </div>

      <!-- Stickers -->
      <div class="row sticker">
        <div class="product-list wrapper">
          <div class="title-card">
            <h1 class="section-title">Don't be a Sticky Vicky</h1>
            <div class="subtitle"><span>And get yourself </span><span>a sticker!</span></div>
          </div>
          <ProductCard v-for="sticker in products.filter(product => product.category === 'sticker')" :key="sticker.id" :product="sticker"></ProductCard>
        </div>
      </div>

      <!-- Side By Side -->
      <div class="row side-by-side">
        <div class="blocks wrapper">

          <div class="block mug">
            <h1 class="section-title light">NEW: Fat Cat Mug</h1>
            <div class="block-description">
              <span>Sometimes there's a place in our heart for something and we don't even know it.</span>
              <span>We've got that something for you.</span>
              <span>Introducing Burger Bun.</span>
            </div>
            <a class="cta" href="#">Gimme this!</a>
            <ProductCard v-for="item in products.filter(product => product.id === 177031652)" :key="item.id" :product="item"></ProductCard>
          </div>

          <div class="block hat">
            <div class="hat-container">
              <h1 class="section-title light">Mad Hatter</h1>
              <div class="block-description">
                <span>Fat Cattitude Baseball Cap</span>
              </div>
              <router-link :to="{ name: 'Product', params: { id: 177829076 }}" class="cta">Get it now!</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- More shirts -->
      <div class="row more-shirts">
        <h1 class="section-title light">Once a Fat Cat, Always a Fat Cat</h1>
        <div class="product-list wrapper">
          <ProductCard v-for="shirt in products.filter(product => product.category === 'shirts')" :key="shirt.id" :product="shirt"></ProductCard>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import ProductCard from '@/components/ProductCard';
import products from '@/model/products.js';

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  data () {
    return {
      products
    }
  }
}
</script>


<style scoped lang="scss">
.row {
  padding: 60px 40px;
  background-position: center center;
  background-repeat: repeat;
  background-size: contain;

  &.featured {
    background: linear-gradient(to bottom, #5433FF, #20BDFF, #f9faff);
    position: relative;

      h1,
      .product-list {
        position: relative;
        z-index: 2;
      }

    .bg-layer {
      content: '';
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      background-image: url(../assets/cat-bg.jpg);
      opacity: .38;
      mix-blend-mode: overlay;
    }
  }

  &.sticker {
    padding: 30px 40px 60px 40px;

    .product-list {
      grid-template-columns: 1fr 1fr 1fr 1fr;

      .product-card {
        align-self: center;
      }
    }
  }

  &.side-by-side {
    padding-top: 0;
  }

  &.more-shirts {
    background: linear-gradient(to bottom, #9733EE, #fedad7);

    .product-list {
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 5em;

      .product-card {
        grid-column: span 2;

        &:nth-last-child(2):nth-child(3n + 1) {
          grid-column: 2 / span 2;
        }
      }
    }
  }
}

.subtitle {
  color: #76768d;
  font-size: 28px;;
  line-height: 34px;

  span {
    display: block;
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

      &.hat {
        background-image: url(https://res.cloudinary.com/dormh2fvt/image/upload/v1590455665/Fat%20Cattitude/Hat-Logo2_mockup_Front_Womens-Lifestyle_White_1.jpg);
        position: relative;

        .hat-container {
          position: absolute;
          bottom: 50px;;
          left: 0;
          right: 0;

          span {
            text-align: center;
          }
        }
      }

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

@media (max-width: 1024px) {
  .side-by-side .blocks .block.hat {
    background-position: center center;
  }
}

@media (max-width: 834px) {
  .row {
    padding: 20px;
  }

  .subtitle {
    font-size: 20px;
    line-height: 24px;

    span {
      display: inline;
    }
  }

  .row.featured {
    h1 {
      font-size: 26px;
      line-height: 30px;
      margin-bottom: 20px;

      span {
        display: block;
      }
    }

    .product-list {
      grid-template-columns: 1fr;
      justify-items: center;

      .product-card {
        width: 80%;
      }
    }
  }

  .row.sticker {
    padding: 20px 40px 30px 40px;

    h1 {
      font-size: 24px;
      line-height: 26px;
      margin-bottom: 10px;
      letter-spacing: .2px;
    }

    .subtitle {
      margin-bottom: 30px;
    }

    .product-list {
      grid-template-columns: 1fr;
      justify-items: center;
      grid-gap: 0;

      .product-card {
        width: 60%;

        &:nth-child(3) {
          margin: 10px 0;
        }
      }
    }
  }

  .row.side-by-side {
    .blocks {
      grid-template-columns: 1fr;

      .block {
        padding: 40px 20px;

        .section-title {
          font-size: 24px;
        }

        .block-description {
          font-size: 16px;
          margin-bottom: 30px;
          text-align: center;

          span {
            display: inline;
          }
        }

        .cta {
          margin-bottom: 30px;
        }

        &.hat {
          background-size: cover;
          background-position-y: 0;
          height: 325px;

          .hat-container {
            bottom: 0;

            .section-title {
              margin-bottom: 0;
            }

            .block-description {
              margin-bottom: 14px;
            }

            .cta {
              margin-bottom: 20px;
            }
          }
        }
      }
    }
  }

  .row.more-shirts {
    display: none !important;
  }
}
</style>

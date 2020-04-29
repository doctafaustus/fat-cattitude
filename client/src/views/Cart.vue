<template>
  <section class="cart">
    <a class="back-top-shopping" @click="$router.go(-1)">
      <Icon name="backArrowLeft"/>
      <span>Back to Shopping</span>
    </a>
    <div class="cart-main">
      <div class="cart-products">
        <h1 class="cart-title">Your Stuff ({{cart.length}})</h1>
        <div class="cart-empty" v-show="!cart.length">There are no products in your cart.</div>

        <ul class="cart-list">

          <li class="cart-product" v-for="(product, index) in cart" :key="`size-${index}`">

            <router-link class="cart-product-image-link-col" :to="{ name: 'Product', params: { id: product.productID } }">
              <img class="cart-product-image" :src="product.image">
            </router-link>
            
            <div class="cart-product-details-col">
              <router-link :to="{ name: 'Product', params: { id: product.productID } }" class="cart-product-link">
                <div class="cart-product-title">{{ product.title }}</div>
              </router-link>
              <div class="cart-product-size">
                <label>Size:</label>
                <span class="cart-product-size-val">{{ product.size }}</span>
              </div>
              <div class="cart-product-price">{{ product.price }}</div>
            </div>

            <div class="cart-product-delete-col">
              <div class="cart-product-delete-close" @click="remove(product.variantID)">
                <Icon name="close"/>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="cart-summary">
        <div class="cart-os">
          <div class="cart-os-title">Order Summary</div>
          <div class="cart-os-details">
            <div class="cart-os-details-row">
              <div class="cart-os-subtotal-label">Subtotal</div>
              <div class="cart-os-subtotal-value">{{ total }}</div>
            </div>
            <div class="cart-os-details-row">
              <div class="cart-os-subtotal-label">Shipping</div>
              <div class="cart-os-subtotal-value">TBD</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Checkout></Checkout>
  </section>
</template>


<script>
import EventBus from '@/EventBus';
import utils from '@/mixins/utils';
import Icon from '@/components/Icons';
import Checkout from '@/components/Checkout';
import products from '@/model/products.js';


export default {
  name: 'Cart',
  components: {
    Icon,
    Checkout
  },
  mixins: [utils],
  data () {
    return {
      cart: [],
      total: 0
    }
  },
  methods: {
    getCart() {
      this.cart = utils.getCartArray();
      console.log(this.cart);

      const totalAsNumber = this.cart.reduce((accum, item) => {
        return accum + utils.dollarToFloat(item.price);
      }, 0);
      this.total = utils.floatToDollar(totalAsNumber);
    },
    remove(variantID) {
      EventBus.$emit('cart-remove', variantID);
      this.getCart();
    }
  },
  mounted() {
    this.getCart();
  }
}
</script>

<style scoped lang="scss">

  .cart {
    padding: 80px;
    position: relative;
  }

  .back-top-shopping {
    position: absolute;
    top: 20px;
    font-size: 14px;
    margin-bottom: 15px;
    display: block;
    text-align: left;
    color: #000;
    cursor: pointer;

    .icon {
      width: 12px;
      fill: #000;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      top: -2px;
      transition: all .25s ease;
    }

    &:hover {
      .icon {
        transform: translateX(-8px);

      }
    }
  }

  .cart-title {
    margin-bottom: 40px;
  }

  .cart-main {
    margin: 0 auto;

    .cart-products,
    .cart-summary {
      margin: 0 auto;
      width: 500px;
    }

    .cart-products {
      .cart-empty {
        text-align: left;
        margin-top: 30px;
      }

      .cart-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: left;
        font-size: 14px;

        .cart-product {
          display: flex;
          align-items: center;
          background-color: #fff;
          border-radius: 6px;
          margin-bottom: 20px;
          display: grid;
          grid-template-columns: 120px auto 40px;

          .cart-product-image-link-col {
            .cart-product-image {
              background: #f3f3f3;
              width: 100%;
            }

            &:hover + .cart-product-details-col .cart-product-link {
              text-decoration: underline;
            }
          }

          .cart-product-details-col {
            padding: 0 20px;

            .cart-product-link {
              color: #4c4c4b;
              text-decoration: none;
              display: inline-block;

              &:hover {
                text-decoration: underline;
              }

              .cart-product-title {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 20px;
              }
            }

            .cart-product-size,
            .cart-product-price {
              font-size: 14px;
              color: #808284;
              margin-bottom: 10px;
            }
          }

          .cart-product-delete-col {
            height: 100%;
            background-color: #efefef;
            display: flex;
            justify-content: center;
            align-items: center;

            .cart-product-delete-close .icon {
              height: 20px;
              width: 20px;
              cursor: pointer;
              transition: all .25s ease;

              &:hover {
                transform: scale(1.5);
              }
            }
          }
        }
      }
    }

    .cart-summary {
      margin-bottom: 40px;

      .cart-os-title,
      .cart-os-details {
        padding: 20px;
      }

      .cart-os {
        background-color: #efefef;

        .cart-os-title {
          font-size: 26px;
          font-family: 'Work Sans', sans-serif;
          font-weight: bold;
        }

        .cart-os-title {
          border-bottom: solid 1px #fff;
        }

        .cart-os-details {
          .cart-os-details-row {
            display: flex;
            justify-content: space-between;
            
            &:not(:last-child) {
              margin-bottom: 20px;
            }

            .cart-os-subtotal-value {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
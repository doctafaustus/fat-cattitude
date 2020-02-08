<template>
  <section>
    <section class="cart">
      <h1 class="cart-title">Your Items ({{cart.length}})</h1>
      <div class="cart-main">

        <div class="cart-left">
          <a class="back-top-shopping" @click="$router.go(-1)">
            <Icon name="backArrowLeft"/>
            <span>Back to Shopping</span>
          </a>

          <div class="cart-empty" v-show="!cart.length">There are no products in your cart.</div>

          <ul class="cart-list">

            <li class="cart-product" v-for="(product, index) in cart" :key="`size-${index}`">

              <router-link class="cart-product-image-link-col" :to="{ name: 'Product', params: { id: product.productID } }">
                <img class="cart-product-image" :src="product.image">
              </router-link>
              
              <div class="cart-product-details-col">
                <router-link :to="{ name: 'Product', params: { id: product.productID } }" class="cart-product-link">
                  <div class="cart-prdouct-title">{{ product.title }}</div>
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
        <div class="cart-right">
          <div class="cart-os">
            <div class="cart-os-title">Order Summary</div>
            <div class="cart-os-details">
              <div class="cart-os-subtotal-label">Subtotal</div>
              <div class="cart-os-subtotal-value">{{ total }}</div>
            </div>
          </div>
          <div class="cart-payment-plan" v-show="cart.length">or 4 interest-free payments of x by afterpay</div>
          <a class="checkout-btn" href="#">Continue To Checkout</a>
        </div>


      </div>
    </section>
  </section>
</template>


<script>
import EventBus from '@/EventBus';
import utils from '@/mixins/utils';
import Icon from '@/components/Icons';
import products from '@/model/products.js';


export default {
  name: 'Cart',
  components: {
    Icon
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
      console.log('cart mounted', this.cart);
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
  }

  .cart-title {
    margin-bottom: 40px;
  }

  .cart-main {
    display: flex;
    justify-content: space-between;
    width: 900px;
    margin: 0 auto;

    .cart-left {
      width: 500px;

      .back-top-shopping {
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
          margin-bottom: 40px;
          display: grid;
          grid-template-columns: 200px auto 40px;

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

              .cart-prdouct-title {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
              }
            }

            .cart-product-size,
            .cart-product-price {
              font-size: 18px;
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

    .cart-right {
      width: 250px;
      color: #808284;

      .cart-os-title,
      .cart-os-details,
      .cart-payment-plan {
        background-color: #f7f7f8;
        padding: 20px;
      }

      .cart-os {
        .cart-os-title {
          font-family: auto;
          letter-spacing: 1px;
          font-size: 16.5px;
        }

        .cart-os-title {
          border-bottom: solid 1px #e9e9ec;
        }

        .cart-os-details {
          display: flex;
          justify-content: space-between;
          font-size: 14px;

          .cart-os-subtotal-value {
            font-weight: bold;
          }
        }
      }

      .cart-payment-plan {
        margin-top: 20px;
        font-size: 14px;
        line-height: 20px;
      }

      .checkout-btn {
        margin-top: 20px;
        background-color: #4c4c4b;
        color: white;
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        padding: 12px 20px;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: .5px;
      }
    }
  }
</style>
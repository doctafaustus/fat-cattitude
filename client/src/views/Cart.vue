<template>
  <section>
    <section class="cart">
      <h1>Cart</h1>
      <div class="cart-main">

        <div class="cart-left">
          <a class="back-top-shopping" @click="$router.go(-1)">
            <Icon name="backArrowLeft"/>
            <span>Back to Shopping</span>
          </a>

          <div class="cart-empty" v-show="!cart.length">There are no products in your cart.</div>

          <ul class="cart-list">

            <li class="cart-product" v-for="(product, index) in cart" :key="`size-${index}`">
              <router-link class="cart-product-image-link" :to="{ name: 'Item', params: { id: product.productID } }">
                <img class="cart-product-image" :src="product.image">
              </router-link>
              
              <div class="cart-product-details">
                <div class="cart-product-details-left">
                  <router-link :to="{ name: 'Item', params: { id: product.id } }" class="cart-product-link">
                    <div class="cart-prdouct-title">{{ product.title }}</div>
                  </router-link>
                  <div class="cart-product-size">
                    <label>Size:</label>
                    <span class="cart-product-size-val">{{ product.size }}</span>
                  </div>
                </div>

                <div class="cart-product-details-right">
                  <div class="cart-product-delete">
                    <div class="cart-product-delete-close" @click="remove(index)">
                      <Icon name="close"/>
                    </div>
                  </div>
                  <div class="cart-product-price">{{ product.price }}</div>
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
    remove(id) {
      console.log('remove', id);
    }
  },
  mounted() {
    this.cart = (utils.getCookie('cart') && JSON.parse(utils.getCookie('cart'))) || [];
    console.log('cart mounted', this.cart);
  }
}
</script>

<style scoped lang="scss">
  .cart-main {
    display: flex;
    justify-content: space-between;
    width: 900px;
    margin: 0 auto;

    .cart-left {
      width: 465px;

      .back-top-shopping {
        font-size: 12px;
        margin-bottom: 15px;
        display: block;
        text-align: left;
        color: #808284;
        cursor: pointer;
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
          border-top: solid 1px #f3f3f3;
          padding: 15px 0;

          .cart-product-image {
            width: 150px;
            background: #f3f3f3;
            margin-right: 15px;
          }

          .cart-product-image-link:hover+.cart-product-details {
            .cart-product-details-left {
              .cart-product-link {
                text-decoration: underline;
              }
            }
          }

          .cart-product-details {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .cart-product-details-left {
              width: 250px;

              .cart-product-link {
                color: #4c4c4b;
                text-decoration: none;

                &:hover {
                  text-decoration: underline;
                }
              }

              .cart-product-size,
              .cart-product-qty {
                color: #808284;
              }
            }

            .cart-product-details-right {
              .cart-product-delete {
                text-align: right;
                margin-bottom: 19px;

                .cart-product-delete-x {
                  cursor: pointer;
                }
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
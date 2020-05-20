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

        <ul class="order-list">

          <li class="order-product" v-for="(product, index) in cart.slice().reverse()" :key="`size-${index}`">

            <router-link class="order-product-image-link-col" :to="{ name: 'Product', params: { id: product.productID }, query: { color: product.query.color, size: product.query.size }}">
              <img class="order-product-image" :src="product.image">
            </router-link>
            
            <div class="order-product-details-col">
              <router-link :to="{ name: 'Product', params: { id: product.productID }, query: { color: product.query.color, size: product.query.size }}" class="order-product-link">
                <div class="order-product-title">{{ product.title }}</div>
              </router-link>
              <div class="order-product-detail">
                <label>Size:</label>
                <span class="order-product-detail-val">{{ product.size }}</span>
              </div>
              <div class="order-product-detail">
                <label>Color:</label>
                <span class="order-product-detail-val">{{ product.color }}</span>
              </div>
              <div class="order-product-price">${{ product.price }}</div>
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
        <div :class="{ 'total-shown': total !== 0, 'processing': processing, 'cart-os': true }">
          <div class="cart-os-title">Order Summary</div>
          <div class="nyan-loading"></div>
          <div class="cart-os-details fade-slide">
            <div class="cart-os-details-row">
              <div class="cart-os-subtotal-label">Subtotal</div>
              <div class="cart-os-subtotal-value">{{ subtotal | toCurrency }}</div>
            </div>
            <div class="cart-os-details-row">
              <div class="cart-os-subtotal-label">Shipping</div>
              <div class="cart-os-subtotal-value">{{ shipping | toCurrency}}</div>
            </div>
            <div class="cart-os-details-row">
              <div class="cart-os-subtotal-label">Tax</div>
              <div class="cart-os-subtotal-value">{{ tax | toCurrency }}</div>
            </div>
            <div class="cart-os-details-row total">
              <div class="cart-os-subtotal-label">Total</div>
              <div class="cart-os-subtotal-value">{{ total | toCurrency }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Checkout v-show="cart.length"></Checkout>
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
      subtotal: 0,
      shipping: 'TBD',
      tax: 'TBD',
      total: 0,
      processing: false
    }
  },
  methods: {
    getCart() {
      this.cart = utils.getCartArray();
      console.log(this.cart);
      this.subtotal = this.cart.reduce((accum, item) => {
        return accum + item.price;
      }, 0);
    },
    remove(variantID) {
      EventBus.$emit('cart-remove', variantID);
      this.getCart();
    },
    setProcessingState({ isProcessing }) {
      this.processing = isProcessing;
    },
    estimateOrder(orderEstimate) {
      this.shipping = orderEstimate.shipping;
      this.tax =  orderEstimate.tax;
      this.total = this.subtotal + this.shipping + this.tax;
    }
  },
  mounted() {
    this.getCart();

    EventBus.$on('processing', this.setProcessingState);
    EventBus.$on('order-estimate', this.estimateOrder);
  },
  beforeDestroy() {
    EventBus.$off('processing', this.setProcessingState);
    EventBus.$off('order-estimate', this.estimateOrder);
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
      margin: 30px 0;
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

  .cart-summary {
    margin-bottom: 20px;

    .cart-os-title,
    .cart-os-details {
      padding: 20px;
    }

    .cart-os {
      background-color: #efefef;
      overflow: hidden;

      &.total-shown {
        .cart-os-details .cart-os-details-row {
          &:nth-last-child(2) {
            margin-bottom: 20px;
          }
          
          &.total {
            display: flex;
          }
        }

        .nyan-loading {
          height: 164px;
        }
      }

      &.processing {
        .nyan-loading {
          display: block;
        }

        .cart-os-details {
          display: none;
        }
      }

      .cart-os-title {
        font-size: 26px;
        font-family: 'Work Sans', sans-serif;
        font-weight: bold;
        border-bottom: solid 1px #fff;
      }

      .nyan-loading {
        display: none;
        background-image: url(../assets/nyan-loading.gif);
        background-position: center center;
        background-size: 37%;
        height: 128px;
        opacity: .52;
        position: relative;
        filter: hue-rotate(60deg);

        &::after {
          content: 'Loading...';
          display: block;
          background-color: #104474;
          position: absolute;
          width: 100%;
          color: white;
          box-sizing: border-box;
          padding: 12px;
          letter-spacing: .8px;
        }
      }

      .cart-os-details {
      overflow: hidden;

        .cart-os-details-row {
          display: flex;
          justify-content: space-between;
          
          &:not(:last-child) {
            margin-bottom: 20px;
          }

          &:nth-last-child(2) {
            margin-bottom: 0;
          }

          &.total {
            display: none;
            font-weight: bold;
            margin-bottom: 0px;
          }

          .cart-os-subtotal-value {
            font-weight: bold;
          }
        }
      }
    }
  }
}

@keyframes fade-slide {        
  from {
    opacity: 0;
    bottom: -500px;
  }
  to {
    opacity: 1 !important;
    bottom: 0;
  }      
}

.fade-slide {
  position: relative;
  animation: fade-slide .5s ease;
}


@media (max-width: 767px) {
  .cart {
    padding: 60px 20px 40px 20px;

    .cart-title {
      font-size: 36px;
      line-height: 40px;
      margin-bottom: 20px;
    }

    .cart-main {
      .cart-products,
      .cart-summary {
        width: 100%;
      }
    }
  }

  .order-list .order-product {
    grid-template-columns: 80px auto 30px;
    margin-bottom: 10px;

    .order-product-details-col {
      padding: 10px 16px;
    }
  }

}
</style>
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
                PRODUCT ID {{ product.productID }}
                <img class="cart-product-image" :src="getImage(product.productID)">
              </router-link>
              
              <!-- <div class="cart-product-details">
                <div class="cart-product-details-left">
                  <router-link class="cart-product-link">
                    <div class="cart-prdouct-title">{{ item.cat.title }}</div>
                  </router-link>
                  <div class="cart-product-size">
                    <label>Size:</label>
                    <span class="cart-product-size-val">{{ item.sizeSelected }}</span>
                  </div>
                </div>

                <div class="cart-product-details-right">
                  <div class="cart-product-delete">

                    <div class="cart-product-delete-close" v-on:click="remove(index)">
                      <Icon name="close"/>
                    </div>
                  </div>
                  <div class="cart-product-price">{{ floatToDollar(item.cat.price) }}</div>
                </div> -->
              <!-- </div> -->
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
    getImage(productID) {
      return products.find(product => product.id === productID).image;
    }
  },
  mounted() {
    this.cart = (utils.getCookie('cart') && JSON.parse(utils.getCookie('cart'))) || [];
    console.log('cart mounted', this.cart);
  }
}
</script>
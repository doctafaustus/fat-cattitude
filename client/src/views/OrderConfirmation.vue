<template>
  <section class="order-confirmation wrapper">
    <div class="order-confirmation-inner">
      <div class="top-section">
        <img class="party-popper" src="../assets/party-popper.png">
        <h1>Your order is complete!</h1>
        <div v-show="recipient.email" class="email-message">A copy of your receipt has been to: <span class="email">{{ recipient.email }}</span></div>
        <div class="order-no">Order #: {{ orderID }}</div>
      </div>

      <div class="bottom-section">
        <h2>Delivery Details</h2>

        <div class="delivery-address-and-method">
          <div class="block address">
            <h3>Recipient</h3>
            <div class="data-item">{{ recipient.name }}</div>
            <div class="data-item">{{ recipient.address1 }}</div>
            <div v-show="recipient.address2" class="data-item">{{ recipient.address2 }}</div>
            <div class="data-item">{{ recipient.city }} {{ recipient.state_code }} {{ recipient.zip }}</div>
          </div>

          <div class="block method">
            <h3>Delivery Method</h3>
            <div class="data-item">{{ shippingMethod }} - {{ shippingServiceName }}</div>
          </div>
        </div>

        <div class="products-ordered">
          <h3>Your Items</h3>

          <ul class="order-list">
            <li class="order-product" v-for="(product, index) in orderProducts" :key="`size-${index}`">
              <router-link class="order-product-image-link-col" :to="{ name: 'Product', params: { id: product.productID }, query: { color: product.color, size: product.size }}">
                <img class="order-product-image" :src="product.image">
              </router-link>
              
              <div class="order-product-details-col">
                <router-link :to="{ name: 'Product', params: { id: product.productID }, query: { color: product.color, size: product.size }}" class="order-product-link">
                  <div class="order-product-title">{{ product.title }}</div>
                </router-link>

                <div class="order-product-detail">
                  <label>Color:</label>
                  <span class="order-product-detail-val">{{ product.color }}</span>
                </div>
                <div class="order-product-detail">
                  <label>Size:</label>
                  <span class="order-product-detail-val">{{ product.size }}</span>
                </div>
                <div class="order-product-price">${{ product.price }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import EventBus from '@/EventBus';
import products from '@/model/products.js';

export default {
  name: 'OrderConfirmation',
  data () {
    return {
      orderID: null,
      recipient: {},
      shippingMethod: null,
      shippingServiceName: null,
      orderProducts: []
    }
  },
  methods: {
    getOrder(id) {
      fetch(`http://localhost:8081/api/order-confirmation?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        this.recipient = data.recipient;
        this.shippingMethod = data.shipping.toLowerCase();
        this.shippingServiceName = data.shipping_service_name;

        this.getOrderProducts(data);
      });
    },
    getOrderProducts(data) {
      const orderProductIDs = data.items.map(item => {
        return {
          productID: +(item.name.match(/^\d+/) || [])[0],
          variantID: item.sync_variant_id
        };
      });

      this.orderProducts = orderProductIDs.map(item => {
        const product = products.find(product => product.id === item.productID);
        let productColorObj;
        let productSizeObj; 

        product.colors.forEach(color => {
          color.sizes.forEach(size => {
            if (size.variantID === item.variantID) {
              productColorObj = color; 
              productSizeObj = size;
            }
          });
        });
      
        return {
          productID: item.productID,
          variantID: item.variantID,
          price: product.price,
          title: product.title,
          color: productColorObj.colorName,
          image: productColorObj.colorImage,
          size: productSizeObj.size
        };
      });
    }
  },
  mounted() {
    this.orderID = this.$route.query.id;
    this.getOrder(this.orderID);

    EventBus.$emit('order-confirmation');
  }
}
</script>


<style scoped lang="scss">
.order-confirmation {
  padding: 80px;

  .order-confirmation-inner {
    background-color: #fff;
    padding: 40px;
    box-shadow: 0 5px 10px rgba(37,33,81,0.11);
  }

  .top-section {
    border-bottom: solid 1px #ececec;

    .party-popper {
      width: 100px;
    }

    h1 {
      font-size: 36px;
      margin: 20px 0;
    }

    .email-message {
      margin-bottom: 10px;

      .email {
        font-style: italic;
      }
    }

    .order-no {
      margin-bottom: 40px;
    }
  }

  .bottom-section {
    padding-top: 40px;
    text-align: left;

    h2 {
      margin-bottom: 40px;
      font-size: 28px;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }

    .delivery-address-and-method {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 40px;
    }

    .block {
      &.method {
        .data-item {
          text-transform: capitalize;
        }
      }

      .data-item {
        line-height: 20px;
      }
    }

    .order-list {
      .order-product {
        grid-template-columns: 120px auto;
      }
    }
  }
}
</style>

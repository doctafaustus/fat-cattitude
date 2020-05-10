<template>
  <section class="order-confirmation wrapper">

    <div v-if="isLoading" class="order-confirmation-loading">
      <img :src="setSpinnerSrc()" class="spinner">
    </div>

    <div v-else class="order-confirmation-inner">

      <div v-if="error" class="top-section error">
        <img class="status-image" src="../assets/warning.png">
        <h1>Order Not Found</h1>
        <div class="status">Order may have been fulfilled or the number is incorrect</div>
      </div>

      <div v-else-if="creditCard.last4" class="top-section">
        <img class="status-image" src="../assets/party-popper.png">
        <h1>Your order is complete!</h1>
        <div class="email-message">A copy of your receipt has been to: <span class="email">{{ recipient.email }}</span></div>
        <div class="order-no">Order #: {{ orderID }}</div>
      </div>

      <div v-else class="top-section">
        <img class="status-image" src="../assets/green-checkmark.png">
        <h1>Order Status</h1>
        <div class="email-and-order-no">
          Order #: {{ orderID }}
          | Email: <span class="email">{{ recipient.email }}</span>
        </div>
        <div class="status">Order Status: <span class="status-value">{{ status }}</span></div>
          <ul class="shipments">
            <li v-for="(shipment, index) in shipments" :key="index" class="shipment">
              <div class="shipment-item">{{ shipment.carrier }} - {{ shipment.service }}</div>
              <div class="shipment-item">Tracking #: {{ shipment.tracking_number }}</div>
            </li>
          </ul>
      </div>

      <div v-if="!error" class="bottom-section">
        <h2>Delivery Details</h2>

        <div class="delivery-address-and-method">
          <div class="block address">
            <h3>Recipient</h3>
            <div class="data-item">{{ recipient.name }}</div>
            <div class="data-item">{{ recipient.address1 }}</div>
            <div v-show="recipient.address2" class="data-item">{{ recipient.address2 }}</div>
            <div class="data-item">{{ recipient.city }}, {{ recipient.state_code }} {{ recipient.zip }}</div>
          </div>

          <div class="block method">
            <h3>Delivery Method</h3>
            <div class="data-item">{{ shippingMethod }} - {{ shippingServiceName }}</div>
          </div>
        </div>

        <div class="products-ordered-and-os">
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

          <div class="os">
            <h3>Order Summary</h3>
            <ul class="os-items">
              <li class="os-item">
                <div class="os-label">Subtotal</div>
                <div class="os-value">${{ costs.subtotal }}</div>
              </li>
              <li class="os-item">
                <div class="os-label">Shipping</div>
                <div class="os-value">${{ costs.shipping }}</div>
              </li>
              <li class="os-item">
                <div class="os-label">Tax</div>
                <div class="os-value">${{ costs.tax }}</div>
              </li>
              <li class="os-item total">
                <div class="os-label">Total</div>
                <div class="os-value">${{ costs.total }}</div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Show only if using charge parameter -->
        <div v-show="creditCard.last4" class="credit-card-and-billing-address">
          <div class="credit-card block">
            <h3>Payment Information</h3>
            <ul class="credit-card">
              <li class="cc-item">Card Number: {{ creditCard.last4.padStart(16,'*') }}</li>
              <li class="cc-item">Expiry Date: {{ String(creditCard.exp_month).padStart(2, '0') }} / {{ creditCard.exp_year }}</li>
              <li class="cc-item">Amount: ${{ creditCard.total }}</li>
            </ul>
          </div>

          <div class="billing-address block">
            <div class="block address">
              <h3>Billing Address</h3>
              <div class="data-item">{{ billingInfo.name }}</div>
              <div class="data-item">{{ billingInfo.address1 }}</div>
              <div v-show="billingInfo.address2" class="data-item">{{ billingInfo.address2 }}</div>
              <div class="data-item">{{ billingInfo.city }}, {{ billingInfo.state }} {{ billingInfo.zip }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import EventBus from '@/EventBus';
import utils from '@/mixins/utils';
import products from '@/model/products.js';

export default {
  name: 'OrderConfirmation',
  mixins: [utils],
  data () {
    return {
      isLoading: true,
      error: false,
      orderID: null,
      chargeID: null,
      recipient: {},
      shippingMethod: null,
      shippingServiceName: null,
      orderProducts: [],
      costs: {},
      creditCard: {
        last4: '', // Using empty strings to prevent padStart error on load
        exp_month: '',
        exp_year: '',
        total: 0
      },
      billingInfo: {},
      status: null,
      shipments: []
    }
  },
  methods: {
    getOrder({ orderID, chargeID }) {
      fetch(`http://localhost:8081/api/order-confirmation?orderID=${orderID}&chargeID=${chargeID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        const { order, charge } = data;

        if (!order) {
          this.isLoading = false;
          this.error = true;
          return;
        }

        this.recipient = order.recipient;
        this.shippingMethod = order.shipping.toLowerCase();
        this.shippingServiceName = order.shipping_service_name;
        this.status = order.status;
        this.shipments = order.shipments;
        this.costs = {
          subtotal: order.retail_costs.subtotal,
          shipping: order.costs.shipping,
          tax: order.costs.tax,
          total: order.retail_costs.total
        };

        this.shipments = [
          {
            carrier: 'USPS',
            service: 'Flat Rate',
            tracking_number: 232432432423
          }
        ]


        this.getOrderProducts(order);

        // If there's no charge from checking order status
        if (!charge) {
          this.isLoading = false;
          return;
        } 
        this.creditCard = {
          last4: charge.source.last4,
          exp_month: charge.source.exp_month,
          exp_year: charge.source.exp_year,
          total: charge.metadata.total
        };

        this.billingInfo = {
          name: charge.metadata.name,
          address1: charge.metadata.address1,
          address2: charge.metadata.address2,
          city: charge.metadata.city,
          state: charge.metadata.state,
          zip: charge.metadata.zip,
        };

        this.isLoading = false;
      });
    },
    getOrderProducts(order) {
      const orderProductIDs = order.items.map(item => {
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
    },
    setSpinnerSrc() {
      return utils.getLoadingSpinner();
    }
  },
  mounted() {
    this.orderID = this.$route.query.orderID;
    this.chargeID = this.$route.query.chargeID;

    this.getOrder({ orderID: this.orderID, chargeID: this.chargeID });
    EventBus.$emit('order-confirmation');
  }
}
</script>


<style scoped lang="scss">
.order-confirmation {
  padding: 80px;

  .order-confirmation-inner,
  .order-confirmation-loading {
    background-color: #fff;
    padding: 40px;
    box-shadow: 0 5px 10px rgba(37,33,81,0.11);
  }

  .order-confirmation-loading {
    min-height: calc(100vh - 250px);

    .spinner {
      margin-top: 60px;
      width: 150px;
    }
  }

  .order-confirmation-inner {
    animation: fadein 2s;
  }

  .top-section {
    border-bottom: solid 1px #ececec;
    padding-bottom: 40px;

    &.error {
      padding-bottom: 0;
      border-bottom: none;
    }

    .status-image {
      width: 100px;
    }

    h1 {
      font-size: 36px;
      margin: 20px 0;
    }

    .email-message,
    .email-and-order-no {
      margin-bottom: 10px;

      .email {
        font-style: italic;
      }
    }

    .status {
      .status-value {
        font-weight: bold;
        text-transform: capitalize;
      }
    }

    .shipments {
      .shipment {
        margin-bottom: 20px;

        &:first-child {
          margin-top: 40px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        .shipment-item {
          line-height: 20px;
        }
      }
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

    .delivery-address-and-method,
    .products-ordered-and-os,
    .credit-card-and-billing-address {
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

    .os {
      .os-items {
        .os-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 8px;

          &.total {
            font-weight: bold;
          }

          .os-value {
            width: 100px;
            text-align: right;
          }
        }
      }
    }

    .credit-card {
      .cc-item {
        margin-bottom: 8px;;
      }
    }
  }
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

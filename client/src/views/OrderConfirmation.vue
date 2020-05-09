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
        <h3>Delivery Details</h3>

        <div class="delivery-address-and-method">
          <div class="block">
            <h4>Recipient</h4>
            <div class="data-item">{{ recipient.name }}</div>
            <div class="data-item">{{ recipient.address1 }}</div>
            <div v-show="recipient.address2" class="data-item">{{ recipient.address2 }}</div>
            <div class="data-item">{{ recipient.city }} {{ recipient.state_code }} {{ recipient.zip }}</div>
          </div>

          <div class="block">
            <h4>Delivery Method</h4>
            <div class="data-item">{{ shippingMethod }} - {{ shippingServiceName }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import EventBus from '@/EventBus';

export default {
  name: 'OrderConfirmation',
  data () {
    return {
      orderID: null,
      recipient: {},
      shippingMethod: null,
      shippingServiceName: null
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
      width: 125px;
    }

    h1 {
      font-size: 34px;
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
}
</style>

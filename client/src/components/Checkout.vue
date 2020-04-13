<template>
  <section class="checkout">
    <form class="checkout-form">
      <div class="segment contact-information">

        <!-- Contact Information -->
        <h3 class="segment-title">Contact Information</h3>
        <div class="input-wrapper">
          <label>Email</label>
          <input v-model="fields.email" id="email" type="text" placeholder="Email">
        </div>
      </div>

      <!-- Shipping Address -->
      <div class="segment shipping-address">
        <h3 class="segment-title">Shipping Address</h3>
        <div class="input-group input-group-col-2">
          <div class="input-wrapper">
            <label>First Name</label>
            <input v-model="fields.firstNameShipping" id="first-name-shipping" type="text" placeholder="First Name">
          </div>
          <div class="input-wrapper">
            <label>Last Name</label>
            <input v-model="fields.lastNameShipping" id="last-name-shipping" type="text" placeholder="Last Name">
          </div>
        </div>
        <div class="input-wrapper">
          <label>Address</label>
          <input v-model="fields.addressShipping" id="address-shipping" type="text" placeholder="Address">
        </div>
        <div class="input-wrapper">
          <label>Address 2 (optional)</label>
          <input v-model="fields.address2Shipping" id="address2-shipping" type="text" placeholder="Address 2 (optional)">
        </div>
        <div class="input-wrapper">
          <label>City</label>
          <input v-model="fields.cityShipping" id="city-shipping" type="text" placeholder="City">
        </div>
        <div class="input-group input-group-col-2">
          <div class="input-wrapper dropdown">
            <label>State</label>
            <select v-model="fields.stateShipping" id="state-shipping">
              <option disabled selected>State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div class="input-wrapper">
            <label>ZIP code</label>
            <input v-model="fields.zipShipping" id="zip-shipping" type="text" placeholder="ZIP code">
          </div>
        </div>
      </div>

      <!-- Payment Information -->
      <div class="segment payment-information">
        <h3 class="segment-title">Payment Information</h3>
        <div class="input-wrapper">
          <label>Credit Card Number</label>
          <input id="ccn" type="text" placeholder="Credit Card Number">
        </div>

        <div class="input-group input-group-col-2">
          <div class="input-wrapper dropdown">
            <label>Expiration Year</label>
            <select id="cc-exp">
              <option disabled selected>Expiration Year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>

          <div class="input-wrapper dropdown">
            <label>CVC</label>
            <input id="cvc" type="text" placeholder="CVC">
          </div>
        </div>

        <!-- Same Address Toggle -->
        <div class="same-shipping-billing">
          <label class="same-shipping-billing-label" for="same-address">
            <input v-model="sameAddress" type="checkbox" id="same-address" checked>
            <div class="checkbox-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-404 579.5 32 32">
                <path d="M-394.3 606.8l-8.7-8.7 1.3-1.3 7.4 7.5 20-20 1.3 1.2z"></path>
              </svg>
            </div>
            <span>Same billing &amp; shipping info</span>
          </label>
        </div>
      </div>

      <!-- Billing Address -->
      <div v-show="!sameAddress" class="segment billing-address">
        <h3 class="segment-title">Billing Address</h3>

        <div class="input-group input-group-col-2">
          <div class="input-wrapper">
            <label>First Name</label>
            <input id="first-name-billing" type="text" placeholder="First Name">
          </div>
          <div class="input-wrapper">
            <label>Last Name</label>
            <input id="last-name-billing" type="text" placeholder="Last Name">
          </div>
        </div>

        <div class="input-wrapper">
          <label>Address</label>
          <input id="address-billing" type="text" placeholder="Address">
        </div>
        <div class="input-wrapper">
          <label>Address 2 (optional)</label>
          <input id="address2-billing" type="text" placeholder="Address 2 (optional)">
        </div>
        <div class="input-wrapper">
          <label>City</label>
          <input id="city-billing" type="text" placeholder="City">
        </div>

        <div class="input-group input-group-col-2">
          <div class="input-wrapper dropdown">
            <label>State</label>
            <select id="state-billing">
              <option disabled selected>State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>

          <div class="input-wrapper">
            <label>ZIP code</label>
            <input id="zip-billing" type="text" placeholder="ZIP code">
          </div>
        </div>
      </div>

      <!-- Place Order -->
      <div class="segment place-order">
        <a @click.prevent="placeOrder" class="cta">Place Order</a>
      </div>
    </form>
  </section>
</template>

<script>
import utils from '@/mixins/utils';

export default {
  name: 'Checkout',
  mixins: [utils],
  data () {
    return {
      sameAddress: true,
      fields: {
        email: null,
        firstNameShipping: null,
        lastNameShipping: null,
        addressShipping: null,
        address2Shipping: null,
        cityShipping: null,
        stateShipping: null,
        zipShipping: null
      },
      card: {
        number: '4242424242424242',
        expMonth: '01',
        expYear: '22',
        cvc: '123'
      },
      cardCheckSending: false
    }
  },
  methods: {
    initInputClasses() {
      const inputs = document.querySelectorAll('.checkout-form input[type="text"], select');
      inputs.forEach(input => {
        input.addEventListener('focus', e => toggleActiveClass(e, 'add'));
        input.addEventListener('blur', e => {
          if (!e.target.value) toggleActiveClass(e, 'remove');
        });
      });

      function toggleActiveClass(e, method) {
        e.target.closest('.input-wrapper').classList[method]('active');
      }
    },
    placeOrder() {
      return this.createToken();

      fetch('http://localhost:8081/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.email,
          firstNameShipping: this.fields.firstNameShipping,
          lastNameShipping: this.fields.lastNameShipping,
          addressShipping: this.fields.addressShipping,
          address2Shipping: this.fields.address2Shipping,
          cityShipping: this.fields.cityShipping,
          stateShipping: this.fields.stateShipping,
          zipShipping: this.fields.zipShipping
        })
      })
      .then(response => response.text())
      .then(html => console.log(html));
    },
    initStripe() {
      utils.loadScript('https://js.stripe.com/v2/', this.createToken);
    },
    async createToken() {
      this.cardCheckSending = true;
      const stripePublishableKey = 'pk_test_OKClfKEUHvsE9Bpb9hoptSGV';
      Stripe.setPublishableKey(stripePublishableKey);
      Stripe.createToken(this.card, this.stripeResponseHandler);

    },
    stripeResponseHandler(status, res) {
      this.cardCheckSending = false;

      if (res.error) {
        //this.cardCheckErrorMessage = res.error.message;
        //this.cardCheckError = true;
        console.log('ERROR', res);
      } else {
        console.log('Submitting...');
        const tokenFromStripe = res.id;
        const request = {
          tokenFromStripe,
          description: 'Test description',
          name: 'Connor Leech',
          email: 'connor@employbl.com',
          address: {
            street: '123 Something Lane',
            city: 'San Francisco',
            state: 'CA',
            zip: '94607'
          },
          card: this.card,
        };

        fetch('http://localhost:8081/api/place-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request)
        })
        .then(response => response.text())
        .then(html => console.log('HERE YO GO', html));
      }
    }
  },
  mounted() {
    this.initInputClasses();
    if (!window.Stripe) this.initStripe(); 
  }
}
</script>


<style scoped lang="scss">
.checkout {
  margin: 0 auto;
  max-width: 600px;
  text-align: left;

  .segment {
    &:not(:last-child) {
      margin-bottom: 40px;
    }

    .segment-title {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .input-group,
  .input-wrapper {
    border-radius: 8px;
    position: relative;

    &.active {
      border: solid 1px #16bfff;

      label {
        opacity: 1;
        transform: none;
      }

      input,
      select {
        padding: 24px 12px 5px 12px;
      }
    }

    &,
    label,
    input,
    select {
      transition: all 0.22s ease-out;
    }

    label {
      position: absolute;
      top: 0;
      left: 5px;
      margin: 6px 0 1px 6px;
      font-size: 12px;
      transform: translateY(3px);
      opacity: 0;
      color: #949494;
    }

    input,
    select {
      padding: 15px 12px;
      font-size: 16px;
      border: none;
      outline: none;
      width: 100%;
      border-radius: 8px;
    }

    select {
      padding-bottom: 14px;
    }
  }

  .input-group {
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr;
  }

  .input-wrapper {
    border: solid 1px #d5d5d5;
    height: 50px;
    margin-bottom: 10px;
  }

  .same-shipping-billing {
    margin-top: 20px;

    #same-address {
      display: none;
    }

    #same-address:checked + .checkbox-container {
      background-color: #4292e3;
      border: solid 1px transparent;
    }

    .checkbox-container {
      display: inline-block;
      margin-right: 4px;
      width: 20px;
      height: 20px;
      background-color: #fff;
      border: solid 1px #4292e3;
      border-radius: 3px;
      text-align: center;
    }

    svg {
      position: relative;
      top: 1px;
      width: 12px;
      fill: #fff;
      min-height: 15px;
    }
  }
}
</style>

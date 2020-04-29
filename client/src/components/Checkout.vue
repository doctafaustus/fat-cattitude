<template>
  <section class="checkout">
    <form class="checkout-form" action="/api/place-order" method="POST">
      <div class="segment contact-information">

        <!-- Contact Information -->
        <h3 class="segment-title">Contact Information</h3>
        <div class="field">
          <div class="input-wrapper">
            <label>Email</label>
            <input v-model="fields.email" id="email" type="text" placeholder="Email">
          </div>
          <span class="error"></span>
        </div>
      </div>

      <!-- Shipping Address -->
      <div class="segment shipping-address">
        <h3 class="segment-title">Shipping Address</h3>
        <div class="input-group input-group-col-2">
          <div class="field">
            <div class="input-wrapper">
              <label>First Name</label>
              <input v-model="fields.firstNameShipping" id="first-name-shipping" type="text" placeholder="First Name">
            </div>
            <span class="error"></span>
          </div>
          <div class="field">
            <div class="input-wrapper">
              <label>Last Name</label>
              <input v-model="fields.lastNameShipping" id="last-name-shipping" type="text" placeholder="Last Name">
            </div>
            <span class="error"></span>
          </div>
        </div>
        <div class="field">
          <div class="input-wrapper">
            <label>Address</label>
            <input v-model="fields.address1Shipping" id="address1-shipping" type="text" placeholder="Address">
          </div>
          <span class="error"></span>
        </div>
        <div class="field">
          <div class="input-wrapper">
            <label>Address 2 (optional)</label>
            <input v-model="fields.address2Shipping" id="address2-shipping" type="text" placeholder="Address 2 (optional)">
          </div>
          <span class="error"></span>
        </div>
        <div class="field">
          <div class="input-wrapper">
            <label>City</label>
            <input v-model="fields.cityShipping" id="city-shipping" type="text" placeholder="City">
          </div>
          <span class="error"></span>
        </div>
        <div class="input-group input-group-col-2">
          <div class="field">
            <div class="input-wrapper dropdown">
              <label>State</label>
              <select v-model="fields.stateShipping" id="state-shipping" placeholder="State" data-clean="true">
                <option value="null" disabled>State</option>
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
            <span class="error"></span>
          </div>
          <div class="field">
            <div class="input-wrapper">
              <label>ZIP code</label>
              <input v-model="fields.zipShipping" id="zip-shipping" type="text" placeholder="ZIP code">
            </div>
            <span class="error"></span>
          </div>
        </div>
      </div>

      <!-- Save & Continue CTA -->
      <div class="continue-container">
        <a class="continue-btn cta" href="#" @click.prevent="getShippingRate()">Continue</a>
      </div>

      <!-- Payment Information -->
      <div class="segment payment-information">
        <h3 class="segment-title">Payment Information</h3>

        <div class="field">
          <div class="input-wrapper stripe-wrapper">
            <div id="card-number"></div>
            <label>Credit Card Number</label>
            <Icon name="creditCard" />
          </div>
          <span class="error"></span>
        </div>
        <div class="input-group input-group-col-2">
          <div class="field">
            <div class="input-wrapper stripe-wrapper">
              <div id="card-expiry"></div>
              <label>MM / YY</label>
            </div>
            <span class="error"></span>
          </div>
          <div class="field">
            <div class="input-wrapper stripe-wrapper">
              <div id="card-cvc"></div>
              <label>CVC</label>
            </div>
            <span class="error"></span>
          </div>
        </div>

        <!-- Same Address Toggle -->
        <div class="same-shipping-billing">
          <label class="same-shipping-billing-label" for="same-address">
            <input v-model="sameAddress" type="checkbox" id="same-address" checked>
            <div class="checkbox-container">
              <Icon name="checkmark" />
            </div>
            <span>Same billing &amp; shipping info</span>
          </label>
        </div>
      </div>

      <!-- Billing Address -->
      <div v-show="!sameAddress" class="segment billing-address">
        <h3 class="segment-title">Billing Address</h3>

        <div class="input-group input-group-col-2">
          <div class="field">
            <div class="input-wrapper">
              <label>First Name</label>
              <input v-model="fields.firstNameBilling" id="first-name-billing" type="text" placeholder="First Name">
            </div>
            <span class="error"></span>
          </div>
          <div class="field">
            <div class="input-wrapper">
              <label>Last Name</label>
              <input v-model="fields.lastNameBilling" id="last-name-billing" type="text" placeholder="Last Name">
            </div>
            <span class="error"></span>
          </div>
        </div>
        <div class="field">
          <div class="input-wrapper">
            <label>Address</label>
            <input v-model="fields.address1Billing" id="address1-billing" type="text" placeholder="Address">
          </div>
          <span class="error"></span>
        </div>
        <div class="field">
          <div class="input-wrapper">
            <label>Address 2 (optional)</label>
            <input v-model="fields.address2Billing" id="address2-billing" type="text" placeholder="Address 2 (optional)">
          </div>
          <span class="error"></span>
        </div>
        <div class="field">
          <div class="input-wrapper">
            <label>City</label>
            <input  v-model="fields.cityBilling" id="city-billing" type="text" placeholder="City">
          </div>
          <span class="error"></span>
        </div>
        <div class="input-group input-group-col-2">
          <div class="field">
            <div class="input-wrapper dropdown">
              <label>State</label>
              <select v-model="fields.stateBilling" id="state-billing" placeholder="State" data-clean="true">
                <option value="null" disabled>State</option>
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
            <span class="error"></span>
          </div>
          <div class="field">
            <div class="input-wrapper">
              <label>ZIP code</label>
              <input  v-model="fields.zipBilling" id="zip-billing" type="text" placeholder="ZIP code">
            </div>
            <span class="error"></span>
          </div>
        </div>
      </div>

      <!-- Place Order -->
      <div class="segment place-order">
        <div class="error-section">{{ error }}</div>
        <a @click.prevent="placeOrder" class="cta place-order-cta">Place Order</a>
      </div>
    </form>
  </section>
</template>

<script>
import utils from '@/mixins/utils';
import Icon from '@/components/Icons';

export default {
  name: 'Checkout',
  components: {
    Icon
  },
  mixins: [utils],
  data () {
    return {
      stripe: null,
      card: null,
      cardCheckSending: false,
      error: null,
      sameAddress: true,
      fields: {
        email: null,
        firstNameShipping: null,
        lastNameShipping: null,
        address1Shipping: null,
        address2Shipping: null,
        cityShipping: null,
        stateShipping: null,
        zipShipping: null,
        firstNameBilling: null,
        lastNameBilling: null,
        address1Billing: null,
        address2Billing: null,
        cityBilling: null,
        stateBilling: null,
        zipBilling: null
      }
    }
  },
  methods: {
    initInputClasses() {
      const inputs = document.querySelectorAll('.checkout-form input[type="text"], select');
      inputs.forEach(input => {
        input.addEventListener('focus', e => this.toggleActiveClass(e, 'add'));
        input.addEventListener('blur', e => {
          if (!e.target.value) this.toggleActiveClass(e, 'remove');
        });
      });
    },
    toggleActiveClass(e, method) {
      e.target.closest('.input-wrapper').classList[method]('active');
      if (method === 'add') this.clearInlineError(e.target.closest('.field'));
      if (e.target.nodeName === 'SELECT') e.target.dataset.clean = false;
    },
    initStripe() {
      utils.loadScript('https://js.stripe.com/v3/', this.addStripeElements);
    },
    getShippingRate() {
      console.log('get shipping rate');

      fetch('http://localhost:8081/api/shipping-rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: this.fields,
          items: utils.getCartArray().map(item => {
            return { variant_id: item.catalogVariantID, quantity: 1 };
          })
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('api/shipping-rate response: ', data);
      });
    },
    clearInlineError(element) {
      element.classList.remove('has-error');
      element.querySelector('.error').textContent = '';
    },
    clearAllInlineErrors() {
      document.querySelectorAll('.field').forEach(this.clearInlineError);
    },
    placeOrder() {
      this.clearAllInlineErrors();
      Object.keys(this.fields).forEach(key => {
        const field = this.$data.fields[key];
        const element = document.querySelector(`#${utils.slugify(key)}`);
        if (/address2/.test(element.id)) return;

        const parentEl = element.closest('.field');
        const validEmailRegEx = /^.+@.+\..+$/;
        let errorMessage;
        
        if (!field) {
          errorMessage = `${element.getAttribute('placeholder')} required`;;
        } else if (key === 'email' && !validEmailRegEx.test(field)) {
          errorMessage = 'Invalid email address';
        } else return;

        parentEl.querySelector('.error').textContent = errorMessage;
        parentEl.classList.add('has-error');
      });

      return;
      this.error = null;
      this.createToken();
    },
    addStripeElements() {
      const style = { base: { fontSize: '16px', '::placeholder': { color: '#a9a9a9', }}};
      const stripePublishableKey = 'pk_test_OKClfKEUHvsE9Bpb9hoptSGV';
      this.stripe = Stripe(stripePublishableKey);
      const elements = this.stripe.elements();

      this.card = elements.create('cardNumber', { style, placeholder: 'Credit Card Number' });
      this.card.mount('#card-number');
      elements.create('cardExpiry', { style }).mount('#card-expiry');
      elements.create('cardCvc', { style }).mount('#card-cvc');
    },
    createToken() {
      this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
          this.error = result.error.message;
          console.log('error!!!', result.error);
        } else {
          console.log('sending to server');
          this.stripeTokenHandler(result.token);
        }
      });
    },
    stripeTokenHandler(token) {
      const formData = {
        token,
        fields: this.fields
      };

      fetch('http://localhost:8081/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('api/place-order response: \n', data);
        if (data.error) {
          this.error = data.error;
        } else {
          console.log('SUCCESS!', data);
        }
      });
    }
  },
  mounted() {
    this.initInputClasses();
    if (!window.Stripe) {
      this.initStripe();
    } else this.addStripeElements();
  }
}
</script>


<style scoped lang="scss">
.checkout {
  margin: 0 auto;
  max-width: 500px;
  text-align: left;

  .segment {
    margin-bottom: 20px;

    .segment-title {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .field.has-error {
    .input-wrapper,
    .input-wrapper.active,
    .input-wrapper.active:not(.stripe-wrapper) {
      margin-bottom: 6px;
      border: solid 1px #eb1c26;
    }

    .error {
      margin-bottom: 10px;
    }
  }

  .input-group,
  .input-wrapper {
    border-radius: 8px;
    position: relative;

    &.active:not(.stripe-wrapper) {
      border: solid 1px #16bfff;

      label {
        opacity: 1;
        transform: none;
      }

      input,
      select {
        padding: 23px 12px 7px 12px;
      }

      select {
        padding-top: 22px;
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
      font-size: 11px;
      transform: translateY(3px);
      opacity: 0;
      color: #949494;
      pointer-events: none;
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

      &[data-clean="true"] {
        color: #a9a9a9;
      }

      option[disabled] {
        display: none;
      }
    }
  }

  .input-group {
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr;
  }

  .input-wrapper {
    height: 50px;
    margin-bottom: 10px;

    &:not(.stripe-wrapper) {
      border: solid 1px #d5d5d5;
    }
  }

  .error {
    display: inline-block;
    font-size: 14px;
    color: #eb1c26;

    &:empty {
      display: none;
    }
  }

  .contact-information,
  .input-group:last-child {
    .field.has-error .error {
      margin-bottom: 0;
    }
  }

  .same-shipping-billing {
    clear: both;
    margin-top: 20px;

    #same-address {
      display: none;
    }

    .same-shipping-billing-label {
      cursor: pointer;
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

      .icon--checkmark {
        position: relative;
        top: 1px;
        width: 12px;
        fill: #fff;
        min-height: 15px;
      }
    }
  }

  .continue-container {
    text-align: center;
    margin-bottom: 20px;
  }

  .place-order {
    .error-section {
      color: #eb1c26;
      margin-bottom: 10px;
    }

    .place-order-cta {
      width: 100%;
      text-align: center;
    }
  }

  // -- Stripe elements styles -- //
  .StripeElement {
    padding: 15px 12px 14px 12px;
    background-color: #fff;
    border-radius: 8px;
    transition: all 0.22s ease-out;
    cursor: text;
    border: solid 1px #d5d5d5;

    label {
      top: 2px;
    }

    & ~ .icon--creditCard {
      position: absolute;
      fill: #d5d5d5;
      right: 12px;
      top: 10px;
      width: 30px;
      z-index: 1;
    }
  }
  .StripeElement--focus,
  .StripeElement--invalid,
  .StripeElement--complete {
    padding: 23px 12px 6px 12px;

    & + label {
      opacity: 1 !important;
      transform: none !important;
    }
  }
  .StripeElement--focus,
  .StripeElement--complete {
    border: solid 1px #16bfff;
  }

  @mixin placeholder {
    ::-webkit-input-placeholder {@content}
    :-moz-placeholder           {@content}
    ::-moz-placeholder          {@content}
    :-ms-input-placeholder      {@content}  
  }

  @include placeholder {
    color: #a9a9a9;
  }
}
</style>

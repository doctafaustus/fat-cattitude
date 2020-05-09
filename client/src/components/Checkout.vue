<template>
  <section class="checkout">

    <div v-show="step === 'post-estimate'" class="saved-info">
      <div class="saved-info-block">
        <span @click="editInfo()" class="edit-link">Edit</span>

        <div class="block">
          <h4>Email Address</h4>
          <div>{{ fields.email }}</div>
        </div>

        <div class="block">
          <h4>Shipping Address</h4>
          <div>{{ fields.firstNameShipping }} {{ fields.lastNameShipping }}</div>
          <div>{{ fields.address1Shipping }}</div>
          <div>{{ fields.cityShipping }} {{ fields.stateShipping }} {{ fields.zipShipping }}</div>
        </div>

        <div v-show="!sameAddress" class="block">
          <h4>Billing Address</h4>
          <div>{{ fields.firstNameBilling }} {{ fields.lastNameBilling }}</div>
          <div>{{ fields.address1Billing }}</div>
          <div>{{ fields.cityBilling }} {{ fields.stateBilling }} {{ fields.zipBilling }}</div>
        </div>
      </div>
    </div>

    <form class="checkout-form" action="/api/place-order" method="POST">
      <fieldset v-show="step === 'pre-estimate'" class="pre-estimate">
      
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

        <!-- Same Address Toggle -->
        <div class="same-shipping-billing">
          <label class="same-shipping-billing-label" for="same-address">
            <input v-model="sameAddress" type="checkbox" id="same-address" checked>
            <div class="checkbox-container">
              <Icon name="checkmark" />
            </div>
            <span>Same billing &amp; shipping address</span>
          </label>
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
                <input v-model="fields.zipBilling" id="zip-billing" type="text" placeholder="ZIP code">
              </div>
              <span class="error"></span>
            </div>
          </div>
        </div>

        <!-- Save & Continue CTA -->
        <div class="continue-container">
          <div v-show="estimateOrderError" class="estimate-order-error error">{{ estimateOrderError }}</div>
          <button class="continue-btn cta" @click.prevent="validateFields({ isEstimate: true })" ref="continue">Continue</button>
        </div>
      </fieldset>

      <fieldset v-show="step === 'post-estimate'" class="post-estimate">
        <!-- Shipping Rate -->
        <div v-show="Object.keys(orderEstimate).length" class="shipping-rate-container">
          <div class="shipping-rate-title">Shipping Option</div>
          <ul class="shipping-rate-options">
            <li class="shipping-rate-option">
              <label for="shipping-option-0">
                <input type="radio" id="shipping-option-0" name="shipping-option" checked>
                <div class="circle"></div>
                <div class="shipping-rate-name">
                  <span class="shipping-rate-id">Standard</span> - <span>Flat Rate (3-4 business days after fulfillment)</span>
                </div>
                <div class="shipping-rate-value">${{ orderEstimate.shipping }}</div>
              </label>
            </li>
          </ul>
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
            <span class="error" ref="number-error"></span>
          </div>
          <div class="input-group input-group-col-2">
            <div class="field">
              <div class="input-wrapper stripe-wrapper">
                <div id="card-expiry"></div>
                <label>MM / YY</label>
              </div>
              <span class="error" ref="expiry-error"></span>
            </div>
            <div class="field">
              <div class="input-wrapper stripe-wrapper">
                <div id="card-cvc"></div>
                <label>CVC</label>
              </div>
              <span class="error" ref="cvc-error"></span>
            </div>
          </div>
        </div>

        <!-- Place Order -->
        <div class="segment place-order">
          <div class="place-order-error">{{ placeOrderError }}</div>
          <button @click.prevent="validateFields({ isEstimate: false })" class="cta place-order-cta" ref="place-order"><span class="place-order-text">Place Order</span></button>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script>
import utils from '@/mixins/utils';
import Icon from '@/components/Icons';
import EventBus from '@/EventBus';

export default {
  name: 'Checkout',
  components: {
    Icon
  },
  mixins: [utils],
  data () {
    return {
      step: 'pre-estimate',
      stripe: null,
      card: null,
      cardCheckSending: false,
      estimateOrderError: null,
      placeOrderError: null,
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
      },
      orderEstimate: {}
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
    editInfo() {
      this.step = 'pre-estimate';
    },
    clearInlineError(element) {
      element.classList.remove('has-error');
      element.querySelector('.error').textContent = '';
    },
    clearAllInlineErrors() {
      document.querySelectorAll('.field').forEach(this.clearInlineError);
    },
    validateFields({ isEstimate }) {
      this.placeOrderError = null;
      this.clearAllInlineErrors();

      Object.keys(this.fields).forEach(key => {
        const field = this.$data.fields[key];
        const element = document.querySelector(`#${utils.slugify(key)}`);
        if (/address2/.test(element.id)) return;

        const parentEl = element.closest('.field');
        const validEmailRegEx = /^.+@.+\..+$/;
        let errorMessage;
        
        if (!field) {
          errorMessage = `${element.getAttribute('placeholder')} required`;
        } else if (key === 'email' && !validEmailRegEx.test(field)) {
          errorMessage = 'Invalid email address';
        } else return;

        parentEl.querySelector('.error').textContent = errorMessage;
        parentEl.classList.add('has-error');
      });

      if (this.hasInlineErrors()) return console.log('has inline errors');

      if (isEstimate) {
        EventBus.$emit('processing', { isProcessing: true });
        this.$refs.continue.disabled = true;
        this.getOrderEstimate();
      } else {
        this.createToken();
      }
    },
    hasInlineErrors() {
      if (this.sameAddress) {
        return document.querySelectorAll('.contact-information .has-error, .shipping-address .has-error').length;
      } else {
        return document.querySelectorAll('.has-error').length;
      }
    },
    getItemsMap() {
      return utils.getCartArray().map(item => {
        return { sync_variant_id: item.variantID, quantity: 1, retail_price:  item.price };
      });
    },
    getOrderEstimate() {
      this.estimateOrderError = false;

      fetch('http://localhost:8081/api/estimate-costs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fields: this.fields,
          items: this.getItemsMap()
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('api/estimate-costs response: \n', data);
        this.$refs.continue.disabled = false;
        EventBus.$emit('processing', { isProcessing: false });

        if (data.error) {
          this.estimateOrderError = `Error - ${data.error}`;
        } else {
          console.log('SUCCESS!', data);
          this.orderEstimate = data.result.costs;
          EventBus.$emit('order-estimate', this.orderEstimate);
          this.step = 'post-estimate';
        }
      });
    },
    addStripeElements() {
      const style = { base: { fontSize: '16px', '::placeholder': { color: '#a9a9a9', }}};
      const stripePublishableKey = 'pk_test_OKClfKEUHvsE9Bpb9hoptSGV';
      this.stripe = Stripe(stripePublishableKey);
      const elements = this.stripe.elements();

      const card = elements.create('cardNumber', { style, placeholder: 'Credit Card Number' });
      const cardExpiry = elements.create('cardExpiry', { style });
      const cardCVC = elements.create('cardCvc', { style })

      card.mount('#card-number');
      cardExpiry.mount('#card-expiry');
      cardCVC.mount('#card-cvc');

      card.ref = '#card-number';
      cardExpiry.ref = '#card-expiry';
      cardCVC.ref = '#card-cvc';

      this.card = card;

      [card, cardExpiry, cardCVC].forEach(el => {
        el.on('change', e => {  
          const fieldEl = document.querySelector(el.ref).closest('.field');
          fieldEl.classList.remove('has-error');
          fieldEl.querySelector('.error').textContent = '';
        });
      });
    },
    createToken() {
      this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
          console.log('error!!!', result.error);

          const errorMap = {
            'incomplete_number': 'number-error',
            'invalid_number': 'number-error',
            'incomplete_expiry': 'expiry-error',
            'invalid_expiry_year_past': 'expiry-error',
            'invalid_expiry_year': 'expiry-error',
            'incomplete_cvc': 'cvc-error',
            'invalid_cvc': 'cvc-error' // <- Guessing this exists
          }

          const errorRef = errorMap[result.error.code];
          if (errorRef) {
            const element = this.$refs[errorRef];
            element.closest('.field').classList.add('has-error');
            element.textContent = result.error.message;
          } else {
            this.placeOrderError = result.error.message;
          }

        } else {
          console.log('sending to server');
          this.$refs['place-order'].disabled = true;
          this.stripeTokenHandler(result.token);
        }
      });
    },
    stripeTokenHandler(token) {
      fetch('http://localhost:8081/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          fields: this.fields,
          items: this.getItemsMap()
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('api/place-order response: \n', data);
        this.$refs['place-order'].disabled = false;

        if (data.error) {
          this.placeOrderError = data.error;
        } else {
          console.log('SUCCESS!', data);
          this.$router.push(`/order-confirmation?id=${data.charge.metadata.orderID}`);
        }
      });
    }
  },
  mounted() {
    this.initInputClasses();
    if (!window.Stripe) {
      this.initStripe();
    } else this.addStripeElements();

    EventBus.$on('cart-remove', () => {
      if (this.step === 'post-estimate') {
        this.validateFields({ isEstimate: true });
      }
    });
  }
}
</script>


<style scoped lang="scss">
.checkout {
  margin: 0 auto;
  max-width: 500px;
  text-align: left;

  .saved-info {
    .saved-info-block {
      padding: 16px;
      border: solid 1px #e5e5e5;
      margin-bottom: 20px;
      font-size: 15px;
      position: relative;

      .edit-link {
        position: absolute;
        top: 16px;
        right: 16px;
        cursor: pointer;
        text-decoration: underline;
      }

      .block {
        margin-top: 16px;

        &:first-child {
          margin-top: 0;
        }

        h4 {
          font-size: 16px;
          margin-bottom: 5px;
        }

        div {
          line-height: 22px;
        }
      }
    }
  }

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
    .input-wrapper.active {
      margin-bottom: 6px;
      border: solid 1px #eb1c26;
    }

    .StripeElement {
      border: none;
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
    line-height: 18px;
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
    margin-bottom: 20px;

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

    .estimate-order-error {
      margin-bottom: 10px;
    }

    .cta {
      width: 100%;
    }
  }

  // -- Shipping Rate section -- //
  .shipping-rate-container {
    background-color: #efefef;
    margin-bottom: 20px;

    input[type="radio"] {
      display: none;
    }

    input[type="radio"]:checked {
      & + .circle {
        border: none;
        background-color: #000;
      }
    }

    .circle {
      width: 16px;
      height: 16px;
      border-radius: 25px;
      border: solid 1px #ddd;
      background-color: #fff;
    }

    .shipping-rate-title,
    .shipping-rate-option {
      padding: 20px;
    }

    .shipping-rate-title {
      border-bottom: solid 1px #fff;
      font-size: 26px;
      font-family: 'Work Sans', sans-serif;
      font-weight: bold;
      text-align: center;
    }

    .shipping-rate-options {
      .shipping-rate-option {
        background-color: #e6e6e6;

        label {
          display: grid;
          grid-template-columns: 30px auto 60px;

          .shipping-rate-name {
            font-size: 14px;
            line-height: 18px;

            .shipping-rate-id {
              text-transform: capitalize;
            }
          }

          .shipping-rate-value {
            text-align: right;
            font-weight: bold;
          }
        }
      }
    }
  }

  .place-order {
    .place-order-error {
      color: #eb1c26;
      margin-bottom: 10px;
    }

    .place-order-cta {
      width: 100%;
      text-align: center;
      position: relative;
      height: 55px;

      &[disabled] {
        .place-order-text {
          display: none;
        }

        &::after {
          display: inline-block;
        }
      }

      &::after {
        content: '';
        position: relative;
        display: none;
        width: 20px;
        height: 20px;
        border: 4px solid transparent;
        border-top-color: #fff;
        border-bottom-color: #fff;
        border-radius: 50%;
        animation: loader-rotate-data-v-7eff5a76 .725s linear infinite;
        top: -1px;
      }
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

  @keyframes loader-rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg); 
    }
  }
}
</style>

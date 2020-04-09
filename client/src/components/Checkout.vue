<template>
  <section class="checkout">
    <form class="checkout-form">
      <div class="segment">
        <h3 class="segment-title">Contact Information</h3>
        <div class="input-wrapper">
          <label>Email</label>
          <input id="email" type="email" placeholder="Email">
        </div>
      </div>

      <div class="segment">
        <h3 class="segment-title">Shipping Address</h3>

        <div class="input-group">
          <div class="input-wrapper">
            <label>First Name</label>
            <input id="first-name" type="text" placeholder="First Name">
          </div>
          <div class="input-wrapper">
            <label>Last Name</label>
            <input id="last-name" type="text" placeholder="Last Name">
          </div>
        </div>

        <div class="input-wrapper">
          <label>Address</label>
          <input id="address" type="text" placeholder="Address">
        </div>
        <div class="input-wrapper">
          <label>Address 2 (optional)</label>
          <input id="address2" type="text" placeholder="Address 2 (optional)">
        </div>
        <div class="input-wrapper">
          <label>City</label>
          <input id="city" type="text" placeholder="City">
        </div>

        <div class="input-group">
        <div class="input-wrapper">
          <label>Country</label>
          <input id="country" type="text" placeholder="United States" value="US" disabled>
        </div>

          <div class="input-wrapper dropdown">
            <label>State</label>
            <select id="state">
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
            <input id="zip" type="text" placeholder="ZIP code">
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Checkout',
  data () {
    return {
    }
  }
}
</script>


<style scoped lang="scss">
.checkout {
  border: solid 1px red;
}
</style>

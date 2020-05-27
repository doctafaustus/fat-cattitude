<template>
  <header :class="{ 'active': navOpen === true }">
    <div class="header-main">
      <div class="header-left">

        <div @click="toggleNav()" class="burger-container">
          <Icon name="burger"/>
          <Icon name="close"/>
        </div>

        <router-link to="/" class="logo-link">
          <img class="logo" src="../assets/logo-small.png">
          <div class="logo-text">Fat Cattitude</div>
        </router-link>
      </div>
      <div class="header-right">
        <router-link :to="{ path: '/cart' }" class="bag-section">
          <img v-if="bagCount || isOrderConfirmationPage" class="bag-image" src="../assets/bag-happy.png">
          <img v-else class="bag-image" src="../assets/bag-sad.png">
          <div class="bag-count">{{ bagCount }}</div>
        </router-link>
      </div>
    </div>

    <div class="nav-flyout-container">
      <div @click="toggleNav()" class="overlay"></div>

      <div class="nav-flyout">
        <div class="nav-flyout-inner">
          <ul class="main-links">
            <li class="main-link">
              <Icon name="tshirt" />
              <router-link to="/" class="main-link-anchor">T-Shirts</router-link>
            </li>
            <li class="main-link">
              <Icon name="sticker" />
              <router-link to="/" class="main-link-anchor">Stickers</router-link>
            </li>
            <li class="main-link">
              <Icon name="hat" />
              <router-link to="/" class="main-link-anchor">Accessories</router-link>
            </li>
          </ul>

          <div class="hr"></div>

          <ul class="other-links">
            <li class="other-link">
              <router-link to="/" class="other-link-anchor">About</router-link>
            </li>
            <li class="other-link">
              <router-link to="/" class="other-link-anchor">Help / FAQ</router-link>
            </li>
            <li class="other-link">
              <router-link to="/" class="other-link-anchor">Privacy Policy &amp; Terms</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import utils from '@/mixins/utils';
import EventBus from '@/EventBus';
import Icon from '@/components/Icons';


export default {
  name: 'Header',
  components: {
    Icon,
  },
  data () {
    return {
      navOpen: false,
      bagCount: 0,
      isOrderConfirmationPage: null
    }
  },
  mixins: [utils],
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen;
      if (this.navOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    checkForOrderConfirmation() {
      if (window.location.pathname === '/order-confirmation') {
        this.isOrderConfirmationPage = true;
      } else this.isOrderConfirmationPage = false;
    }
  },
  mounted() {
    EventBus.$on('cart-add', item => {
      utils.setCookie('cart', true);
      const cartArray = utils.getCartArray();
      cartArray.push(item);
      EventBus.$emit('cart-update', cartArray);
    });

    EventBus.$on('cart-remove', variantID => {
      const cartArray = utils.getCartArray();
      for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].variantID === variantID) {
          cartArray.splice(i, 1);
          break;
        }
      }
      EventBus.$emit('cart-update', cartArray);
    });

    EventBus.$on('cart-update', cartArray => {
      localStorage.cart = JSON.stringify(cartArray);
      this.bagCount = cartArray.length;
    });

    EventBus.$on('order-confirmation', () => {
      utils.deleteCookie('cart');
      EventBus.$emit('cart-update', []);
    });
  },
  created() {
    this.bagCount = utils.getCartArray().length;
  },
    watch: {
    '$route': {
      handler() {
        this.checkForOrderConfirmation();
      }
    },
  }
}
</script>


<style scoped lang="scss">
.header-main {
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(36,35,83,.1);
  position: relative;
  z-index: 15;
}

.header-left {
  float: left;
  display: flex;

  .burger-container {
    margin-right: 10px;
    padding: 0 10px;
    height: 90px;
    position: relative;

    .icon {
      margin-top: 20px;
      transition: all .2s linear;
      cursor: pointer;
      width: 50px;
      height: 50px;

      &.icon--close {
        display: none;
      }

      &:hover {
        fill: #6805fb;
      }
    }
  }
  
  .logo-link {
    color: #000;
    text-decoration: none;
    display: flex;
    align-items: center;

    .logo {
      width: 80px;
      position: relative;
      top: 4px;
    }

    .logo-text {
      margin-left: 10px;
      text-transform: uppercase;
      font-size: 25px;
      font-family: 'Archivo Black', sans-serif;
    }
  }
}

.header-right {
  .bag-section {
    display: flex;
    align-items: center;

    .bag-image {
      width: 34px;
      cursor: pointer;
    }

    .bag-count {
      margin-left: 7px;
      line-height: 1em;
      padding: .25rem .5rem;
      border-radius: 10px 0 0 10px;
      color: #fff;
      background: #6805fb;
    }
  }
}

header.active {
  .header-left {
    .burger-container {
      background-color: #6805fb;

      .icon {
        &.icon--burger {
          display: none;
        }

        &.icon--close {
          display: block;
          fill: #fff;
        }
      }
    }
  }

  .nav-flyout {
    left: 0;
  }

  .overlay {
    display: block;
  }
}

.nav-flyout {
  width: 300px;
  top: 0;
  height: 100%;
  position: absolute;
  padding: 0 0 100% 0;
  z-index: 10;
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
  background-color: #6805fb;
  left: -100%;
  transition: .3s;

  .nav-flyout-inner {
    position: relative;
    z-index: 15;
    padding: 114px 30px 0 30px;

    .main-links,
    .other-links {
      text-align: left;

      li {
        a {
          transition: all .2s linear;
        }
      }
    }


    .main-links {
      .main-link {
        padding: 16px 0;
        display: flex;
        align-items: center;

        .icon {
          height: 23px;
          width: 23px;
          fill: #30d0ff;
          margin-right: 10px;
        }

        .main-link-anchor {
          color: #fff;
          text-decoration: none;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: .5px;

          &:hover {
            color: #32caff;
          }
        }
      }
    }

    .hr {
      height: 1px;
      border-bottom: solid 1px #3f009e;
      margin: 24px 0 40px;
    }

    .other-links {
      .other-link {
        margin-bottom: 10px;

        .other-link-anchor {
          color: #32caff;
          text-decoration: none;
          font-family: 'Cousine', sans-serif;
          font-size: 15px;
          font-weight: bold;

          &:hover {
            color: #000;
          }
        }
      }
    }
  }
}

.overlay {
  display: none;
  background-color: rgba(0,0,0,.32);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  padding: 0 0 100% 0;
}
</style>

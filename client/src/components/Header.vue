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
          <div class="logo-text"><span>Fat</span> <span>Cattitude</span></div>
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
            <li @click="toggleNav()" class="main-link">
              <router-link to="/items/tshirt" class="main-link-anchor">
                <Icon name="tshirt" />
                <span class="main-link-span">T-Shirts</span>
              </router-link>
            </li>
            <li @click="toggleNav()" class="main-link">
              <router-link to="/items/sticker" class="main-link-anchor">
                <Icon name="sticker" />
                <span class="main-link-span">Stickers</span>
              </router-link>
            </li>
            <li @click="toggleNav()" class="main-link">
              <router-link to="/items/accessories" class="main-link-anchor">
                <Icon name="hat" />
                <span class="main-link-span">Accessories</span>
              </router-link>
            </li>
          </ul>

          <div class="hr"></div>

          <ul class="other-links">
            <li @click="toggleNav()" class="other-link">
              <router-link to="/" class="other-link-anchor">About</router-link>
            </li>
            <li @click="toggleNav()" class="other-link">
              <router-link to="/help" class="other-link-anchor">Help / FAQ</router-link>
            </li>
            <li @click="toggleNav()" class="other-link">
              <router-link to="/privacy-policy" class="other-link-anchor">Privacy Policy &amp; Terms</router-link>
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
      const parentEls = [document.documentElement, document.body];
      if (this.navOpen) {
        parentEls.forEach(el => el.style.overflow = 'hidden');
      } else {
        parentEls.forEach(el => el.style.overflow = 'auto');
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
      padding-top: 12px;
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

        .main-link-anchor {
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .icon {
          height: 23px;
          width: 23px;
          fill: #30d0ff;
          margin-right: 10px;
        }

        .main-link-span {
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
          display: block;
          padding: 2px 0;

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


@media (max-width: 834px) {
  header {
    .header-main {
      height: 60px;

      .header-left {
        .burger-container {
          height: 61px;
          margin-right: 2px;

          .icon {
            width: 40px;
            height: 40px;
            margin-top: 12px;
          }
        }

        .logo-link {
          .logo {
            width: 52px;
          }

          .logo-text {
            font-size: 20px;
            text-align: left;
            padding-top: 0;

            span {
              display: block;

              &:first-child {
                margin-bottom: 2px;
              }
            }
          }
        }
      }
    }

    .nav-flyout-container {
      .nav-flyout {
        width: 78%;

        .nav-flyout-inner {
          padding: 80px 30px 0 30px;

          .main-links {
            .main-link {
              padding: 10px 0;

              .icon {
                height: 20px;
                width: 20px;
              }

              .main-link-span {
                font-size: 18px;
              }
            }
          }

          .hr {
            margin-bottom: 34px;
          }
        }
      }
    }
  }

  
}
</style>

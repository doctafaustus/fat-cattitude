<template>
  <header>
    <div class="header-left">
      <router-link to="/" class="logo-link">
        <img class="logo" src="../assets/logo-small.png">
        <div class="logo-text">Fat Cattitude</div>
      </router-link>
    </div>
    <div class="header-right">
      <router-link :to="{ path: '/cart' }" class="bag-section">
        <img v-if="bagCount" class="bag-image" src="../assets/bag-happy.png">
        <img v-else class="bag-image" src="../assets/bag-sad.png">
        <div class="bag-count">{{ bagCount }}</div>
      </router-link>
    </div>
  </header>
</template>

<script>
import utils from '@/mixins/utils';
import EventBus from '@/EventBus';


export default {
  name: 'Header',
  data () {
    return {
      bagCount: 0,
    }
  },
  mixins: [utils],
  mounted() {
    EventBus.$on('cart-add', item => {
      const cartArray = (utils.getCookie('cart') && JSON.parse(utils.getCookie('cart'))) || [];
      cartArray.push(item);
      utils.setCookie('cart', JSON.stringify(cartArray));
      EventBus.$emit('cart-update', cartArray);
    });

    EventBus.$on('cart-update', cartArray => {
      this.bagCount = cartArray.length;
    });
  },
  created() {
    const cartArray = (utils.getCookie('cart') && JSON.parse(utils.getCookie('cart'))) || [];
    this.bagCount = cartArray.length;
  }
}
</script>


<style scoped lang="scss">
header {
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 10px;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(36,35,83,.1);
}

.header-left {
  float: left;

  .logo-link {
    color: #000;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

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
</style>

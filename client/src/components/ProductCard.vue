<template>
  <section class="product-card" :class="{ 'sold-out': !product.inStock }">
    <a href="#" class="card-link">
      <img class="card-image" :src="product.image">
      <div class="out-of-stock">Sold Out</div>
      <div class="card-info">
        <div class="card-title">{{ product.title }}</div>
        <div class="card-price">${{ product.price }}</div>
      </div>
    </a>
  </section>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  data () {
    return {
    }
  }
}
</script>


<style scoped lang="scss">
.product-card {
  &.sold-out {
    .card-link {
      .out-of-stock {
        display: flex;
      }

      .card-info {
        .card-price {
          color: #ff4800;
        }
      }
    }
  }

  .card-link {
    background-color: #fff;
    position: relative;
    display: block;
  
    .card-image {
      width: 100%;
      display: block;
    }

    .out-of-stock {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background: rgba(31,30,48,.75);
      color: #fff;
      font-weight: bold;
      font-size: 36px;
      display: none;
      align-items: center;
      justify-content: center;
    }

    .card-info {
      background-color: #303043;
      position: absolute;
      z-index: 2;
      bottom: 20px;
      width: 70%;
      margin: 0 auto;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .card-title {
        color: #fff;
        font-weight: bold;
        padding-left: 20px;
      }

      .card-price {
        background-color: #1f1e30;
        color: #05e8b5;
        font-weight: bold;
        padding: 14px;
      }
    }
  }
}
</style>

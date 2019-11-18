<template>
  <section class="product-card">
    <a href="#" class="card-link">
      <img class="card-image" :src="product.image">
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
  .card-link {
    background-color: #fff;
    position: relative;
    display: block;
  
    .card-image {
      width: 100%;
      display: block;
    }

    .card-info {
      background-color: #303043;
      position: absolute;
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

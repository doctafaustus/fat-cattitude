<template>
  <section class="product-card">
    <a href="#" class="card-link">
      <img class="card-image" src="../assets/im-busy.jpg">
      <div class="card-info">
        <div class="card-title">I'm Busy</div>
        <div class="card-price">$30</div>
      </div>
    </a>
  </section>
</template>

<script>
export default {
  name: 'ProductCard',
  data () {
    return {
    }
  }
}
</script>


<style scoped lang="scss">
.product-card {
  width: 33%;

  .card-link {
    background-color: #fff;
    position: relative;
  
    .card-image {
      width: 100%;
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

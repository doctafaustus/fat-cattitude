<template>
  <section class="item wrapper">
    <div class="image-and-details">
      <div class="image-container">
          <img :src="item.image" class="item-image">
      </div>
      <div class="details-container">
        <h1 class="item-title">{{ item.title }}</h1>
        <div class="item-subtitle">{{ item.subtitle }}</div>

        <div class="sub-container">
          <div class="item-style"></div>
        </div>

        {{ item }}
      </div>
    </div>


  </section>
</template>

<script>
import products from '@/model/products.js';

export default {
  name: 'Item',
  data () {
    return {
      item: {}
    }
  },
  methods: {
    getItem() {
      this.item = products.featuredShirts.find(item => item.id == this.$route.params.id);
    },
  },
  created() {
    this.getItem();
  }
}
</script>


<style scoped lang="scss">
.item {
  padding: 80px;

  .image-and-details {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .image-container {
      margin-right: 40px;

      .item-image {
        width: 625px;
        box-shadow: 0 5px 10px rgba(37,33,81,.11);
      }
    }

    .details-container {
      border: solid 1px red;

      .item-title {
        font-size: 48px;
        margin-bottom: 8px;
      }

      .item-subtitle {
        font-size: 20px;
      }
    }
  }

}
</style>

<template>
  <section class="item">
    item
    {{ product }}
  </section>
</template>

<script>
import topShirts from '@/model/top-shirts.js';

export default {
  name: 'Item',
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct() {
      this.product = topShirts.find(product => product.id == this.$route.params.id);
    },
  },
  created() {
    this.getProduct();
  }
}
</script>


<style scoped lang="scss">

</style>

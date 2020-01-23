<template>
  <section class="item">
    {{ item }}
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

</style>

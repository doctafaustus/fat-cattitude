<template>
  <section>
    <Header></Header>
      Cart
    <Footer></Footer>
  </section>
</template>


<script>
import utils from '@/mixins/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'Cart',
  components: {
    Header,
    Footer
  },
  mixins: [utils],
  data () {
    return {
    }
  },
  mounted() {
    const cartArray = (utils.getCookie('cart') && JSON.parse(utils.getCookie('cart'))) || [];
    console.log('cart mounted', cartArray);
  }
}
</script>
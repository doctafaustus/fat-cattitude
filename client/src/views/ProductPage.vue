<template>
  <section>
    <Header></Header>
    <Item></Item>
    <Footer></Footer>
  </section>
</template>


<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Item from '@/components/Item';

export default {
  name: 'Productpage',
  components: {
    Header,
    Item,
    Footer
  },
  data () {
    return {
    }
  }
}
</script>
<template>
  <section>
    <Header></Header>
    <div id="test">
      <h1 class="section-title">Show off your Fat Cattitude</h1>
      <ProductCard></ProductCard>
    </div>
  </section>
</template>

<script>
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

export default {
  name: 'Home',
  components: {
    Header,
    ProductCard
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#test {
  background-image: url(//cdn.shopify.com/s/files/1/2292/0133/files/combo-postage-bg-pattern_ab71dc4e-68d1-49c3-8cab-384acb3fdd55_1200x.png?v=1571074956);
  background-position: center center;
  background-repeat: repeat;
}

.section-title {
  color: #fff;
  font-size: 48px;
  font-family: 'Platform';
  letter-spacing: 2.4px;
  margin-bottom: 60px;
  padding-top: 20px;
}

@font-face{
  font-family:'Platform';
  src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-medium.eot?11195");src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-medium.eot?11195?#iefix") format("embedded-opentype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-medium.woff?11195") format("woff"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-medium.ttf?11195") format("truetype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-medium.svg?11195#platformmedium") format("svg");font-weight:400;font-style:normal}@font-face{font-family:'Platform';src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-bold.eot?11195");src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-bold.eot?11195?#iefix") format("embedded-opentype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-bold.woff?11195") format("woff"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-bold.ttf?11195") format("truetype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--platform-bold.svg?11195#platformbold") format("svg");font-weight:700;font-style:normal}@font-face{font-family:'Akzidenz Grotesk';src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-reg.eot?11195");src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-reg.eot?11195?#iefix") format("embedded-opentype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-reg.woff2?11195") format("woff2"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-reg.woff?11195") format("woff"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-reg.ttf?11195") format("truetype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-reg.svg?11195#akzidenzgroteskregular") format("svg");font-weight:400;font-style:normal}@font-face{font-family:'Akzidenz Grotesk';src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-bold.eot?11195");src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-bold.eot?11195?#iefix") format("embedded-opentype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-bold.woff2?11195") format("woff2"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-bold.woff?11195") format("woff"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-bold.ttf?11195") format("truetype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--akzidenz-grotesk-bold.svg?11195#akzidenzgroteskbold") format("svg");font-weight:700;font-style:normal}@font-face{font-family:'Input Mono';src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-reg.eot?11195");src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-reg.eot?11195?#iefix") format("embedded-opentype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-reg.woff2?11195") format("woff2"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-reg.woff?11195") format("woff"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-reg.ttf?11195") format("truetype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-reg.svg?11195#InputMono-Regular") format("svg");font-weight:400;font-style:normal}@font-face{font-family:'Input Mono';src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-black.eot?11195");src:url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-black.eot?11195?#iefix") format("embedded-opentype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-black.woff2?11195") format("woff2"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-black.woff?11195") format("woff"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-black.ttf?11195") format("truetype"),url("//cdn.shopify.com/s/files/1/2292/0133/t/3/assets/font--input-mono-black.svg?11195#InputMono-Black") format("svg");font-weight:700;font-style:normal}

</style>

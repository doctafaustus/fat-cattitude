<template>
  <section class="listing wrapper">
    <h1 class="listing-title">{{ title }}</h1>
    <ul class="products">
      <ProductCard v-for="product in products" :key="product.id" :product="product"></ProductCard>
    </ul>
  </section>
</template>


<script>
import products from '@/model/products.js';
import ProductCard from '@/components/ProductCard';

export default {
  name: 'ProductListing',
  components: {
    ProductCard
  },
  data () {
    return {
      products: []
    }
  },
  computed: {
    title() {
      const titleMap ={
        tshirt: 'T-Shirts',
        sticker: 'Stickers',
        accessories: 'Accessories',
      };

      return titleMap[this.$route.params.category];
    }
  },
  methods: {
    getProducts() {
      const paramCategory = this.$route.params.category;
      if (paramCategory === 'accessories') {
        this.products = products.filter(product => {
          return product.style === 'hat' || product.style === 'mug';
        });
      } else {
        this.products = products.filter(product => product.style === paramCategory).reverse();
      }
    }
  },
  created() {
    this.getProducts();
  },
  watch: {
    '$route': {
      handler() {
        this.getProducts();
      }
    },
  }
}
</script>


<style scoped lang="scss">
.listing {
  padding: 80px;

  .listing-title {
    margin-bottom: 60px;
  }

  .products {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-bottom: 60px;

    .product-card {
      box-shadow: 0 3px 10px rgba(46, 45, 77, 0.1);
    }
  }

  @media (max-width: 834px) {
    padding: 20px;

    .listing-title {
      margin-bottom: 20px;
      font-size: 36px;
    }

    .products {
      grid-template-columns: 1fr;
      justify-items: center;
    }

    .product-card {
      width: 85%;
    }
  }
}
</style>

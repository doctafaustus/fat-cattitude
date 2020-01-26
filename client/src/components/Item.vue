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
          <div class="row">
            <label>Style</label>
            <div class="item-style">
              <Icon :name="item.style"/>
            </div>
          </div>
          <div class="row">
            <label>Color</label>
            <ul class="item-colors">
              <li class="swatch" v-for="color in item.colors" :key="color.colorName">
                <span class="swatch-icon" :style="getSwatch(color.colorCode)"></span>
                <span class="swatch-name">{{ color.colorName }}</span>
              </li>
            </ul>
          </div>
          <div class="row">
            <label>Size (Choose)</label>
            <ul v-for="color in item.colors" :key="color.colorName" class="item-sizes">
              <li v-for="size in color.sizes" :key="size.variantID" @click="selectSize(size.size)" :class="{ selected: size.size === selected.size }">{{ size.size }}</li>
            </ul>
          </div>

          <div class="cta-and-price">
            <button class="cta">Add to Cart</button>
            <div class="item-price">{{ item.price }}</div>
          </div>
        </div>

        {{ item }}
      </div>
    </div>


  </section>
</template>

<script>
import products from '@/model/products.js';
import Icon from '@/components/Icons';

export default {
  name: 'Item',
  components: {
    Icon
  },
  data () {
    return {
      item: {},
      selected: {
        size: null
      }
    }
  },
  computed: {
  },
  methods: {
    getItem() {
      this.item = products.featuredShirts.find(item => item.id == this.$route.params.id);
    },
    getSwatch(colorCode) {
      return `background-color: ${colorCode}`;
    },
    selectSize(size) {
      this.selected.size = size;
    }
  },
  created() {
    this.getItem();
  },
}
</script>


<style scoped lang="scss">
.item {
  padding: 80px;

  .image-and-details {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .image-container {
      margin-right: 140px;

      .item-image {
        width: 625px;
        box-shadow: 0 5px 10px rgba(37,33,81,.11);
      }
    }

    .details-container {
      max-width: 375px;

      .item-title {
        font-size: 48px;
        margin-bottom: 8px;
      }

      .item-subtitle {
        font-size: 20px;
      }

      .sub-container {
        margin-top: 40px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 5px 10px rgba(37,33,81,.11);
        padding: 20px;
        text-align: left;

        .row {
          border-bottom: solid 1px #eaeaea;
          margin-bottom: 20px;
        }

        label {
          font-family: 'Cousine', sans-serif;
          font-size: 13px;
          display: block;
          color: #808080;
        }

        .item-colors,
        .item-style,
        .item-sizes {
          padding: 10px 0;
        }

        .item-style {
          .icon {
            height: 38px;
            width: 38px;
            cursor: pointer;
            border-radius: 5px;
            padding: 2px;
          }
        }

        .item-colors {
          .swatch {
            .swatch-icon {
              display: inline-block;
              height: 25px;
              width: 25px;
              border-radius: 5px;
              border: solid 2px #000;
              margin-right: 3px;
            }

            .swatch-name {
              font-size: 13px;
              position: relative;
              top: -7px;
              margin-right: 20px;
            }
          }
        }

        .item-sizes {
          li {
            display: inline-block;
            padding: 4px 8px;
            margin-right: 6px;
            border-radius: 5px;
            cursor: pointer;
            border: solid 2px transparent;

            &.selected {
              border: solid 2px #701aff;
            }

            &:not(.selected):hover {
              border: solid 2px rgba(112, 26, 255, 0.3);
            }
          }
        }

        .cta-and-price {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .cta {
            padding: 11px 28px;
            font-size: 18px;
            font-weight: 600;
          }

          .item-price {
            font-size: 22px;
            color: #05a3e3;
            font-weight: 600;
          }
        }
      }
    }
  }

}
</style>

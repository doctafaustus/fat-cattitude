<template>
  <section class="item wrapper">

    <div class="pdp-grid">
      <!-- Image -->
      <div class="image-container">
        <div class="title-container mobile">
          <h1 class="item-title">{{ item.title }}</h1>
          <div class="item-subtitle">{{ item.subtitle }}</div>
        </div>
        <zoom-on-hover :img-normal="featuredImage || selected.image"  class="item-image" />
      </div>

      <!-- Details -->
      <div class="details-container">
        <div class="title-container desktop">
          <h1 class="item-title">{{ item.title }}</h1>
          <div class="item-subtitle">{{ item.subtitle }}</div>
        </div>

        <div class="sub-container">
          <div class="row">
            <label>Style</label>
            <div class="item-style">
              <Icon :name="item.style"/>
              <span class="item-style-text">{{ style }}</span>
            </div>
          </div>
          <div class="row">
            <label>Color <span v-show="item.colors.length > 1">(Choose)</span></label>
            <ul class="item-colors">
              <li
                v-for="color in item.colors" :key="color.colorName" 
                :class="{ 'swatch': true, selected: color.colorName === selected.color }"
                @click="selectColor({
                  colorName: color.colorName,
                  colorImage: color.colorImage})"
              >
                <span class="swatch-icon" :style="getSwatch(color.colorCode)"></span>
                <span class="swatch-name">{{ color.colorName }}</span>
              </li>
            </ul>
          </div>
          <div class="row">
            <label>Size (Choose)</label>
            <ul v-for="color in item.colors" :key="color.colorName" v-show="selected.color === color.colorName" class="item-sizes">
              <li v-for="size in color.sizes" :key="size.variantID" @click="selectSize(size.size, size.variantID)" :class="{ selected: size.size === selected.size }" :data-variant-id="size.variantID">{{ size.size }}</li>
            </ul>
          </div>

          <div class="cta-and-price">
            <button @click="addToCart()" class="cta">Add to Cart</button>
            <div class="item-price">${{ item.price }}</div>
          </div>

          <div :class="{ 'show': showSuccess }" class="success-message" ref="successMessage">
            <span>Added to cart</span>
            <img class="emoji" src="../assets/sunglasses-emoji.png">
          </div>
          <div :class="{ 'show': showError }" class="error-message" ref="errorMessage">
            <span>Please choose a size first</span>
            <img class="emoji" src="../assets/grin-emoji.png">
          </div>
        </div>

        <ul class="product-images">
          <!-- Model images -->
          <li
            v-for="modelImage in item.modelImages.filter(item => item.showOnPDP !== false)" :key="modelImage.image" 
            :class="{ selected: featuredImage === modelImage.image, 'product-image-container': true }"
            @click="selectColor({
              colorName: item.colors[modelImage.variantIndex].colorName,
              colorImage: item.colors[modelImage.variantIndex].colorImage,
              modelImage: modelImage.image
            })"
          >
            <img :src="modelImage.image" class="product-image">
          </li>

          <!-- Variant images -->
          <li 
            v-for="color in item.colors" :key="color.colorImage"
            :class="{ selected: !featuredImage && color.colorName === selected.color, 'product-image-container': true }"
            @click="selectColor({
              colorName: color.colorName,
              colorImage: color.colorImage
            })"
          >
            <img :src="color.colorImage" class="product-image">
          </li>
        </ul>
      </div>

      <!-- Size guide -->
      <div class="size-guide-container">
        <SizeGuide></SizeGuide>
      </div>

      <!-- Description -->
      <div class="desc-container">
        <h3 class="desc-title">Description</h3>
        <div class="desc-body">{{ item.description }}</div>
      </div>
    </div>
  </section>
</template>


<script>
import EventBus from '@/EventBus';
import products from '@/model/products.js';
import Icon from '@/components/Icons';
import SizeGuide from '@/components/SizeGuide';
import zoomOnHover from '@/components/scripts/zoomOnHover.js';

export default {
  name: 'Product',
  components: {
    Icon,
    SizeGuide,
    zoomOnHover
  },
  data () {
    return {
      item: {},
      featuredImage: null,
      selected: {
        productID: null,
        variantID: null,
        color: null,
        size: null,
        title: null,
        price: null,
        image: null,
        query: null
      },
      showSuccess: false,
      showError: false
    }
  },
  computed: {
    style() {
      if (this.item.style === 'tshirt') return 'Unisex';
      if (this.item.style === 'mug') return 'Enamel Mug';
      if (this.item.style === 'sticker') return 'Bubble-free Sticker';
      if (this.item.style === 'hat') return 'Embroided Baseball Hat';
    }
  },
  methods: {
    getItem(queryColor, querySize) {
      this.item = products.find(item => item.id == this.$route.params.id);

      const itemColorObj = this.item.colors.find(color => color.colorName === queryColor);
      const itemHasQueryColor = Boolean(itemColorObj);
      const itemSizeObj = itemHasQueryColor ? itemColorObj.sizes.find(item => item.size === querySize) : null;

      this.selected.productID = this.item.id;
      this.selected.color = itemHasQueryColor ? queryColor : this.item.colors[0].colorName;
      this.selected.size = itemSizeObj ? querySize : null;
      this.selected.variantID = itemSizeObj ? itemSizeObj.variantID : null;
      this.selected.image = itemHasQueryColor ? itemColorObj.colorImage : this.item.colors[0].colorImage;
      this.selected.title = this.item.title;
      this.selected.price = this.item.price;
    },
    getSwatch(colorCode) {
      const borderColor = (colorCode === '#ffffff') ? '#cac7c7' : 'transparent';
      return `background-color: ${colorCode}; border: solid 1px ${borderColor}`;
    },
    selectColor({ colorName, colorImage, modelImage }) {
      if (modelImage) this.featuredImage = modelImage;
      else this.featuredImage = null;
      
      this.selected.image = colorImage;
      this.selected.color = colorName;
      this.selected.size = null;
      this.updateURL();
    },
    selectSize(size, variantID) {
      this.selected.variantID = variantID;
      this.selected.size = size;
      this.updateURL();
    },
    updateURL() {
      this.$router.replace({path: this.$route.path, query: { color: this.selected.color, size: this.selected.size }}).catch(e => e);
    },
    resetAnimationATC(hasError) {
      const showClass = 'show';
      const successMessage = this.$refs.successMessage;
      const errorMessage = this.$refs.errorMessage;
      const alreadyShown = successMessage.classList.contains(showClass) || errorMessage.classList.contains(showClass);

      this.showSuccess = false;
      this.showError = false;

      window.requestAnimationFrame(() => {
        successMessage.classList.remove(showClass);
        errorMessage.classList.remove(showClass);

        if (alreadyShown) {
          setTimeout(() => {
            this.toggleMessage(hasError);
          }, 510);
        } else this.toggleMessage(hasError);
      });
    },
    toggleMessage(hasError) {
      const showClass = 'show';
      if (hasError) {
        this.showError = true;
        this.$refs.errorMessage.classList.add(showClass);
      } else {
        this.showSuccess = true;
        this.$refs.successMessage.classList.add(showClass);
      }
    },
    addToCart() {
      this.selected.query = {
        color: this.selected.color,
        size: this.selected.size
      };

      if (!this.selected.size) return this.resetAnimationATC(true);

      this.resetAnimationATC(false);
      EventBus.$emit('cart-add', this.selected);
    },
  },
  created() {
    const queryColor = this.$route.query.color;
    const querySize = this.$route.query.size;
    this.getItem(queryColor, querySize);
  },
}
</script>


<style scoped lang="scss">
.item {
  padding: 80px;

  .pdp-grid {
    display: grid;
    grid-template-areas:  "image-container details-container"
                          "size-guide-container desc-container";
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    align-items: center;
  }

  .title-container {
    margin-bottom: 40px;

    &.mobile {
      display: none;
      margin-bottom: 20px;

      .item-title {
        font-size: 36px;
        line-height: 40px;
      }
    }

    .item-title {
      font-size: 48px;
      margin-bottom: 8px;
    }

    .item-subtitle {
      font-size: 20px;
    }
  }

  .image-container {
     grid-area: image-container;

    .item-image {
      width: 100%;
      box-shadow: 0 5px 10px rgba(37,33,81,.11);
    }
  }

  .details-container {
    grid-area: details-container;
    width: 375px;
    margin: 0 auto;

    .sub-container {
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
          border-radius: 5px;
          padding: 2px;
        }

        .item-style-text {
          font-size: 13px;
          padding-left: 1px;
        }
      }

      .item-colors {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 0;

        .swatch {
          padding-bottom: 10px;

          cursor: pointer;
          display: flex;
          align-items: center;

          &.selected {
            .swatch-icon {
              border: solid 2px #701aff !important;
            }

            .swatch-name {
              -webkit-text-stroke: .3px black;
            }
          }

          &:not(.selected):hover {
            .swatch-icon {
              border: solid 2px rgba(112, 26, 255, 0.3);
            }
          }

          .swatch-icon {
            display: inline-block;
            height: 25px;
            width: 25px;
            border-radius: 5px;
            border: solid 1px #cac7c7;
            margin-right: 4px;
          }

          .swatch-name {
            font-size: 13px;
            margin-right: 19px;
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
        }

        .item-price {
          font-size: 22px;
          color: #05a3e3;
          font-weight: 600;
        }
      }

      .success-message,
      .error-message {
        font-weight: 600;
        font-size: 16px;
        max-height: 0;
        height: 0;
        margin: 0;
        overflow: hidden;
        transition: all .5s ease;
        display: flex;
        align-items: center;

        &.show {
          max-height: 500px;
          height: auto;
          margin-top: 15px;
        }

        .emoji {
          width: 20px;
          margin-left: 6px;
        }
      }

      .success-message {
        color: #17c305;
      }

      .error-message {
        color: #ff0000;
      }
    }

    .product-images {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 5%;

      .product-image-container {
          &.selected .product-image {
            border: solid 2px #701aff;
          }

          &:not(.selected):hover .product-image {
            border: solid 2px rgba(112, 26, 255, 0.3);
          }

        .product-image {
          cursor: pointer;
          width: 100%;
          box-shadow: 0 0px 3px 2px rgba(37,33,81,0.11);
        }
      }
    }
  }

  .size-guide-container {
    grid-area: size-guide-container;
  }
  
  .desc-container {
    grid-area: desc-container;
    padding: 0 40px;

    .desc-title {
      margin-bottom: 10px;
    }

    .desc-body {
      font-size: 18px;
      line-height: 24px;
      text-align: left;
    }
  }



  @media (max-width: 1120px) {
    .pdp-grid {
      grid-template-areas:  "image-container details-container"
                            "desc-container desc-container"
                            "size-guide-container size-guide-container";
    }
  }

  @media (min-width: 768px) and (max-width: 834px) {
    .image-container .item-image {
      width: 500px;
    }
  }


  @media (max-width: 834px) {
    padding: 40px;

    .pdp-grid {
      grid-template-columns: 1fr;
      grid-gap: 12px;
      grid-template-areas: "image-container" "details-container" "desc-container" "size-guide-container";
    }

    .title-container {
      &.desktop {
        display: none;
      }

      &.mobile {
        display: block;
      }
    }

    .details-container {
      width: 100%;

      .sub-container {
        padding: 12px;

        .row {
          margin-bottom: 12px;
        }

        .item-style {
          padding: 6px 0;

          .icon {
            width: 25px;
            height: 25px;
          }
        }
      }
    }

    .desc-container {
      text-align: center;
      padding: 28px 0;
    }
  }

  @media (max-width: 767px) {
    padding: 20px;
  }
}
</style>

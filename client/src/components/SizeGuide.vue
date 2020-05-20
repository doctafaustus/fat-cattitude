<template>
  <section class="size-guide">

    <h3 class="size-guide-title">Size Guide</h3>

    <div class="size-style">
      <span class="size-style">Unisex</span>
      <span class="style-brand">(Bella + Canvas 3001 Style)</span>
    </div>

    <div class="chart">
      <div class="column size">
        <div class="title">Size</div>
        <div class="data"><span class="size-abbrev">XS</span><span class="size-text"> - Extra Small</span></div>
        <div class="data"><span class="size-abbrev">S</span><span class="size-text"> - Small</span></div>
        <div class="data"><span class="size-abbrev">M</span><span class="size-text"> - Medium</span></div>
        <div class="data"><span class="size-abbrev">L</span><span class="size-text"> - Large</span></div>
        <div class="data"><span class="size-abbrev">XL</span><span class="size-text"> - Extra Large</span></div>
        <div class="data"><span class="size-abbrev">2XL</span><span class="size-text"> - Double Extra Large</span></div>
      </div>
      <div class="column chest">
        <div class="title">Chest To Fit</div>
        <div class="data">31" - 34"</div>
        <div class="data">34" - 37"</div>
        <div class="data">38" - 41"</div>
        <div class="data">42" - 45"</div>
        <div class="data">46" - 49"</div>
        <div class="data">50" - 53"</div>
      </div>
      <div class="column length">
        <div class="title">Length</div>
        <div class="data">27"</div>
        <div class="data">28"</div>
        <div class="data">29"</div>
        <div class="data">30"</div>
        <div class="data">31"</div>
        <div class="data">32"</div>
      </div>
    </div>
  </section>
</template>


<style scoped lang="scss">
.size-guide {

  .size-guide-title {
    margin-bottom: 10px;
  }

  .size-style {
    margin-bottom: 12px;

    .size-style {
      font-weight: 600;
    }

    .style-brand {
      font-size: 14px;
    }
  }

  .chart {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: solid 1px #e1e1e1;

    .column {
      .title,
      .data {
        padding: 10px;
      }

      .title {
        font-weight: bold;
        background-color: #6805fb;
        color: #fff;
        box-shadow: 0 3px 5px rgba(36,35,83,0.1);
        margin-bottom: 10px;
      }

      &.size .data {
        text-align: left;
        padding-left: 20px;
      }

      .data {
        border-bottom: solid 1px #eaeaea;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  @media (max-width: 767px) {
    .chart {
      grid-template-columns: 65px 1fr 90px;

      .size-text {
        display: none;
      }
    }
  }
}
</style>

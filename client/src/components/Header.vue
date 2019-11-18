<template>
  <header>
    <div class="header-left">
      <a href="#" class="logo-link">
        <img class="logo" src="../assets/logo.png">
        <div class="logo-text">Fat Cattitude</div>
      </a>
    </div>
    <div class="header-right">
      <div class="bag-section">
        <img class="bag-image" src="../assets/bag-sad.png">
        <div class="bag-count">0</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  }
}
</script>


<style scoped lang="scss">
header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 10px;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(36,35,83,.1);
}

.header-left {
  float: left;

  .logo-link {
    color: #000;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .logo {
    width: 40px;
  }

  .logo-text {
    margin-left: 10px;
    text-transform: uppercase;
    font-size: 25px;
    font-family: 'Archivo Black', sans-serif;
  }
}

.header-right {
  .bag-section {
    display: flex;
    align-items: center;

    .bag-image {
      width: 34px;
      cursor: pointer;
    }

    .bag-count {
      margin-left: 7px;
      line-height: 1em;
      padding: .25rem .5rem;
      border-radius: 10px 0 0 10px;
      color: #fff;
      background: #701aff;
    }
  }
}
</style>

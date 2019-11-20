<template>
  <footer>
    <div class="footer-main wrapper">
      <div class="footer-left">
        <img class="footer-image" src="https://i.ibb.co/r0smkLR/theyetee-com.png">
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-text">&copy;2020 Fat Cattiude, LLC. All rights reserved.</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  }
}
</script>


<style scoped lang="scss">
footer {
  background-image: url(../assets/triangle-bg.png);
  background-size: cover;
  text-align: left;
}

.footer-bottom {
  background-color: #000;
  color: #fff;
  padding: 16px 20px;
  font-family: 'Cousine', sans-serif;
  font-size: 15px;
}
</style>

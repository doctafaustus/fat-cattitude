<template>
  <footer>
    <div class="footer-main wrapper">
      <div class="footer-left">
        <img class="footer-image" src="https://i.ibb.co/r0smkLR/theyetee-com.png">
      </div>
      <div class="footer-right">
        <h1 class="section-title light">Keep up with Fat Cattitude!</h1>
        <div class="subtitle light">Sign up for our newsletter:</div>

        <form class="newsletter-form">
          <label class="newsletter-label">Your email</label>
          <div class="newsletter-input-container">
            <input class="newsletter-input" type="email" spellcheck="false">
          </div>
          <input class="newsletter-submit" type="submit" value="Subscribe">
        </form>

        <div class="subtitle light">Follow Us:</div>

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

.footer-main {
  display: flex;
  padding: 60px 20px;

  .footer-left {
    width: 40%;
    text-align: center;

    .footer-image {
      width: 300px;
    }
  }

  .footer-right {
    width: 60%;

    .section-title {
      margin-bottom: 40px;
    }

    .subtitle {
      font-size: 24px;
      margin-bottom: 24px;
    }

    .newsletter-form {
      margin-bottom: 40px;

      .newsletter-label {
        color: #fff;
        font-family: 'Cousine', sans-serif;
        font-size: 15px;
        position: relative;
        display: block;
        padding-left: 60px;
        pointer-events: none;

        &::before {
          content: '';
          display: block;
          width: 48px;
          height: 16px;
          border-left: solid 3px #fff;
          border-top: solid 3px #fff;
          border-radius: 5px 0 0 0;
          position: absolute;
          left: 0;
          top: 6px;
        }
      }

      .newsletter-input-container {
        border-left: solid 3px #fff;
        border-bottom: solid 3px #fff;
        border-radius: 0 0 0 5px;
        margin-bottom: 20px;

        .newsletter-input {
          padding: 8px 10px;
          width: 100%;
          font-size: 18px;
          border-radius: 5px;
          color: #05e8b5;
          outline: none;
          background-color: transparent;
          border: none;
        }
      }

      .newsletter-submit {
        border: none;
        cursor: pointer;
        color: #fff;
        background: linear-gradient(45deg,#05e8b5,#16bfff);
        box-shadow: 0 3px 10px rgba(31,30,48,0.15), inset 0 0 20px rgba(22,191,255,0);
        font-size: 20px;
        text-decoration: none;
        border-radius: 5px;
        padding: 16px 65px;
        transition: all .60s ease;

        &:hover {
          filter: hue-rotate(270deg);
        }
      }
    }
  }
}

.footer-bottom {
  background-color: #000;
  color: #fff;
  padding: 16px 20px;
  font-family: 'Cousine', sans-serif;
  font-size: 15px;
}
</style>

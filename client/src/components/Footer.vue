<template>
  <footer>
    <div class="footer-main wrapper">
      <div class="footer-left">
        <img class="footer-image" src="../assets/newsletter-cat.png">
      </div>
      <div class="footer-right">
        <h1 class="section-title light">Keep up with Fat Cattitude!</h1>
        <div class="subtitle">{{ subscribeMessage }}</div>

        <form :class="{ subscribed }" @submit.prevent="subscribe()" class="newsletter-form">
          <label class="newsletter-label">Your email</label>
          <div class="newsletter-input-container">
            <input v-model="email" class="newsletter-input" type="email" spellcheck="false">
          </div>
          <button class="newsletter-submit cta" type="submit">Subscribe</button>
        </form>

        <div class="subtitle light">Follow Us:</div>
        <div class="social-media">
          <a class="social-media-link" href="#"><Icon name="instagram"/></a>
          <a class="social-media-link" href="#"><Icon name="twitter"/></a>
          <a class="social-media-link" href="#"><Icon name="facebook"/></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-left">&copy;2020 Fat Cattiude, LLC. All rights reserved.</div>
      <div class="footer-bottom-right">meow@fatcattitude.com</div>
    </div>
  </footer>
</template>

<script>
import Icon from '@/components/Icons';

export default {
  name: 'Footer',
  components: {
    Icon
  },
  data () {
    return {
      subscribeMessage: 'Sign up for our newsletter:',
      email: null,
      subscribed: false,
      error: false,
    }
  },
  methods: {
    subscribe() {
      if (!this.email) return;

      fetch('http://localhost:8081/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email })
      })
      .then(response => response.json())
      .then(data => {
        console.log('api/newsletter response: \n', data);
        if (data.success) {
          this.subscribed = true;
          this.subscribeMessage = 'Subscribed!';
        } else this.error = true;
      });
    }
  }
}
</script>


<style lang="scss">
footer {
  background-image: url(../assets/triangle-bg.png);
  background-size: cover;
  text-align: left;
  box-sizing: border-box;
}

.footer-main {
  display: flex;
  align-items: center;
  padding: 60px 40px;

  .footer-left {
    width: 40%;
    text-align: center;

    .footer-image {
      width: 80%;
    }
  }

  .footer-right {
    width: 60%;
    padding-left: 40px;

    .section-title {
      margin-bottom: 40px;
      line-height: 56px;
    }

    .subtitle {
      font-size: 24px;
      margin-bottom: 24px;
    }

    .newsletter-form {
      margin-bottom: 40px;

      &.subscribed {
        display: none;
      }

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
          color: #6805fb;
          outline: none;
          background-color: transparent;
          border: none;
        }
      }

      .newsletter-submit {
        background: linear-gradient(45deg,#05e8b5,#16bfff);
        padding: 16px 75px;
      }
    }

    .social-media {
      .social-media-link {  
        display: inline-block;

        &:nth-child(2) {
          margin: 0 24px;
        }

        .icon {
          height: 50px;
          width: 50px;

          svg {
            fill: #fff;
          }
        }
      }
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  background-color: #000;
  color: #fff;
  padding: 16px 20px;
  font-family: 'Cousine', sans-serif;
  font-size: 15px;
}

@media (max-width: 834px) {
  .footer-main {
    padding: 20px;
    display: block;
    text-align: center;

    .footer-left,
    .footer-right {
      width: 100%;
    }

    .footer-left {
      margin-bottom: 20px;

      .footer-image {
        display: inline-block;
        max-width: 200px;
        width: 100%;
      }
    }

    .footer-right {
      padding-left: 0;

      .section-title {
        font-size: 26px;
        line-height: 30px;
        margin-bottom: 20px;
      }

      .newsletter-form {
        margin-bottom: 30px;

        .newsletter-label {
          text-align: left;
        }
      }

      .subtitle {
        margin-bottom: 20px;
        font-size: 22px;
      }

      .social-media .social-media-link .icon {
        width: 38px;
        height: 38px;
      }
    }
  }

  .footer-bottom {
    display: block;
    line-height: 12px;
    font-size: 11px;

    .footer-bottom-left {
      margin-bottom: 10px;
    }
  }
}



</style>

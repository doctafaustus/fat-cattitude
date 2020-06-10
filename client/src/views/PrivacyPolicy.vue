<template>
  <section class="privacy wrapper">
    <h1>Fat Cattitude Privacy Policy</h1>
    <p>Your privacy is important to us. It is Fat Cattitude's policy to respect your privacy regarding any information we may collect while operating our website. Accordingly, we have developed this privacy policy in order for you to understand how we collect, use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy below.</p>

    <h2>What data do we collect from you?</h2>
    <p>When you purchase from Fat Cattitude, we ask for information that will identify you as a customer. This information includes your name, email address and shipping/billing address. Your anonymous information (i.e. not personal data), collected using cookies and web beacons, is shared with a third-party analytics company to provide us with information about how visitors use our sites. We use this information to help us learn things like what pages are most attractive to our visitors, what products our users are interested in, and what kinds of services they like to see.</p>

    <h2>How do we use your personal data?</h2>
    <p>Your data is used for fulfillment purposes. Fat Cattitude never supplies your personal information to any third party for advertising or promotional purposes. If you owe money to Fat Cattitude and we are unable to collect it, we may need to give your contact information to a third party for collection purposes. We will occasionally use your email address to send you information regarding Fat Cattitude and the services we provide.</p>

    <h2>Is my information secure?</h2>
    <p>Your personal information is protected. We have taken steps to ensure our databases are secure, and are confident in our ability to keep your information safe.</p>

    <h2>How are cookies or localStorage used?</h2>
    <p>Fat Cattitudes stores cookie and localStorage objects on your computer to track you while you are on the site. The information in this cookie is a string of characters that is meaningless to everyone and everything except our server. No personal information or bid information is stored in the cookie. The information in the cookie can not be used by third parties to gain access to your account information.</p>

    <h2>How are payments handled?</h2>
    <p>We use a third party payment processor to process payments made to us. In connection with the processing of such payments, we do not retain any personally identifiable information or any financial information such as credit card numbers. Rather, all such information is provided directly to our third party processor, Stripe, whose use of your personal information is governed by their privacy policy, which may be viewed at <a href="https://stripe.com/us/privacy" target="_blank">https://stripe.com/us/privacy</a>.</p>

    <h2>Still have questions?</h2>
    <p>We realize everyone has a different view on privacy. We take your privacy very seriously. If you still have concerns, or are unclear about any aspect of our privacy policy, please contact us, and we will be happy to discuss the matter with you.</p>

    <p>We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. Fat Cattitude may change this privacy policy from time to time at Fat Cattitude's sole discretion.</p>
  </section>
</template>


<script>

export default {
  name: 'PrivacyPolicy',
  components: {
    
  },
  data () {
    return {
    }
  },
}
</script>


<style scoped lang="scss">
.privacy {
  padding: 80px;

  h1 {
    font-size: 38px;
    text-align: center;
    margin-bottom: 30px;

    & + p {
      text-align: center;
    }
  }

  h2 {
    font-size: 28px;
    text-align: left;
    margin-bottom: 12px;
  }

  p {
    text-align: left;
    margin-bottom: 30px;
    line-height: 20px;
  }

  @media (max-width: 834px) {
    padding: 20px;

    h1 {
      font-size: 32px;
      line-height: 36px;
      margin-bottom: 20px;

      & + p {
        text-align: left;
      }
    }
  }
}
</style>

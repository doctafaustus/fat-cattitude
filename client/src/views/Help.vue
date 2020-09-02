<template>
  <section class="help wrapper">
    <h1>Frequently Asked Questions</h1>
    <ul class="questions">
      <li class="question-container">
        <div class="question">Q: How is Fat Cattitude adapting to Covid-19?</div>
        <div class="answer">
          A: Fat Cattitude works with a fulfillment partner to print and ship our orders. We're in regular communication with them for the latest updates of what's going on. Our fulfillment partner is still operating and we're continuing to accept orders. Fulfillment and shipping will take longer but your order will reach you. Your support means a lot to us, especially during this time. Stay safe and take care of yourselves.
        </div>
      </li>

      <li class="question-container">
        <div class="question">Q: How long does it take to process and ship my order?</div>
        <div class="answer">
          A: The time it takes for you to receive your order will depend on your location, the item(s) ordered, and the shipping speed you selected. All shipments take place in two stages: processing and transit. At this time, processing takes anywhere from 2-7 business days. Shipping time is, on average, 3-4 business days after fulfillment.
        </div>
      </li>

      <li class="question-container">
        <div class="question">Q: How do I track my Fat Cattitude order status?</div>
        <div class="answer">
          A: An order confirmation page link will be sent to your email address after purchase. If you are having trouble locating that link, please contact us and we'll find it for you.
        </div>
      </li>

      <li class="question-container">
        <div class="question">Q: What methods of payment does Fat Cattitude accept?</div>
        <div class="answer">
          A: We accept all major credit cards through our Stripe-powered checkout. Gift cards and e-cards are not yet available.
        </div>
      </li>

      <li class="question-container">
        <div class="question">Q: Do you allow international shipments?</div>
        <div class="answer">
          A: Unfortunately not at this time. For now, we only ship to U.S. addresses.
        </div>
      </li>

      <li class="question-container">
        <div class="question">Q: I have a problem with my order. What can I do?</div>
        <div class="answer">
          A: For any issues, please send us an email at <span class="email">meow@fatcattitude.com</span> and we'll be happy to help!
        </div>
      </li>
    </ul>
  </section>
</template>


<script>

export default {
  name: 'Help',
  components: {
    
  },
  data () {
    return {
    }
  },
}
</script>


<style scoped lang="scss">
.help {
  padding: 80px;

  h1 {
    margin-bottom: 60px;
  }

  .questions {
    .question-container {
      display: block;
      margin-bottom: 30px;
      text-align: left;

      .question {
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 20px;
      }

      .answer {
        line-height: 20px;
      }
    }
  }

  .email {
    font-weight: bold;
  }

  @media (max-width: 834px) {
    padding: 20px;

    h1 {
      font-size: 32px;
      line-height: 36px;
      margin-bottom: 20px;
    }
  }
}
</style>

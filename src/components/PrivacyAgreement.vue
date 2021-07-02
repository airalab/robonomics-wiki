<template>
    <div v-if="!cookieAgreement" id="cookiePolicy">
        <p class="inline-block">By browsing this website, you are allowing cookies from third-party services. <g-link to="/privacy">Read Cookie Policy</g-link></p>
        <Button @onClick="cookieAgreementSet()" label="Accept" size="small"/>
    </div>
</template>

<style scoped>
    #cookiePolicy {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        width: 100%;
        font-size: 1rem;

        padding: 0.5rem;
        background-color: #000;
        color: #fff;

        text-align: center;
    }

    .button {
        margin-left: 1rem;
    }

    p {
        margin: 0;
    }
</style>


<script>

export default {
  components: {
    Button: () => import('~/components/Button.vue'),
  },

  data () {
      return {
        cookieAgreement: this.$cookies.get('WikiCookieAgreement')
        // cookieAgreement: localStorage.WikiCookieAgreement
      }
    },

  methods: {
    cookieAgreementSet(){
        // 365 day after, expire, '' current path , browser default
        this.$cookies.config(60 * 60 * 24 * 365,'');
        this.$cookies.set('WikiCookieAgreement', true);
        // localStorage.WikiCookieAgreement = true
        this.cookieAgreement = true
    }
  }

}
</script>
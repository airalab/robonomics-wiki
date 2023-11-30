<template>
  <Layout>

    <section class="privacy-policy container__narrow">
      <div class="layout__content">
        <h1>{{$t('Privacy Policy')}}</h1>

          <p class="privacy-policy__descr">{{$t('This Policy describes the information we collect from you, how we use that information and our legal basis for doing so. It also covers whether and how that information may be shared and your rights and choices regarding the information you provide to us.')}}</p>


          <div class="privacy-policy__wrapper">
            <h2 class="privacy-policy__subtitle">
              {{$t('Where are those annoying cookie consent pop-ups')}}?
            </h2>
            <p class="privacy-policy__descr">{{$t("We don't need cookie consent is needed because")}}:</p>
            <ul>
              <li>{{ $t('Tracking cookies are not used') }}</li>
              <li>{{ $t('The data is not used for any other purpose than analytics') }}</li>
              <li>{{ $t("Visitors aren't tracked across websites") }}</li>
              <li>{{$t('A user cannot be tracked across days within the same website')}}</li>
            </ul>
          </div>

          <div class="privacy-policy__wrapper">
            <h2 class="privacy-policy__subtitle">
              {{$t('What We Collect and Receive')}}
            </h2>
            <p class="privacy-policy__descr">{{$t('In order for us to provide you the best possible experience on our websites, we need to collect and process certain information. Depending on your use of the Services, that may include')}}:</p>

            <ul>
              <li> <b>{{ $t('Contact us via email') }}</b> — {{ $t('for example, when you submit our forms, send us questions or comments, or report a problem, we will collect your name, email address, message, etc. We use this data solely in connection with answering the queries we receive.') }}</li>
              <li>
                <b>{{ $t('Usage data') }}</b> — {{$t('when you visit our website, we will store: the URL from which you visited us from, web pages of our website you visit, the date and duration of your visit, your anonymized IP address, the device specifications (device type, operating system, screen resolution, language, country you are located in, and web browser type) you used during your visit, and')}} <g-link to="https://matomo.org/faq/general/faq_18254/">{{$t('other')}}</g-link> {{ $t('non-personal data. We process this usage data only on our server, not passing it to third-parties with') }}<g-link to="https://matomo.org/privacy-policy/#:~:text=usage%20data%20in-,Matomo%20Analytics,-for%20statistical%20purposes"> Matomo </g-link> {{$t('web analytics platform that gives us 100% data ownership. This analytics helps us to improve user experience with our website and to recognize and stop any misuse.')}}
              </li>
              <li>
                <b>{{ $t('Non-personalized cookies') }}</b>  — {{ $t('we use non-tracking cookies (small data files transferred onto computers or devices by sites) for record-keeping purposes and to enhance functionality on our website. You may deactivate or restrict the transmission of these cookies by changing the settings of your web browser or by opt-out on this page in the form below. Cookies that are already stored may be deleted at any time.') }}
              </li>
            </ul>
          </div>

          <div class="privacy-policy__wrapper">
            <h2 class="privacy-policy__subtitle">{{ $t('Opt-out of website tracking') }}</h2>
            <p class="privacy-police__descr">{{$t('You can opt out of being tracked by our Matomo Analytics instance below:')}}</p>

            <MatomoOptOutForm/>
          </div>

          <div class="privacy-policy__wrapper">
            <h2 class="privacy-policy__subtitle">{{ $t('Your Rights') }}</h2>
            <p class="privacy-police__descr">
              {{ $t('You have the right to be informed of Personal Data processed by Matomo, a right to rectification/correction, erasure and restriction of processing. You also have the right to ask from us a structured, common and machine-readable format of Personal Data you provided to us.') }}
            </p>
            <p class="privacy-police__descr">
              {{$t('We can only identify you via your email address and we can only adhere to your request and provide information if we have Personal Data about you through you having made contact with us directly and/or you using our site and/or service. We cannot provide, rectify or delete any data that we store on behalf of our users or customers.')}}
            </p>
            <p class="privacy-police__descr">
              {{$t('To exercise any of the rights mentioned in this Privacy Policy and/or in the event of questions or comments relating to the use of Personal Data you may contact us.')}}
            </p>
            <p class="privacy-police__descr">
              {{$t('In addition, you have the right to lodge a complaint with the data protection authority in your jurisdiction.')}}
            </p>
          </div>

          <div class="privacy-policy__wrapper">
            <h2 class="privacy-policy__subtitle">{{ $t('Retention of data') }}</h2>
            <p class="privacy-police__descr">
              {{ $t('We will retain your information as long as necessary to provide you with the services or as otherwise set forth in this Policy. We will also retain and use this information as necessary for the purposes set out in this Policy and to the extent necessary to comply with our legal obligations, resolve disputes, enforce our agreements and protect Robonomics Wiki legal rights.') }}
            </p>
            <p class="privacy-police__descr">{{ $t('We also collect and maintain aggregated, anonymized or pseudonymized information which we may retain indefinitely to protect the safety and security of our Site, improve our Services or comply with legal obligations') }}.</p>
          </div>


      </div>
    </section>
  </Layout>
</template>

<script>
export default {

  components: {
    MatomoOptOutForm: () => import('~/components/MatomoOptOutForm.vue')
  },

  metaInfo() {
    const title = this.$t("Privacy Policy");
    const descripton = this.$t("Learn Robonomics through tutorials and practically useful experimenting. This documentation is designed to help you connect robots or code dApps within Robonomics Network.");
    return {
      title: title,
      meta: [
        { name: "description", content: descripton },
        {
          property: "og:url",
          content: 'https://wiki.robonomics.network/'
        },
        {
          property: "og:title",
          content: title
        },
        {
          property: "og:description",
          content:  descripton
        },
        {
          property: "og:image",
          content: `https://wiki.robonomics.network${require('@images/wiki-og-image-index.png')}`
        },
        {
          property: "og:image:width",
          content: 1280
        },
        {
          property: "og:image:height",
          content: 765
        },
        {
          property: "og:url",
          content: "https://wiki.robonomics.network"
        },
        {
          property: "og:site_name",
          content: "WIKI ROBONOMICS"
        },

        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:title",
          content: title
        },
        {
          name: "twitter:description",
          content: descripton
        },
        {
          name: "twitter:image",
          content: `https://wiki.robonomics.network${require('@images/wiki-og-image-index.png')}`
        },
        {
          name: "twitter:site",
          content: "@AIRA_Robonomics"
        },
        {
          name: 'twitter:creator',
          content: "@AIRA_Robonomics"
        },
     ]
   }
  },

}
</script>

<style scoped>

  h1, h2 {
    text-align: left;
  }

  ul {
    padding-left: calc(var(--space) * 0.5);
  }

  /* .privacy-policy.container__narrow {
    max-width: 850px;
  } */


  .privacy-policy__subtitle {
    margin-bottom: calc(var(--space) * 0.5);
  }

</style>
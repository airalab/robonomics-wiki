<template>
  <div class="optout-form">
    <p>{{optDescr}}</p>
    <p>{{ optChoice }}</p>
      <label class="custom-checkbox">
        <input @change="check($event)" type="checkbox" v-model="optOut" name="optout" value="optout" class="custom-checkbox__field">
        <span class="custom-checkbox__content"></span>
        <strong>{{ optText }}</strong>
      </label>
  </div>
</template>

<script>
export default {

  data() {
    return {
      optOut: false,
      optText: 'You are currently opted out. Click here to opt in',
      optDescr: "You may choose not to have a unique web analytics cookie identification number assigned to your computer to avoid the aggregation and analysis of data collected on this website.",
      optChoice: "To make that choice, please click below to receive an opt-out cookie"
    }
  },

  methods: {
    setOptOutText() {
      if(this.$matomo) {
        if(this.$matomo && this.$matomo.isUserOptedOut()) {
        this.optText = this.$t('You are currently opted out. Click here to opt in.')
        this.optDescr = this.$t("Opt-out complete; your visits to this website will not be recorded by the Web Analytics tool. Note that if you clear your cookies, delete the opt-out cookie, or if you change computers or Web browsers, you will need to perform the opt-out procedure again.")
        this.optChoice = this.$t("Please click below to opt in:")
        } else {
          this.optText = this.$t('You are currently opted in. Click here to opt out.')
          this.optDescr = this.$t("You may choose not to have a unique web analytics cookie identification number assigned to your computer to avoid the aggregation and analysis of data collected on this website.")
          this.optChoice = this.$t("To make that choice, please click below to receive an opt-out cookie")
        }
      }
    },

    check() {
      if(this.$matomo && this.$matomo.isUserOptedOut()) {
        this.$matomo && this.$matomo.forgetUserOptOut();
      } else {
        this.$matomo && this.$matomo.optUserOut();
      }
      this.setOptOutText();
    }
  },

  async mounted() {

    setTimeout(async () => {
      console.log(this.$matomo && this.$matomo.isUserOptedOut())
      this.optOut = await this.$matomo && !this.$matomo.isUserOptedOut()
      this.setOptOutText();
    }, 300)

  }

}
</script>

<style scoped>

  .optout-form {
    padding:calc(var(--space) * 0.5);
    min-height: 220px;
    border: 2px solid var(--color-dark);
  }

  .custom-checkbox strong {
    padding-left: 40px;
    font-size: var(--base-font-size);
  }

  .custom-checkbox__field:checked + .custom-checkbox__content::before {
    background-color:  var(--color-blue);
  }

  
</style>
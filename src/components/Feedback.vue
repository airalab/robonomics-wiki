<template>
  <div class="feedback">
    <div class="feedback__info">
      <h3 class="feedback__title" @click="toggleResponse()" :class="{'feedback__title--withForm': currentResponse}"> Was this information helpful? </h3>
      <div class="feedback__options">
        <div @click="toggleResponse('smile')" class="feedback__icon " :class="{'feedback__icon--smile' : smile}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM164.1 325.5C158.3 318.8 148.2 318.1 141.5 323.9C134.8 329.7 134.1 339.8 139.9 346.5C162.1 372.1 200.9 400 255.1 400C311.1 400 349.8 372.1 372.1 346.5C377.9 339.8 377.2 329.7 370.5 323.9C363.8 318.1 353.7 318.8 347.9 325.5C329.9 346.2 299.4 368 255.1 368C212.6 368 182 346.2 164.1 325.5H164.1zM226.5 231.6C229.8 230.5 232 227.4 232 224C232 206.1 225.3 188.4 215.4 175.2C205.6 162.2 191.5 152 176 152C160.5 152 146.4 162.2 136.6 175.2C126.7 188.4 120 206.1 120 224C120 227.4 122.2 230.5 125.5 231.6C128.7 232.7 132.3 231.6 134.4 228.8L134.4 228.8L134.6 228.5C134.8 228.3 134.1 228 135.3 227.6C135.1 226.8 136.9 225.7 138.1 224.3C140.6 221.4 144.1 217.7 148.3 213.1C157.1 206.2 167.2 200 176 200C184.8 200 194.9 206.2 203.7 213.1C207.9 217.7 211.4 221.4 213.9 224.3C215.1 225.7 216 226.8 216.7 227.6C217 228 217.2 228.3 217.4 228.5L217.6 228.8L217.6 228.8C219.7 231.6 223.3 232.7 226.5 231.6V231.6zM377.6 228.8C379.7 231.6 383.3 232.7 386.5 231.6C389.8 230.5 392 227.4 392 224C392 206.1 385.3 188.4 375.4 175.2C365.6 162.2 351.5 152 336 152C320.5 152 306.4 162.2 296.6 175.2C286.7 188.4 280 206.1 280 224C280 227.4 282.2 230.5 285.5 231.6C288.7 232.7 292.3 231.6 294.4 228.8L294.4 228.8L294.6 228.5C294.8 228.3 294.1 228 295.3 227.6C295.1 226.8 296.9 225.7 298.1 224.3C300.6 221.4 304.1 217.7 308.3 213.1C317.1 206.2 327.2 200 336 200C344.8 200 354.9 206.2 363.7 213.1C367.9 217.7 371.4 221.4 373.9 224.3C375.1 225.7 376 226.8 376.7 227.6C377 228 377.2 228.3 377.4 228.5L377.6 228.8L377.6 228.8z"/>
          </svg>
        </div>
        <div @click="toggleResponse('rolling_eyes')" class="feedback__icon" :class="{'feedback__icon--rolling-eyes' : rolling_eyes}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM192 368C183.2 368 176 375.2 176 384C176 392.8 183.2 400 192 400H320C328.8 400 336 392.8 336 384C336 375.2 328.8 368 320 368H192zM186.2 165.6C189.8 170.8 192 177.1 192 184C192 201.7 177.7 216 160 216C142.3 216 128 201.7 128 184C128 177.1 130.2 170.8 133.8 165.6C111.5 175.6 96 197.1 96 224C96 259.3 124.7 288 160 288C195.3 288 224 259.3 224 224C224 197.1 208.5 175.6 186.2 165.6zM352 288C387.3 288 416 259.3 416 224C416 197.1 400.5 175.6 378.2 165.6C381.8 170.8 384 177.1 384 184C384 201.7 369.7 216 352 216C334.3 216 320 201.7 320 184C320 177.1 322.2 170.8 325.8 165.6C303.5 175.6 288 197.1 288 224C288 259.3 316.7 288 352 288z"/>
          </svg>
        </div>
        <div @click="toggleResponse('worry_grin')" class="feedback__icon " :class="{'feedback__icon--worry-grin' : worry_grin}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M464 128C437.5 128 416 107 416 81.01C416 76.01 417.8 69.74 420.6 62.87C420.9 62.17 421.2 61.46 421.6 60.74C430.5 40.51 448.1 15.86 457.6 3.282C460.8-1.093 467.2-1.094 470.4 3.281C483.4 20.65 512 61.02 512 81.01C512 102.7 497.1 120.8 476.8 126.3C472.7 127.4 468.4 128 464 128L464 128zM256 .0003C307.4 .0003 355.3 15.15 395.4 41.23C393.9 44.32 392.4 47.43 391.1 50.53C387.8 58.57 384 69.57 384 81.01C384 125.4 420.6 160 464 160C473.6 160 482.8 158.3 491.4 155.2C504.7 186.1 512 220.2 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0V.0003zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM226.5 231.6C229.8 230.5 232 227.4 232 224C232 206.1 225.3 188.4 215.4 175.2C205.6 162.2 191.5 152 176 152C160.5 152 146.4 162.2 136.6 175.2C126.7 188.4 120 206.1 120 224C120 227.4 122.2 230.5 125.5 231.6C128.7 232.7 132.3 231.6 134.4 228.8L134.4 228.8L134.6 228.5C134.8 228.3 134.1 228 135.3 227.6C135.1 226.8 136.9 225.7 138.1 224.3C140.6 221.4 144.1 217.7 148.3 213.1C157.1 206.2 167.2 200 176 200C184.8 200 194.9 206.2 203.7 213.1C207.9 217.7 211.4 221.4 213.9 224.3C215.1 225.7 216 226.8 216.7 227.6C217 228 217.2 228.3 217.4 228.5L217.6 228.8L217.6 228.8C219.7 231.6 223.3 232.7 226.5 231.6V231.6zM377.6 228.8C379.7 231.6 383.3 232.7 386.5 231.6C389.8 230.5 392 227.4 392 224C392 206.1 385.3 188.4 375.4 175.2C365.6 162.2 351.5 152 336 152C320.5 152 306.4 162.2 296.6 175.2C286.7 188.4 280 206.1 280 224C280 227.4 282.2 230.5 285.5 231.6C288.7 232.7 292.3 231.6 294.4 228.8L294.4 228.8L294.6 228.5C294.8 228.3 294.1 228 295.3 227.6C295.1 226.8 296.9 225.7 298.1 224.3C300.6 221.4 304.1 217.7 308.3 213.1C317.1 206.2 327.2 200 336 200C344.8 200 354.9 206.2 363.7 213.1C367.9 217.7 371.4 221.4 373.9 224.3C375.1 225.7 376 226.8 376.7 227.6C377 228 377.2 228.3 377.4 228.5L377.6 228.8L377.6 228.8z"/>
          </svg>
        </div>
      </div>
    </div>
    <FormForGoogleSheets v-if="currentResponse" :response="currentResponse"/>
  </div>
</template>

<script>
export default {

  components: { 
    FormForGoogleSheets: () => import("~/components/FormForGoogleSheets.vue"),
  },

  data() {
    return {
        smile: false,
        rolling_eyes: false,
        worry_grin: false,
        currentResponse: '',
    };
  },
  methods: {
      toggleResponse(response) {
        switch (response) {
          case "smile":
              this.rolling_eyes = false;
              this.worry_grin = false;
              this.currentResponse = !this.smile ? 'smile' : '';
              return this.smile = !this.smile;
          case "rolling_eyes":
              this.smile = false;
              this.worry_grin = false;
              this.currentResponse = !this.rolling_eyes ? 'rolling_eyes' : '';
              return this.rolling_eyes = !this.rolling_eyes;
          case "worry_grin":
              this.rolling_eyes = false;
              this.smile = false;
              this.currentResponse = !this.worry_grin ? 'worry_grin' : '';
              return this.worry_grin = !this.worry_grin;
          default: 
            return this.currentResponse = !this.currentResponse ? 'no_reaction' : '';
        }
      }
  },
}
</script>

<style scoped>

  .feedback {
    margin: 3rem 0;
  }

  .feedback__info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .feedback__title {
    margin-bottom: 0;
    margin-right: 20px;
    font-weight: 600;
    color: var(--link-color);
    cursor: pointer;
  }

  .feedback__title--withForm {
    color: var(--text-color);
  }

  .feedback__options {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .feedback__icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

   .feedback__icon:not(:last-child) {
    margin-right: 20px;
  }

  .feedback__icon svg path {
    fill: var(--link-color);
    transition: fill 0.2s ease-in-out, filter 0.2s ease-in-out;
  }

    .feedback__icon:hover svg path  {
      filter: saturate(4) brightness(1);
    }

  .feedback__icon--smile svg path {
    fill: var(--color-emoji-green);
  }

  .feedback__icon--rolling-eyes svg path {
    fill: var(--color-emoji-pink);
  }

  .feedback__icon--worry-grin svg path {
    fill: var(--color-emoji-orange);
  }

  @media screen and (max-width: 900px)  {
    .feedback__info {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 10px;
    }

    .feedback__title {
      font-size: 1.2rem;
      margin-right: 0;
      margin-bottom: 10px;
    }

  }

</style>
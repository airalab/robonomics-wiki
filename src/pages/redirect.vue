<template>
    <layout>
        <div class="redirect"> <span>{{ $t('This page has moved to a') }} </span> <a :href="redirect">{{ redirect }}</a> <span>{{$t('Automatic redirecting...')}}</span> </div>
    </layout>
</template>

<script>
export default {
  metaInfo() {
        return {
            meta: [
                {
                    'http-equiv': 'refresh',
                    content: `0; url="${this.redirect}"`
                }
            ],

            link: () => [
                {
                    rel: 'canonical',
                    href: `${this.redirect}`,
                    id: 'canonical',
                },
            ],
        }
  },

  computed: {
      redirect(){
          if(this.$context.redirect){
              return this.$context.redirect
          }
      }
  }
}
</script>

<style scoped>
    .redirect {
        min-height: 100vh;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-weight: 600;
    }
</style>
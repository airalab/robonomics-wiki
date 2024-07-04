<template>
    <video ref="video" controls muted :poster="cover ? require(`!!assets-loader!@imagesMarkdown/${cover}`).src : ''" playsinline v-bind="$attrs" v-if="videos && startURL || videos && videos[0].src.includes('static') ">
      <template v-for="video in videos">
        <source v-if="!video.src.includes('static')" :src="startURL + video.src + '#t=0.001'" :type="`video/${video.type}`" :key="video.id" />
        <source v-else :src="video.src + '#t=0.001'" :type="`video/${video.type}`" :key="video.id" />
    </template>
    </video>
    <div class="video-loading" v-else>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#5D9DEB" stroke="#5D9DEB" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#5D9DEB" stroke="#5D9DEB" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#5D9DEB" stroke="#5D9DEB" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle>
      </svg>
      <span>VIDEO LOADING...</span>
    </div>
</template>

<script>
import config from '../../data/video_config.yaml';  
export default {
  
  name: 'RoboWikiVideo',

  props: {
    videos: {
      type: Array,
      default: null,
      required: true
    },

    cover: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      offsetTop: 0,
      showDisclaimer: false,
      videoLinks: [],
      startURL: null,
    }
  },

  watch: {
    offsetTop (val) {
      this.toggleAutoplay()
    }
  },

  methods: {
    handelScroll() {
      this.offsetTop = document.querySelector('.custom-scroll').pageYOffset || document.querySelector('.custom-scroll').scrollTop
    },

    toggleAutoplay() {
      const video = this.$refs.video;
      video.muted = true;
        let playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then((_) => {
            let observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  video.pause();

                  if(entry.isIntersecting) {
                    if (entry.intersectionRatio !== 1 && !video.paused) {
                        video.pause();
                    } else  {
                        video.play();
                    } 
                  }
      
                });
              },
              {threshold: 0.8}
            );
            observer.observe(video);
        });
      }
    },

    convertVideoLinks() {
      this.videos.map(vid => {
        config.gateways.map(v => {
          this.videoLinks.push(v + vid.src)
        })
      })
    },

    async checkVideos() {
      for (let i = 0; i < this.videoLinks.length; i++) {
        if (!this.startURL) {
          try {
            const res =  await fetch(this.videoLinks[i])
            if(res.ok) {
              const url = res.url;
              this.startURL = url.replace(url.substring(url.lastIndexOf('/') + 1), '');
            }
          } catch (err) {
            // console.log(err, ' => video error');
          }
        }
      }
    }
  },

  created() {
    this.convertVideoLinks();
    this.checkVideos();
  },

  
  mounted() {

    if(this.$refs.video && this.$refs.video.getAttribute('autoplay')) {
      document.querySelectorAll('.all-content ').forEach(item => {
        item.addEventListener('scroll', this.handelScroll)
      })
    };

    setTimeout(() => {
      if(!this.startURL) {
        this.startURL = config.gateways[0];
      }
    }, 10000);
  },

  beforeDestroy () {
    if(this.$refs.video && this.$refs.video.getAttribute('autoplay')) {
      document.querySelectorAll('.all-content ').forEach(item => {
        item.removeEventListener('scroll', this.handelScroll)
      })
    }

  },

}
</script>

<style scoped>
  video {
    
    width: 100%;
    display: block;
    margin: 0 auto;
    margin-bottom: var(--space);
  }

  .box {
    height: 0;
    width: 0;
  }

  .video-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: var(--space);
  }


  .video-loading svg {
    width: 20%;
  }

  .video-loading span {
    font-size: 12px;
    font-family: var(--font-family-code);
    text-transform: lowercase;
    animation: blink 0.8s ease-in-out infinite;
  }

  @keyframes blink {
    5% {
      opacity: 1;
    }
    30% {
      opacity: 0.3;
    }
    65% {
      opacity: 1;
    }
  }
</style>
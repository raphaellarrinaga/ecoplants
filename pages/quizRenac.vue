<template>
  <div class="content">
    <div class="page">
      <main>
        <div v-if="plants.length">
          <agile
            ref="carousel"
            @after-change="afterChangeCustomEvent($event)"
            :dots="false"
            :swipeDistance="100"
            :infinite="true">
            <template slot="caption">
              <button class="button-quiz-reset button-quiz" @click="resetSlide">{{ (currentSlide + 1) + "/" + plants.length }}</button>
              <button
                @click="slidesJump"
                class="quiz-item__slide-jump button-quiz">
                +10
              </button>
            </template>
            <div
              v-for="item in plants"
              class="slide quiz-item"
              :key="item.id">
             <button
                @click="toggleName"
                class="quiz-item__solution-toggle button-quiz">
                👀
              </button>
              <div class="quiz-item__front">
                <button
                  @click="toggleImage"
                  class="quiz-item__image-toggle">
                  Change image
                </button>
                <img
                  v-for="(image, index) in item.images"
                  class="quiz-item__image"
                  :class="{ 'is-active': index === 0 }"
                  :src="image"
                  :key="image.id">
              </div>
              <div class="quiz-item__back">
                <h1 class="quiz-item__botanical">{{ item.botanicalName }} ({{ currentSlide + 1 }}/{{ plants.length }})</h1>
                <h2 class="quiz-item__familiar">{{ item.familiarName }}</h2>
                <div class="quiz-item__metas">
                  <p class="quiz-item__type">
                    <span class="quiz-item__label">Type: </span>{{ item.type }}<span v-if="item.propagation"> ({{ item.propagation }})</span></p>
                  <p class="quiz-item__season">
                    <span class="quiz-item__label">Saison: </span>{{ item.season }}<span v-if="item.propagation"> ({{ item.propagation }})</span></p>
                  <p class="quiz-item__height">
                    <span class="quiz-item__label">Hauteur: </span>{{ item.height }}cm</p>
                  <p class="quiz-item__ground">
                    <span class="quiz-item__label">Sol: </span>{{ item.ground }}</p>
                  <p class="quiz-item__exposition">
                    <span class="quiz-item__label">Exposition: </span>{{ item.exposition }}</p>
                  <p class="quiz-item__usage">
                    <span class="quiz-item__label">Intérêt: </span>{{ item.usage }}</p>
                  <p class="quiz-item__density">
                    <span class="quiz-item__label">Densité: </span>{{ item.density }}</p>
                  <p class="quiz-item__bloom">
                    <span class="quiz-item__label">Floraison: </span>{{ item.bloom }}</p>
                </div>
              </div>
            </div>
          </agile>
        </div>
        <div v-else>
          <p>No plants</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>

import { VueAgile } from 'vue-agile'
const axios = require('axios')

export default {
  name: 'Quiz',
  data () {
    return {
      currentSlide: null,
      plants: [],
    }
  },
  async asyncData () {
    const plants = await axios.get('/quizRenacData.json').then(res => res.data)
    return { plants }
  },
  components: {
    agile: VueAgile
  },
  methods: {
    toggleName: function(el) {
      el.target.closest(".quiz-item").classList.toggle('is-revealed')
    },
    toggleImage: function(el) {
      let parent = el.target.closest(".quiz-item__front")
      let images = parent.querySelectorAll(".quiz-item__image")
      let activeItem = parent.querySelectorAll(".quiz-item__image.is-active")

      if (images.length > 1) {
        for (let index = 0; index < images.length; index++) {
          const element = images[index];

          if (element.classList.contains('is-active') && index < images.length - 1) {
            element.nextElementSibling.classList.add('is-active')
            element.classList.remove('is-active')
            return false
          } else if (element.classList.contains('is-active') && index == images.length - 1) {
            images[0].classList.add('is-active')
            element.classList.remove('is-active')
            return false
          }
        }
      }
    },
    afterChangeCustomEvent: function(e) {
      // Set current slide number.
      this.currentSlide = e.currentSlide

      // Hide solution when switching panel.
      let elems = document.querySelectorAll(".quiz-item");
      [].forEach.call(elems, function(el) {
          el.classList.remove("is-revealed");
      });

      // Load hidden image on the current item.
      // @todo fire after class has been set.
      // setTimeout(function() {
      //   let activeElem = document.getElementsByClassName("agile__slide--active")[0]
      //   let media = activeElem.querySelectorAll('.quiz-item__image');
      //   [...media].forEach(m => this.$lazyLoad(m))
      // }, 200);
    },
    resetSlide: function(e) {
      this.$refs.carousel.goTo(0)

      // this.items.forEach(el => {
      //   console.log(el.images.val);
      // })
    },
    slidesJump: function(e) {
      const total = this.plants.length;

      if (this.currentSlide + 10 <= total) {
        this.$refs.carousel.goTo(this.currentSlide + 10)
      } else {
        this.$refs.carousel.goTo(0)
      }
    },
  }
}
</script>

<style lang="scss">
html {
  background-color: #f8f9fd;
}

.button-quiz {
  box-sizing: border-box;
  background: #fefefe;
  border: 1px solid #dee1ed;
  border-left: none;
  padding-left: .5rem;
  padding-right: .5rem;
  cursor: pointer;

  &:active,
  &:focus {
    background: #fefefe;
  }

  &:hover {
    background: darken(#fefefe, 6%);
  }
}

.quiz-item {
  position: relative;
  height: 60vh;
  width: 100vw;
}

.quiz-item__front {
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 0;
}

.quiz-item__image-toggle {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 4;
  opacity: 0;
}

.quiz-item__image {
  pointer-events: none;
  user-select: none;
  // object-fit: contain;
  object-fit: cover;
  height: 100%;
  width: 100%;

  // opacity: 0;
  display: none;
  &.is-active {
    display: block;
  }
}

.quiz-item__back {
  display: block;
  background: #f5f6fb;
  padding: 1rem;
  overflow: hidden;

  opacity: 0;
  visibility: hidden;
  position: absolute;
  bottom: 0;
  min-height: 50%;
  left: .75rem;
  right: .75rem;
  bottom: .75rem;
  border-radius: 4px;
  z-index: 1;
  transition: none;

  .is-revealed & {
    opacity: 1;
    visibility: visible;
  }
}

.quiz-item__botanical {
  font-size: 1.25rem;
  line-height: 1.2;
  margin-bottom: .25em;
  margin-top: 0;
}

.quiz-item__familiar {
  color: #4f4f4f;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 1.2em;
  margin-top: 0;
}

.quiz-item__metas {
  p {
    margin: 0;
  }
}

.quiz-item__label {
  font-weight: bold;
}

// .quiz-item__cycle {
//   color: #333;
//   font-size: 1rem;
//   // font-weight: bold;
//   line-height: 1.2;
//   margin: 0;
// }

.quiz-item__solution-toggle {
  font-size: 1.5rem;
  height: 70px;
  left: 0;
  border-left: 1px solid #dee1ed;
  // border-right: 1px solid #dee1ed;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  position: absolute;
  top: -80px;
  width: calc(25%);
}

.agile__list {
  padding-top: 100px;
}

.agile__caption {
  margin: 0;
  position: absolute;
  top: 20px;
  height: 70px;
  left: calc(25%);
  width: 35%;
}

.button-quiz-reset {
  position: absolute;
  height: 100%;
  width: 60%;
}

.quiz-item__slide-jump {
  position: absolute;
  top: 0;
  left: 60%;
  height: 70px;
  width: 40%;
}

.agile__actions {
  height: 70px;
  left: 60%;
  position: absolute;
  top: 20px;
  width: 40%;
}

.agile__nav-button {
  box-sizing: border-box;
  background: #fefefe;
  cursor: pointer;
  border-right: 1px solid #dee1ed;
  border: 1px solid #dee1ed;
  border-left: none;
  width: 50%;

  &--next {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  &:active,
  &:focus {
    background: #fefefe;
  }

  &:hover {
    background: darken(#fefefe, 6%);
  }
}
</style>

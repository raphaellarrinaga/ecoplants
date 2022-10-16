<template>
  <div class="content">
    <div class="page">
      <main>
        <div v-if="plants.length" class="gallery">
          <div
            v-for="(item, index) in plants"
            class="gallery-item"
            :key="item.id">
            <button
              @click="toggleName"
              class="quiz-item__solution-toggle button-quiz">
              👀
            </button>
            <div class="gallery-item__infos">
              <!-- <p class="gallery-item__number">{{ index }}</p> -->
              <h1 class="quiz-item__botanical">{{ item.botanicalName }}</h1>
              <h2 class="quiz-item__familiar">{{ item.familiarName }}</h2>
              <div class="quiz-item__metas">
                <p class="quiz-item__type">
                  <span class="quiz-item__label">Type: </span>{{ item.type }}<span v-if="item.propagation"> ({{ item.propagation }})</span></p>
                <p class="quiz-item__height">
                  <span class="quiz-item__label">Hauteur: </span>{{ item.height }}cm</p>
                <p class="quiz-item__ground">
                  <span class="quiz-item__label">Sol: </span>{{ item.ground }}</p>
                <p class="quiz-item__exposition">
                  <span class="quiz-item__label">Exposition: </span>{{ item.exposition }}</p>
                <p class="quiz-item__usage">
                  <span class="quiz-item__label">Intérêt: </span>{{ item.usage }}</p>
              </div>
            </div>
            <img
              class="gallery-item__image"
              :src="item.images[0]">
          </div>
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
    const plants = await axios.get('/quizRenacleData.json').then(res => res.data)
    return { plants }
  },
  components: {
    agile: VueAgile
  },
  methods: {
    toggleName: function(el) {
      el.target.closest(".gallery-item").classList.toggle('is-revealed')
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
    },
    resetSlide: function(e) {
      this.$refs.carousel.goTo(0)
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

.quiz-item__solution-toggle {
  border: 1px solid #dee1ed;
  border-radius: 6px;
  font-size: 1rem;
  right: .2rem;
  line-height: 1;
  padding: .75rem;
  position: absolute;
  top: .2rem;
  opacity: .5;
  z-index: 2;

  &:hover {
    opacity: 1;
  }
}

.gallery {
  margin-top: .5rem;

  @media screen and (min-width: 460px) {
    display: grid;
    grid-auto-rows: 200px;
    grid-template-columns: 1fr 1fr 1fr;
    gap: .5rem;
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 240px;
  }

  @media screen and (min-width: 1400px) {
    // grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: 340px;
  }

}

.gallery-item {
  position: relative;

  @media screen and (max-width: 459px) {
    margin-bottom: .5rem;
    height: 200px;
  }
}

.gallery-item__number {
}

.gallery-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-item__infos {
  display: block;
  background: #f5f6fb;
  padding: 1rem;
  overflow: hidden;

  opacity: 0;
  visibility: hidden;
  position: absolute;
  min-height: 50%;
  left: .75rem;
  right: .75rem;
  top: .75rem;
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
  font-size: 1.2rem;
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
    font-size: .8rem;
    margin: 0;
  }
}

.quiz-item__label {
  font-weight: bold;
}
</style>

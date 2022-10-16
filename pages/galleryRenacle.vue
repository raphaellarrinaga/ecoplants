<template>
  <div class="content">
    <div class="page">
      <main>
        <div v-if="plants.length" class="gallery">
            <!-- v-for="(item, index) in plants" -->
          <div
            v-for="item in plants"
            class="gallery-item"
            :key="item.id">
            <button
              @click="toggleName"
              class="gallery-item__solution-toggle button-gallery">
              👀
            </button>
            <div class="gallery-item__infos">
              <!-- <p class="gallery-item__number">{{ index }}</p> -->
              <h1 class="gallery-item__botanical">{{ item.botanicalName }}</h1>
              <h2 class="gallery-item__familiar">{{ item.familiarName }}</h2>
              <div class="gallery-item__metas">
                <p class="gallery-item__type">
                  <span class="gallery-item__label">Type: </span>{{ item.type }}<span v-if="item.propagation"> ({{ item.propagation }})</span></p>
                <p class="gallery-item__height">
                  <span class="gallery-item__label">Hauteur: </span>{{ item.height }}cm</p>
                <p class="gallery-item__ground">
                  <span class="gallery-item__label">Sol: </span>{{ item.ground }}</p>
                <p class="gallery-item__exposition">
                  <span class="gallery-item__label">Exposition: </span>{{ item.exposition }}</p>
                <p class="gallery-item__usage">
                  <span class="gallery-item__label">Intérêt: </span>{{ item.usage }}</p>
              </div>
            </div>
            <div class="gallery-item__front">
              <button
                @click="toggleImage"
                class="gallery-item__image-toggle">
                Change image
              </button>
              <img
                v-for="(image, index) in item.images"
                class="gallery-item__image"
                :class="{ 'is-active': index === 0 }"
                :src="image"
                :key="image.id">
            </div>
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
  name: 'Gallery',
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
      let parent = el.target.closest(".gallery-item__front")
      let images = parent.querySelectorAll(".gallery-item__image")
      let activeItem = parent.querySelectorAll(".gallery-item__image.is-active")

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
  }
}
</script>

<style lang="scss">
html {
  background-color: #f8f9fd;
}

.button-gallery {
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

.gallery-item__solution-toggle {
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
    grid-auto-rows: 220px;
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

.gallery-item__front {
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 0;
}

.gallery-item__image-toggle {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 4;
  opacity: 0;

  &:hover {
    cursor: pointer;
  }
}

.gallery-item__image {
  // width: 100%;
  // height: 100%;
  // object-fit: cover;

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

.gallery-item__infos {
  display: block;
  background: #f5f6fb;
  padding: 1rem;
  // overflow: hidden;
  overflow: scroll;

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

.gallery-item__botanical {
  font-size: 1.2rem;
  line-height: 1.2;
  margin-bottom: .25em;
  margin-top: 0;
}

.gallery-item__familiar {
  color: #4f4f4f;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 1.2em;
  margin-top: 0;
}

.gallery-item__metas {
  p {
    font-size: .7rem;
    margin: 0;
  }
}

.gallery-item__label {
  font-weight: bold;
}
</style>

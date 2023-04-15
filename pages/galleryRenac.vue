<template>
  <div class="content">
    <div class="page">
      <main>
        <header class="page-header">
          <div class="gallery-nav">
            <button class="gallery-nav__button" @click="setAll">Tout</button>
            <button class="gallery-nav__button" @click="setBfg">BFG</button>
            <button class="gallery-nav__button" @click="setVivaces">Vivaces</button>
            <button class="gallery-nav__button" @click="setAromatiques">Aro</button>
          </div>
          <MainNavigation/>
        </header>
        <div v-if="plants.length" class="gallery">
          <button
            @click="randomize"
            class="random-button">
            🎁
          </button>
          <button
            @click="toggleNames"
            class="toggle-names-button">
            👀
          </button>
          <div
            v-for="(item, index) in plants"
            class="gallery-item"
            :key="item.id">
            <button
              @click="toggleName"
              class="gallery-item__solution-toggle button-gallery">
              👀
            </button>
            <div class="gallery-item__infos">
              <h1 class="gallery-item__botanical">{{ item.botanicalName }} ({{ index + 1 }}/{{ plants.length }})</h1>
              <h2 class="gallery-item__familiar">{{ item.familiarName }}</h2>
              <div class="gallery-item__metas">
                <p class="gallery-item__type">
                  <span class="gallery-item__label">Type: </span>{{ item.type }}<span v-if="item.propagation"> ({{ item.propagation }})</span></p>
                <p class="gallery-item__season">
                  <span class="gallery-item__label">Saison: </span>{{ item.season }}<span v-if="item.propagation"> ({{ item.propagation }})</span></p>
                <p class="gallery-item__height">
                  <span class="gallery-item__label">Hauteur: </span>{{ item.height }}cm</p>
                <p class="gallery-item__ground">
                  <span class="gallery-item__label">Sol: </span>{{ item.ground }}</p>
                <p class="gallery-item__exposition">
                  <span class="gallery-item__label">Exposition: </span>{{ item.exposition }}</p>
                <p class="gallery-item__usage">
                  <span class="gallery-item__label">Intérêt: </span>{{ item.usage }}</p>
                <p class="gallery-item__density">
                  <span class="gallery-item__label">Densité: </span>{{ item.density }}</p>
                <p class="gallery-item__bloom">
                  <span class="gallery-item__label">Floraison: </span>{{ item.bloom }}</p>
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
      plants: [],
      allPlants: [],
      bfg: [],
      vivaces: [],
      aromatiques: [],
      solutionShown: false,
    }
  },
  async asyncData () {
    const allPlants = await axios.get('/quizRenacData.json').then(res => res.data)
    const bfg = await axios.get('/quizRenacData-bfg.json').then(res => res.data)
    const vivaces = await axios.get('/quizRenacData-vivaces.json').then(res => res.data)
    const aromatiques = await axios.get('/quizRenacData-aromatiques.json').then(res => res.data)
    const plants = allPlants
    return { plants, bfg, vivaces, aromatiques, allPlants }
  },
  components: {
    agile: VueAgile
  },
  methods: {
    setAll: function() {
      this.plants = this.allPlants;
    },
    setBfg: function() {
      this.plants = this.bfg;
    },
    setVivaces: function() {
      this.plants = this.vivaces;
    },
    setAromatiques: function() {
      this.plants = this.aromatiques;
    },
    randomize: function() {
      return this.plants.sort(function(){return 0.5 - Math.random()});
    },
    toggleNames: function() {
      let elems = document.querySelectorAll('.gallery-item');

      if (this.solutionShown) {
        this.solutionShown = false;

        elems.forEach(function (elem) {
          elem.classList.remove('is-revealed');
        });
      } else {
        this.solutionShown = true;

        elems.forEach(function (elem) {
          elem.classList.add('is-revealed');
        });
      }

    },
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

.page-header {
  display: flex;
  justify-content: space-between;
  margin: 0;
  align-items: baseline;
}

.toggle-names-button,
.random-button {
  background-color: rgba(#f8f9fd, .8);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  padding: 1rem;
  position: fixed;
  z-index: 3;

  &:hover {
    background-color: #f8f9fd;
  }
}

.random-button {
  bottom: 1.5rem;
  right: 1rem;
}

.toggle-names-button {
  bottom: 1.5rem;
  right: 5rem;
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
  margin-bottom: .5rem;
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 380px;
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
  pointer-events: none;
  user-select: none;
  object-fit: cover;
  height: 100%;
  width: 100%;

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

.gallery-nav {
  margin: .5rem 0 0;
}

.gallery-nav__button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  margin-right: .5rem;

  &:hover {
    text-decoration: underline;
  }
}
</style>

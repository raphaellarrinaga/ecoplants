<template>
  <div class="content">
    <div class="page">
      <main>
        <div v-if="items.length">
          <agile
            @after-change="afterChangeCustomEvent($event)"
            :dots="false"
            :swipeDistance="300"
            :infinite="true">
            <template slot="caption">{{ currentSlide + "/" + items.length }}</template>
            <div
              v-for="item in items"
              :key="item.id"
              class="slide quiz-item">
              <button
                @click="toggleName"
                class="quiz-item__solution-toggle">
                Reveal
              </button>
              <div class="quiz-item__front">
                <img
                  :src="item.imageUrl"
                  class="quiz-item__image"
                  v-if="item.imageUrl.length">
              </div>
              <div class="quiz-item__back">
                <h1 class="quiz-item__botanical">{{ item.botanicalName }}</h1>
                <h2 class="quiz-item__familiar">{{ item.familiarName }}</h2>
                <p class="quiz-item__cycle">{{ item.cycle }}</p>
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

export default {
  name: 'Quiz',
  data () {
    return {
      currentSlide: null,
      items: [
        {
          "botanicalName":"Ageratum houstonianum",
          "familiarName": "Agérate",
          "cycle": "Annuelle",
          "imageUrl": "https://www.mooiemoestuin.nl/wp-content/uploads/Ageratum-houstonianum-Blue-Mink-4.jpg"
          },
        {
          "botanicalName":"Begonia semperflorens",
          "familiarName": "Bégonia annuel",
          "cycle": "Annuelle",
          "imageUrl": "https://www.graines-semences.com/1056/begonia-semperflorens-varie.jpg"
          },
        {
          "botanicalName":"Cineraria maritima",
          "familiarName": "Cinéraire maritime, Séneçon cinéraire",
          "cycle": "Annuelle",
          "imageUrl": "https://horomidis.gr/wp-content/uploads/sites/default/files/styles/plants_full/public/plants/cinerariamaritima.jpg"
          },
        {
          "botanicalName":"Cosmos bipinnatus",
          "familiarName": "Cosmos bipenné",
          "cycle": "Annuelle",
          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/db/Cosmos_bipinnatus4.jpg"
          },
        {
          "botanicalName":"Gaura lindheimeri",
          "familiarName": "Gaura de Lindheimer",
          "cycle": "Annuelle",
          "imageUrl": "https://www.fleurir-son-jardin.fr/wp-content/uploads/GAUR006-GAURA-lindheimeri-Geyser-blanc-2-e1550560729834.jpg"
          },
        {
          "botanicalName":"Helianthus annuus",
          "familiarName": "Tournesol",
          "cycle": "Annuelle",
          "imageUrl": "https://jardinage.lemonde.fr/images/dossiers/historique/tournesol-175148.jpg"
        }
      ],
    }
  },
  components: {
    agile: VueAgile
  },
  methods: {
    toggleName: function(el) {
      el.target.closest(".quiz-item").classList.toggle('is-revealed')
    },
    afterChangeCustomEvent: function(e) {
      // Set current slide number.
      this.currentSlide = e.currentSlide

      // Hide solution when switching panel.
      let elems = document.querySelectorAll(".quiz-item");
      [].forEach.call(elems, function(el) {
          el.classList.remove("is-revealed");
      });
    }
  },
}
</script>

<style lang="scss">
.quiz-item {
  position: relative;
  height: 70vh;
  width: 100vw;
}

.quiz-item__front {
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 0;
}

.quiz-item__image {
  pointer-events: none;
  user-select: none;
  // object-fit: contain;
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.quiz-item__back {
  display: block;
  background: white;
  padding: 2rem;
  overflow: hidden;

  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  transition: none;

  .is-revealed & {
    opacity: 1;
    visibility: visible;
  }
}

.quiz-item__botanical {
  font-size: 1.75rem;
  line-height: 1.2;
  margin-bottom: .75em;
  margin-top: 0;
}

.quiz-item__familiar {
  color: rgb(28, 80, 136);
  font-size: 1.5rem;
  line-height: 1.2;
  margin-bottom: 1.2em;
  margin-top: 0;
}

.quiz-item__cycle {
  color: #333;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.2;
  margin-top: 0;
}

.quiz-item__solution-toggle {
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  width: 50%;
  height: 70px;
  z-index: 3;

  box-sizing: border-box;
  background: #e7e7e7;
  border: 3px solid darken(#e7e7e7, 10%);
  border-radius: 3px;
  cursor: pointer;
  margin-right: .5rem;

  &:hover {
    background: darken(#e7e7e7, 5%);
  }
}

.agile {
}

.agile__list {
  padding-top: 100px;
}

.agile__actions {
  position: absolute;
  top: 20px;
  height: 70px;
  right: 0;
  width: 50%;
}

.agile__nav-button {
  box-sizing: border-box;
  background: #e7e7e7;
  border: 3px solid darken(#e7e7e7, 10%);
  border-radius: 3px;
  cursor: pointer;
  margin-left: .5rem;
  width: 50%;

  &:hover {
    background: darken(#e7e7e7, 5%);
  }
}

.agile__caption {
  margin-top: 1rem;
}
</style>

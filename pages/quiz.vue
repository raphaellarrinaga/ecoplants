<template>
  <div class="content">
    <div class="page">
      <header class="page-header">
        <h1 class="page-title">Ecoplants</h1>
      </header>
      <main>
        <div v-if="items.length">
          <agile
            :swipeDistance="300"
            :infinite="true">
            <div
              v-for="item in items"
              :key="item.id"
              class="slide quiz-item">
              <button
                @click="toggleName"
                class="quiz-item__solution">
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
      items: [
        {
          "botanicalName":"Ageratum houstonianum",
          "familiarName": "Agérate",
          "Cycle": "Annuelle",
          "imageUrl": "https://www.mooiemoestuin.nl/wp-content/uploads/Ageratum-houstonianum-Blue-Mink-4.jpg"
          },
        {
          "botanicalName":"Begonia semperflorens",
          "familiarName": "Bégonia annuel",
          "Cycle": "Annuelle",
          "imageUrl": "https://www.graines-semences.com/1056/begonia-semperflorens-varie.jpg"
          },
        {
          "botanicalName":"Cineraria maritima",
          "familiarName": "Cinéraire maritime, Séneçon cinéraire",
          "Cycle": "Annuelle",
          "imageUrl": "https://horomidis.gr/wp-content/uploads/sites/default/files/styles/plants_full/public/plants/cinerariamaritima.jpg"
          },
        {
          "botanicalName":"Cosmos bipinnatus",
          "familiarName": "Cosmos bipenné",
          "Cycle": "Annuelle",
          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/db/Cosmos_bipinnatus4.jpg"
          },
        {
          "botanicalName":"Gaura lindheimeri",
          "familiarName": "Gaura de Lindheimer",
          "Cycle": "Annuelle",
          "imageUrl": "https://www.fleurir-son-jardin.fr/wp-content/uploads/GAUR006-GAURA-lindheimeri-Geyser-blanc-2-e1550560729834.jpg"
          },
        {
          "botanicalName":"Helianthus annuus",
          "familiarName": "Tournesol",
          "Cycle": "Annuelle",
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
      // is-visible
      // this.$el.closest(".plant").classList.add('is-visible')
      // this.$el.classList.add('is-visible')
      // this.$el.querySelector('.quiz-item__back').classList.add('is-visible')
      // el.target.closest(".quiz-item").classList.add('is-revealed')
      // el.target.closest(".quiz-item").classList.add('is-revealed')
      el.target.closest(".quiz-item").classList.toggle('is-revealed')
    },
  },
  // mounted () {
  //   let allFamilyValues = this.leads.map((el)=> el.Famille);
  //   // Remove duplicates, remove empty values and sort.
  //   this.familyValues = [...new Set(allFamilyValues)].filter((a) => a).sort();
  // }
}
</script>

<style lang="scss">
.quiz-item {
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  background: #ddd;
  height: 80vh;
  width: 100vw;
}

.quiz-item__front {
  position: relative;
  z-index: 0;
  height: 100%;
  width: 100%;
}

.quiz-item__image {
  pointer-events: none;
  user-select: none;
  object-fit: contain;
  height: 100%;
  width: 100%;
}

.quiz-item__back {
  display: flex;
  align-content: center;
  align-items: center;
  flex-flow: column wrap;
  justify-content: center;
  background: rgba(white, .4);
  border-radius: 4px;
  padding: 2rem;

  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 3rem;
  left: 3rem;
  right: 3rem;
  bottom: 3rem;
  // width: 100%;
  z-index: 1;

  .is-revealed & {
    opacity: 1;
    visibility: visible;
  }
}

.quiz-item__botanical {
}

.quiz-item__familiar {
}

.quiz-item__solution {
  // background: rgba(green, .4);
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 3;
}

.agile__dots {

}

li.agile__dot {
  button {
    font-size: 1rem;
    line-height: 1;
  }
}
</style>

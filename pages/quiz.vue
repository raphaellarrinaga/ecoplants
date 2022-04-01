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
            <template slot="caption"><button @click="resetSlide">Reset</button></template>
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
        },
        {
          "botanicalName":"Impatiens x walleriana",
          "familiarName":"Impatiens",
          "cycle":"Annuelle",
          "imageUrl": "https://www.matelma.com/img/tuinadvies/uploads/1371578348.jpg"
        },
        {
          "botanicalName":"Lobelia erinus",
          "familiarName":"Lobélie érine",
          "cycle":"Annuelle",
          "imageUrl": "https://media.gerbeaud.net/2013/11/640/lobelia-erinus-2.jpg"
        },
        {
          "botanicalName":"Nicotiana x sanderae",
          "familiarName":"Tabac ornemental",
          "cycle":"Annuelle",
          "imageUrl": "https://gardenseedsmarket.com/images/watermarked/5/detailed/60/tyton-ozdobny-karlowy.jpg"
        },
        {
          "botanicalName":"Pelargonium zonale",
          "familiarName":"Géranium zonale",
          "cycle":"Annuelle",
          "imageUrl": "https://plandejardin-jardinbiologique.com/wa_images/g%C3%A9ranium%20zonale%20sur%20une%20fen%C3%AAtre.jpg?v=1g0671c"
        },
        {
          "botanicalName":"Petunia hybrida",
          "familiarName":"Pétunia",
          "cycle":"Annuelle",
          "imageUrl": "https://static.aujardin.info/cache/th/img9/petunia-fuchsia-600x450.jpg"
        },
        {
          "botanicalName":"Salvia splendens",
          "familiarName":"Sauge rouge",
          "cycle":"Annuelle",
          "imageUrl": "https://www.matelma.com/img/tuinadvies/uploads/1372102824.jpg"
        },
        {
          "botanicalName":"Salvia farinacea",
          "familiarName":"Sauge farineuse",
          "cycle":"Annuelle",
          "imageUrl": "https://c8.alamy.com/compfr/2an08tx/salvia-farinacea-evolution-2an08tx.jpg"
        },
        {
          "botanicalName":"Tagetes sp",
          "familiarName":"Œillet d'Inde",
          "cycle":"Annuelle",
          "imageUrl": "https://c8.alamy.com/compfr/b21ekg/oeillet-d-inde-queen-sophia-tagetes-sp-dans-un-recipient-dans-le-new-jersey-b21ekg.jpg"
        },
        {
          "botanicalName":"Verbena hybrida",
          "familiarName":"Verveine des jardins",
          "cycle":"Annuelle",
          "imageUrl": "https://www.ducrettet.com/media/600/6712.jpg"
        },
        {
          "botanicalName":"Bidens ferulifolia",
          "familiarName":"Biden à feuilles de férule",
          "cycle":"Annuelle",
          "imageUrl": "https://www.barrault-plantes-jardins.com/532/bidens-jaune.jpg"
        },
        {
          "botanicalName":"Fuchsia hybride",
          "familiarName":"Fuchsia (formes retombantes)",
          "cycle":"Annuelle",
          "imageUrl": "https://hausinfo.ch/content/dam/gini/hausinfo/bilder/garten/fuchsie.jpg.gini-transform/original/fuchsie.1622118798474.jpeg"
        },
        {
          "botanicalName":"Helichrysum petiolare",
          "familiarName":"Immortelle laineuse",
          "cycle":"Annuelle",
          "imageUrl": "https://dessertadvisor.com/wp-content/uploads/2021/04/Licorice-plant-Helichrysum-petiolare-Dessert-Advisor.jpg"
        },
        {
          "botanicalName":"Bacopa caroliniana",
          "familiarName":"Bacopa de Caroline",
          "cycle":"Annuelle",
          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Bacopa_caroliniana_BotGardBln07122011D.JPG"
        },
        {
          "botanicalName":"Pelargonium peltatum",
          "familiarName":"Géranium lierre",
          "cycle":"Annuelle",
          "imageUrl": "https://www.jmflora.com/wp-content/uploads/sites/48/2020/02/Geranium-lierre-Pelargonium-peltatum.jpg"
        },
        {
          "botanicalName":"Portulaca grandiflora",
          "familiarName":"Pourpier à grandes fleurs",
          "cycle":"Annuelle",
          "imageUrl": "https://media.gerbeaud.net/2014/04/640/portulaca-grandiflora.jpg"
        },
        {
          "botanicalName":"Surfinia",
          "familiarName":"Surfinia",
          "cycle":"Annuelle",
          "imageUrl": "https://jardin-secrets.com/img/10288/photo-surfinia_domaine-public.jpg"
        },
        {
          "botanicalName":"Sanvitalia procumbens",
          "familiarName":"Sanvitalie",
          "cycle":"Annuelle",
          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sanvitalia_procumbens_-_plants_%28aka%29.jpg/1200px-Sanvitalia_procumbens_-_plants_%28aka%29.jpg"
        },
        {
          "botanicalName":"Lathyrus odoratus",
          "familiarName":"Pois de senteur",
          "cycle":"Annuelle",
          "imageUrl": "https://media-srag-live.saatec.de/media/catalog/product/cache/1b8f60cb7c11172c9e8d369ea19e612a/b/1/b155_shop_1638523726.jpg"
        },
        {
          "botanicalName":"Tropaeolum minus/majus",
          "familiarName":"Capucine",
          "cycle":"Annuelle",
          "imageUrl": "https://c8.alamy.com/compfr/t6agdf/capucine-tropaeolum-majus-t6agdf.jpg"
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
    },
    resetSlide: function(e) {
      // console.log(e);
      console.log(this.$refs);
    }
  },
  // mounted() {
  // },
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

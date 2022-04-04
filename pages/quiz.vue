<template>
  <div class="content">
    <div class="page">
      <main>
        <div v-if="items.length">
          <agile
            ref="carousel"
            @after-change="afterChangeCustomEvent($event)"
            :dots="false"
            :swipeDistance="100"
            :infinite="true">
            <template slot="caption">
              <button class="button-quiz-reset button-quiz" @click="resetSlide">{{ (currentSlide + 1) + "/" + items.length }}</button>
              <button
                @click="slidesJump"
                class="quiz-item__slide-jump button-quiz">
                +10
              </button>
            </template>
            <div
              v-for="(item, index) in items"
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

// @see https://github.com/lukaszflorczak/vue-agile/tree/legacy/vue-v2
import { VueAgile } from 'vue-agile'

// import data from 'data.json'
// import { getArticleSummaries } from '@/static/quizData.json';

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
          "images": [
            "https://www.mooiemoestuin.nl/wp-content/uploads/Ageratum-houstonianum-Blue-Mink-4.jpg",
            "https://www.visoflora.com/images/original/agerate-du-mexique-ageratum-houstonianum-visoflora-125005.jpg",
            "https://cdn.pixabay.com/photo/2020/12/15/16/12/ageratum-houstonianum-5834127_960_720.jpg"
          ]
          },
        {
          "botanicalName":"Begonia semperflorens",
          "familiarName": "Bégonia annuel",
          "cycle": "Annuelle",
          "images": [
            "https://www.graines-semences.com/1056/begonia-semperflorens-varie.jpg",
            "https://planteset.com/wp-content/uploads/2021/11/Begonia-semperflorens-cultorum.jpg",
            "https://c8.alamy.com/compfr/s27727/wax-begonia-semperflorens-begonia-x-cultorum-s27727.jpg",
          ]
          },
        {
          "botanicalName":"Cineraria maritima",
          "familiarName": "Cinéraire maritime, Séneçon cinéraire",
          "cycle": "Annuelle",
          "images": [
            "https://horomidis.gr/wp-content/uploads/sites/default/files/styles/plants_full/public/plants/cinerariamaritima.jpg",
            "https://www.plantes.ca/feuillage/famille/images/senecio-maritima.jpg",
            "https://jaime-jardiner.ouest-france.fr/wp-content/uploads/2020/09/cineraire-maritima-1240.jpg",
          ]
          },
        {
          "botanicalName":"Cosmos bipinnatus",
          "familiarName": "Cosmos bipenné",
          "cycle": "Annuelle",
          "images": [
            "https://upload.wikimedia.org/wikipedia/commons/d/db/Cosmos_bipinnatus4.jpg",
            "https://previews.123rf.com/images/khajornkiat/khajornkiat1501/khajornkiat150100108/35587189-cosmos-cosmos-bipinnatus-is-an-annual-and-perennial-plant-in-the-family-asteraceae-native-to-scrub-a.jpg",
            "https://www.graines-semences.com/1108-large_default/cosmos-geant-sensation-200-graines.jpg",
          ]
          },
        {
          "botanicalName":"Gaura lindheimeri",
          "familiarName": "Gaura de Lindheimer",
          "cycle": "Annuelle",
          "images": [
            "https://www.fleurir-son-jardin.fr/wp-content/uploads/GAUR006-GAURA-lindheimeri-Geyser-blanc-2-e1550560729834.jpg",
            "https://www.jardin-adoue.com/3237/gaura-lindheimeri-sparkle-white-.jpg",
            "https://groeneparadijs.be/media/mf_webp/jpg/media/catalog/product/cache/4749daa9d7edd9f9838910af1a0d84eb/g/a/gaura_lindheimeri_whirling_butterflies_-_prachtkaars_whirling_butterflies_8.webp",
            "https://www.graines-semences.com/977/gaura-lindheimeri-100-graines.jpg",
          ]
          },
        {
          "botanicalName":"Helianthus annuus",
          "familiarName": "Tournesol",
          "cycle": "Annuelle",
          "images": [
            "https://jardinage.lemonde.fr/images/dossiers/historique/tournesol-175148.jpg",
            "https://www.infoflora.ch/assets/db_doc/taxa_images/2012/06/20/20120620011915-7266dda5.jpg",
          ]
        },
        {
          "botanicalName":"Impatiens x walleriana",
          "familiarName":"Impatiens",
          "cycle":"Annuelle",
          "images": [
            "https://media.ooreka.fr/public/image/plant/182/mainImage-full-11370005.jpg",
            "https://jardinage.lemonde.fr/images/dossiers/historique/impatiens-fleur-084245.jpg",
            "http://nature.jardin.free.fr/2012/images/impatiens_walleriana-double.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Impatiens_walleriana_-_blossom_%28aka%29.jpg/290px-Impatiens_walleriana_-_blossom_%28aka%29.jpg",
          ]
        },
        {
          "botanicalName":"Lobelia erinus",
          "familiarName":"Lobélie érine",
          "cycle":"Annuelle",
          "images": [
            "https://media.gerbeaud.net/2013/11/640/lobelia-erinus-2.jpg",
            "https://www.jmflora.com/wp-content/uploads/sites/48/2020/04/Lobelia-erinus.jpeg",
            "https://upload.wikimedia.org/wikipedia/commons/c/cc/Lobelia_erinus_0.0_R.jpg",
          ]
        },
        {
          "botanicalName":"Nicotiana x sanderae",
          "familiarName":"Tabac ornemental",
          "cycle":"Annuelle",
          "images": [
            "https://gardenseedsmarket.com/images/watermarked/5/detailed/56/tyton-ozdobny.jpg",
            "https://images.fineartamerica.com/images-medium-large-5/nicotiana-x-sanderae-fragrant-cloud-brian-gadsbyscience-photo-library.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/6H_Nicotiana_%C3%97_sanderae.jpg/1200px-6H_Nicotiana_%C3%97_sanderae.jpg",
          ]
        },
        {
          "botanicalName":"Pelargonium zonale",
          "familiarName":"Géranium zonale",
          "cycle":"Annuelle",
          "images": [
            "https://planteset.com/wp-content/uploads/2021/11/Pelargonium-zonale.jpg",
            "https://plandejardin-jardinbiologique.com/wa_images/g%C3%A9ranium%20zonale%20sur%20une%20fen%C3%AAtre.jpg?v=1g0671c",
            "https://previews.123rf.com/images/westhimal/westhimal1604/westhimal160400095/56412926-pelargonium-zonale-garden-geranium-family-geraniaceae-small-ornamental-shrub-with-rounded-cordate-le.jpg",
          ]
        },
        {
          "botanicalName":"Petunia hybrida",
          "familiarName":"Pétunia",
          "cycle":"Annuelle",
          "images": [
            "https://static.aujardin.info/cache/th/img9/petunia-fuchsia-600x450.jpg",
            "https://gardenseedsmarket.com/images/watermarked/5/thumbnails/1359/900/detailed/60/petunia-wielkokwiatowa-niebieska-2.jpg",
            "https://www.mister-jardin.fr/wp-content/uploads/2021/05/jardin-fleurs-pe%CC%81tunias.jpeg",
            "https://jardinage.lemonde.fr/images/dossiers/historique/petunia-182047.jpg",
          ]
        },
        {
          "botanicalName":"Salvia splendens",
          "familiarName":"Sauge rouge",
          "cycle":"Annuelle",
          "images": [
            "https://www.matelma.com/img/tuinadvies/uploads/1372102824.jpg",
            "https://www.plantes.ca/fleurs/famille/images/salvia-splendens.jpg",
            "https://www.visoflora.com/images/original/epi-rouge-visoflora-58269.jpg",
          ]
        },
        {
          "botanicalName":"Salvia farinacea",
          "familiarName":"Sauge farineuse",
          "cycle":"Annuelle",
          "images": [
            "https://c8.alamy.com/compfr/2an08tx/salvia-farinacea-evolution-2an08tx.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/e/e0/Starr_070906-8642_Salvia_farinacea.jpg",
          ]
        },
        {
          "botanicalName":"Tagetes sp",
          "familiarName":"Œillet d'Inde",
          "cycle":"Annuelle",
          "images": [
            "https://c8.alamy.com/compfr/b21ekg/oeillet-d-inde-queen-sophia-tagetes-sp-dans-un-recipient-dans-le-new-jersey-b21ekg.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/0/07/Tagetes_sp._in_Palermo.jpg",
            "https://c8.alamy.com/compfr/2ghmkpp/tagetes-erecta-orange-perfection-2ghmkpp.jpg",
          ]
        },
        {
          "botanicalName":"Verbena hybrida",
          "familiarName":"Verveine des jardins",
          "cycle":"Annuelle",
          "images": [
            "https://www.ducrettet.com/media/600/6712.jpg",
            "https://static.aujardin.info/cache/th/img10/verbena-hybrida-cv-tukana-sweet-stripe-600x450.webp",
            "https://media.gerbeaud.net/2011/05/verveine-hybride.jpg",
            "https://media.ooreka.fr/public/image/plant/891/varietyImage/28daaqeb5a800cgccksokswgo-full-12335144.jpg",
            "https://jardin-secrets.com/img/9727/photo-verveine-des-jardins_jwitos.jpg",
          ]
        },
        {
          "botanicalName":"Bidens ferulifolia",
          "familiarName":"Biden à feuilles de férule",
          "cycle":"Annuelle",
          "images": [
            "https://jardinage.lemonde.fr/images/dossiers/historique/bidens-200822.jpg",
            "https://www.barrault-plantes-jardins.com/532/bidens-jaune.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/6/63/Bidens_ferulifolia_BotGardBln07122011D.jpg",
          ]
        },
        {
          "botanicalName":"Fuchsia hybride",
          "familiarName":"Fuchsia (formes retombantes)",
          "cycle":"Annuelle",
          "images": [
            "https://www.monjardin.fr/sites/default/files/fuchsie-kuebel-3611177-blp-floradania.jpg",
            "https://hausinfo.ch/content/dam/gini/hausinfo/bilder/garten/fuchsie.jpg.gini-transform/original/fuchsie.1622118798474.jpeg",
            "https://jardinage.lemonde.fr/images/dossiers/historique/fuchsia-184911.jpg",
          ]
        },
        {
          "botanicalName":"Helichrysum petiolare",
          "familiarName":"Immortelle laineuse",
          "cycle":"Annuelle",
          "images": [
            "https://dessertadvisor.com/wp-content/uploads/2021/04/Licorice-plant-Helichrysum-petiolare-Dessert-Advisor.jpg",
            "https://www.plantearomatique.com/1510-thickbox_default/helichryse-blanche.jpg",
          ]
        },
        {
          "botanicalName":"Bacopa caroliniana",
          "familiarName":"Bacopa de Caroline",
          "cycle":"Annuelle",
          "images": [
            "https://d2seqvvyy3b8p2.cloudfront.net/1dde8655fa106f258d65bf9d40c4e3b1.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/f/f1/Bacopa_caroliniana_BotGardBln07122011D.JPG",
          ]
        },
        {
          "botanicalName":"Pelargonium peltatum",
          "familiarName":"Géranium lierre",
          "cycle":"Annuelle",
          "images": [
            "https://www.jmflora.com/wp-content/uploads/sites/48/2020/02/Geranium-lierre-Pelargonium-peltatum.jpg",
            "https://www.monjardin.fr/sites/default/files/pelargonium-peltatum-060612_048-floradania.jpg",
            "https://i.pinimg.com/originals/6c/e4/ca/6ce4ca13faa7182bece5489bd7270030.jpg",
          ]
        },
        {
          "botanicalName":"Portulaca grandiflora",
          "familiarName":"Pourpier à grandes fleurs",
          "cycle":"Annuelle",
          "images": [
            "https://i.pinimg.com/736x/80/38/d7/8038d74b314815134f00c476fccad18b.jpg",
            "https://www.graines-semences.com/1623-large_default/pourpier-portulaca-grande-fleur-semis-jardin.jpg",
            "https://theoriginalgarden.com/Argazkiak/Fotos/20180710101732.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Portulaca_grandiflora_a1.jpg/1200px-Portulaca_grandiflora_a1.jpg"
          ]
        },
        {
          "botanicalName":"Surfinia",
          "familiarName":"Surfinia (pénutina retombant)",
          "cycle":"Annuelle",
          "images": [
            "https://jardin-secrets.com/img/10288/photo-surfinia_domaine-public.jpg",
            "https://www.jardiner-malin.fr/wp-content/uploads/2018/06/surfinia.jpg",
          ]
        },
        {
          "botanicalName":"Sanvitalia procumbens",
          "familiarName":"Sanvitalie",
          "cycle":"Annuelle",
          "images": [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sanvitalia_procumbens_-_plants_%28aka%29.jpg/1200px-Sanvitalia_procumbens_-_plants_%28aka%29.jpg",
            "https://www.rustica.fr/images/221920j-l760-h550.jpg",
            "https://jardinage.lemonde.fr/images/dossiers/2018-04/sanvitalie-183946.jpg",
          ]
        },
        {
          "botanicalName":"Lathyrus odoratus",
          "familiarName":"Pois de senteur",
          "cycle":"Annuelle",
          "images": [
            "https://media-srag-live.saatec.de/media/catalog/product/cache/1b8f60cb7c11172c9e8d369ea19e612a/b/1/b155_shop_1638523726.jpg",
            "https://viagallica.com/v/img/pois_de_senteur_001a_(cotes_de_clermont,_2006-08-08).jpg",
            "https://www.fassadengruen.de/fileadmin/_migrated/pics/duftwicken_zaun_570.jpg",
          ]
        },
        {
          "botanicalName":"Tropaeolum minus/majus",
          "familiarName":"Capucine",
          "cycle":"Annuelle",
          "images": [
            "https://c8.alamy.com/compfr/t6agdf/capucine-tropaeolum-majus-t6agdf.jpg",
            "https://plantaefelinaehome.files.wordpress.com/2019/08/capucine.png",
          ]
        },
        {
          "botanicalName":"Bellis perennis",
          "familiarName":"Pâquerette",
          "cycle":"Bisannuelle",
          "images": [
            "https://jardinage.lemonde.fr/images/dossiers/historique/paquerette-145338.jpg",
            "https://static.wixstatic.com/media/a9b708_1c0c5181c88d4c1c8ed1423a3b48912d~mv2.jpg/v1/fill/w_1000,h_759,al_c,q_90,usm_0.66_1.00_0.01/a9b708_1c0c5181c88d4c1c8ed1423a3b48912d~mv2.jpg",
          ]
        },
        {
          "botanicalName":"Digitalis purpurea",
          "familiarName":"Digitale pourpre",
          "cycle":"Bisannuelle",
          "images": [
            "https://jardinage.lemonde.fr/images/dossiers/historique/digitales-185606.jpg",
            "https://i.ebayimg.com/00/s/NjgzWDEwMjQ=/z/pUsAAOSwxWtiNBxc/$_84.JPG",
          ]
        },
        {
          "botanicalName":"Lunaria annua",
          "familiarName":"Lunaire annuelle",
          "cycle":"Bisannuelle",
          "images": [
            "https://www.magicgardenseeds.fr/pics/mgs/LUN01/1000/Lunaire-annuelle-(Lunaria-annua).jpg",
            "https://img-3.journaldesfemmes.fr/IDbnGaNRMMWgv1sqX3mOiiqE6sY=/1500x/smart/1cfd241a6cc44049a65125c3105feb92/ccmcms-jdf/16208615.jpg",
            "https://theoriginalgarden.com/Argazkiak/Fotos/LUNARIAANNUALunariaHierbadelaplata_1.jpg",
          ]
        },
        {
          "botanicalName":"Myosotis alpestris",
          "familiarName":"Myosotis alpestris",
          "cycle":"Bisannuelle",
          "images": [
            "https://jardinage.lemonde.fr/images/dossiers/historique/myosotis1-192306.jpg",
            "https://www.infoflora.ch/assets/db_doc/taxa_images/2017/11/07/20171107123201-ded6edd8.jpg",
          ]
        },
        {
          "botanicalName":"Viola wittrockiana",
          "familiarName":"Pensée des jardins",
          "cycle":"Bisannuelle",
          "images": [
            "https://www.aquaportail.com/aquabdd/photos/viola-wittrockiana.jpg",
            "https://cdn.hornbach.ch/data/shop/D04/001/780/491/727/546/DV_8_10240363_01_4c_CH_20200122051700.jpg",
            "https://www.aquaportail.com/pictures1711/assortiment-mix-viola-wittrockiana-cornuta.jpg",
          ]
        },
        {
          "botanicalName":"Achillea sp.",
          "familiarName":"Achillée",
          "cycle":"Vivace",
          "images": [
            "https://upload.wikimedia.org/wikipedia/commons/1/17/Achillea_millefolium1.jpg",
            "https://d2j6dbq0eux0bg.cloudfront.net/images/20233137/1192720362.jpg",
            "https://gd.eppo.int/media/data/taxon/A/ACHSS/pics/1024x0/10984.jpg",
          ]
        },
        {
          "botanicalName":"Aconitum sp.",
          "familiarName":"Aconit",
          "cycle":"Vivace",
          "images": [
            "https://booksofdante.files.wordpress.com/2021/08/aconit_napl_fleur_danny_s.jpg?w=440",
            "https://farm4.static.flickr.com/3263/2869797705_1e407048fa_b.jpg",
            "https://s3.amazonaws.com/farreaches/Volusion+Loaded/aconitum-sp-pmd1.jpg",
          ]
        },
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

      this.items.forEach(el => {
        console.log(el.images.val);
      })
    },
    slidesJump: function(e) {
      const total = this.items.length;

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
  font-size: 1.75rem;
  line-height: 1.2;
  margin-bottom: .25em;
  margin-top: 0;
}

.quiz-item__familiar {
  color: #4f4f4f;
  font-size: 1.5rem;
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 1.2em;
  margin-top: 0;
}

.quiz-item__cycle {
  color: #333;
  font-size: 1rem;
  // font-weight: bold;
  line-height: 1.2;
  margin: 0;
}

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

<template>
  <div class="plant__inner">
    <div
      class="plant__item plant__item-name has-value">
      <div class="plant__item-image">
        <div
          class="plant__images-count"
          v-if="lead.images">
          {{ Object.keys(lead.images).length }}
        </div>
        <client-only
          v-if="lead.images">
          <LightGallery
            :images="Object.values(lead.images)"
            :index="index"
            :disable-scroll="true"
            @close="index = null"
          />
        </client-only>
        <picture
          class="plant__thumb"
          @click="index = 0"
          v-if="lead.thumb">
          <!-- <nuxt-img
            loading="lazy"
            :src="lead.thumb"
            /> -->
          <img :src="lead.thumb" alt="">
        </picture>
        <div v-else class="plant__thumb-placeholder"></div>
      </div>
      <div class="plant__header">
        <p class="plant__latin">
          {{ lead.Nom }}
          <span v-if="lead.Toxique">☠️</span>
        </p>
        <p class="plant__vernaculaire">{{ lead.NomVernaculaire }}</p>
      </div>
    </div>
    <div
      :class="{ 'has-value' : lead.hasOwnProperty('Categorie') && lead['Categorie'] }"
      class="plant__item plant__item-categorie">
      <h3><span v-if="lead.hasOwnProperty('Categorie') && lead['Categorie']">Categorie</span></h3>
      <p class="plant__categorie">{{ lead.Categorie }}</p>
    </div>
    <div
      :class="{ 'has-value' : lead.hasOwnProperty('Cycle') && lead['Cycle'] }"
      class="plant__item plant__item-cycle">
      <h3>Cycle</h3>
      <p class="plant__cycle">{{ lead.Cycle }}</p>
    </div>
    <div
      :class="{ 'has-value' : lead.hasOwnProperty('Hauteur') && lead['Hauteur'] }"
      class="plant__item plant__item-hauteur">
      <h3>Taille</h3>
      <p class="plant__hauteur">{{ lead.Hauteur }}</p>
    </div>
    <div
      :class="{ 'has-value' : lead.hasOwnProperty('Floraison') && lead['Floraison'] }"
      class="plant__item plant__item-floraison">
      <h3>Floraison</h3>
      <p class="plant__floraison">{{ lead.Floraison }}</p>
    </div>
    <div
      :class="{ 'has-value' : lead.hasOwnProperty('Fleur') && lead['Fleur'] }"
      class="plant__item plant__item-color">
      <h3>Fleur</h3>
      <p class="plant__color">{{ lead.Fleur }}</p>
    </div>
    <!-- <div
      :class="{ 'has-value' : lead.hasOwnProperty('Semis') && lead['Semis'] }"
      class="plant__item plant__item-semis">
      <h3>Semis</h3>
      <p class="plant__semis">{{ lead.Semis }}</p>
    </div> -->
    <div class="plant__item plant__item-actions">
      <button
        v-if="
          lead.hasOwnProperty('Type') && lead['Type'] ||
          lead.hasOwnProperty('Famille') && lead['Famille'] ||
          lead.hasOwnProperty('Origine') && lead['Origine'] ||
          lead.hasOwnProperty('Cycle') && lead['Cycle'] ||
          lead.hasOwnProperty('Rusticite') && lead['Rusticite'] ||
          lead.hasOwnProperty('Feuillage') && lead['Feuillage'] ||
          lead.hasOwnProperty('Exposition') && lead['Exposition'] ||
          lead.hasOwnProperty('Biotope') && lead['Biotope'] ||
          lead.hasOwnProperty('Sol') && lead['Sol'] ||
          lead.hasOwnProperty('Acidite') && lead['Acidite'] ||
          lead.hasOwnProperty('Humidite') && lead['Humidite'] ||
          lead.hasOwnProperty('Fleur') && lead['Fleur'] ||
          lead.hasOwnProperty('Semis') && lead['Semis'] ||
          lead.hasOwnProperty('Utilisation') && lead['Utilisation'] ||
          lead.hasOwnProperty('Remarques') && lead['Remarques'] ||
          lead.hasOwnProperty('Comestible') && lead['Comestible'] ||
          lead.hasOwnProperty('Mellifere') && lead['Mellifere'] ||
          lead.hasOwnProperty('Medicinale') && lead['Medicinale'] ||
          lead.hasOwnProperty('Toxique') && lead['Toxique'] ||
          lead.hasOwnProperty('Description') && lead['Description']"
        @click="toggleMore"
        class="button plants-toggle">Détail ▾</button>
      <button
        v-else
        class="button plants-toggle-disabled">Détail ▾</button>
    </div>
    <div
      v-if="
        lead.hasOwnProperty('Type') && lead['Type'] ||
        lead.hasOwnProperty('Famille') && lead['Famille'] ||
        lead.hasOwnProperty('Origine') && lead['Origine'] ||
        lead.hasOwnProperty('Cycle') && lead['Cycle'] ||
        lead.hasOwnProperty('Rusticite') && lead['Rusticite'] ||
        lead.hasOwnProperty('Feuillage') && lead['Feuillage'] ||
        lead.hasOwnProperty('Exposition') && lead['Exposition'] ||
        lead.hasOwnProperty('Biotope') && lead['Biotope'] ||
        lead.hasOwnProperty('Sol') && lead['Sol'] ||
        lead.hasOwnProperty('Acidite') && lead['Acidite'] ||
        lead.hasOwnProperty('Humidite') && lead['Humidite'] ||
        lead.hasOwnProperty('Fleur') && lead['Fleur'] ||
        lead.hasOwnProperty('Semis') && lead['Semis'] ||
        lead.hasOwnProperty('Remarques') && lead['Remarques'] ||
        lead.hasOwnProperty('Utilisation') && lead['Utilisation'] ||
        lead.hasOwnProperty('Comestible') && lead['Comestible'] ||
        lead.hasOwnProperty('Mellifere') && lead['Mellifere'] ||
        lead.hasOwnProperty('Medicinale') && lead['Medicinale'] ||
        lead.hasOwnProperty('Toxique') && lead['Toxique'] ||
        lead.hasOwnProperty('Description') && lead['Description']"
      class="plant__more">
      <div
        v-if="lead.hasOwnProperty('Type') && lead['Type']"
        class="plant__more-item plant__more-item--type">
        <h3>Type</h3>
        <p class="plant__type">{{ lead.Type }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Origine') && lead['Origine']"
        class="plant__more-item plant__more-item--origine">
        <h3>Origine</h3>
        <p class="plant__origine">{{ lead.Origine }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Famille') && lead['Famille']"
        class="plant__more-item plant__more-item--famille">
        <h3>Famille</h3>
        <p class="plant__famille">{{ lead.Famille }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Cycle') && lead['Cycle']"
        class="plant__more-item plant__more-item--cycle">
        <h3>Cycle</h3>
        <p class="plant__cycle">{{ lead.Cycle }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Rusticite') && lead['Rusticite']"
        class="plant__more-item plant__more-item--rusticite">
        <h3>Rusticité</h3>
        <p class="plant__rusticite">{{ lead.Rusticite }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Feuillage') && lead['Feuillage']"
        class="plant__more-item plant__more-item--feuillage">
        <h3>Feuillage</h3>
        <p class="plant__feuillage">{{ lead.Feuillage }}</p>
      </div>
      <hr>
      <div
        v-if="lead.hasOwnProperty('Exposition') && lead['Exposition']"
        class="plant__more-item plant__more-item--exposition">
        <h3>Exposition</h3>
        <p class="plant__exposition">{{ lead.Exposition }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Biotope') && lead['Biotope']"
        class="plant__more-item plant__more-item--biotope">
        <h3>Biotope</h3>
        <p class="plant__biotope">{{ lead.Biotope }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Sol') && lead['Sol']"
        class="plant__more-item plant__more-item--sol">
        <h3>Sol</h3>
        <p class="plant__sol">{{ lead.Sol }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Acidite') && lead['Acidite']"
        class="plant__more-item plant__more-item--acidite">
        <h3>Acidité</h3>
        <p class="plant__acidite">{{ lead.Acidite }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Humidite') && lead['Humidite']"
        class="plant__more-item plant__more-item--humidite">
        <h3>Humidité</h3>
        <p class="plant__humidite">{{ lead.Humidite }}</p>
      </div>
      <hr>
      <div
        v-if="lead.hasOwnProperty('Semis') && lead['Semis']"
        class="plant__more-item plant__more-item--semis">
        <h3>Semis</h3>
        <p class="plant__semis">{{ lead.Semis }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Remarques') && lead['Remarques']"
        class="plant__more-item plant__more-item--remarques">
        <h3>Remarques</h3>
        <p class="plant__remarques">{{ lead.Remarques }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Comestible') && lead['Comestible']"
        class="plant__more-item plant__more-item--comestible">
        <h3>Comestible</h3>
        <p class="plant__comestible">{{ lead.Comestible }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Medicinale') && lead['Medicinale']"
        class="plant__more-item plant__more-item--medicinale">
        <h3>Medicinale</h3>
        <p class="plant__medicinale">{{ lead.Medicinale }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Mellifere') && lead['Mellifere']"
        class="plant__more-item plant__more-item--mellifere">
        <h3>Mellifere</h3>
        <p class="plant__mellifere">{{ lead.Mellifere }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Toxique') && lead['Toxique']"
        class="plant__more-item plant__more-item--toxique">
        <h3>Toxique</h3>
        <p class="plant__toxique">{{ lead.Toxique }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Utilisation') && lead['Utilisation']"
        class="plant__more-item plant__more-item--utilisation">
        <h3>Utilisation</h3>
        <p class="plant__utilisation">{{ lead.Utilisation }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Description') && lead['Description']"
        class="plant__more-item plant__more-item--description">
        <h3>Description</h3>
        <p class="plant__description">{{ lead.Description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: null,
    };
  },
  props: {
    lead: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleMore: function(el) {
      this.$el.closest(".plant").classList.toggle('is-open')
    },
  },
}
</script>

<style lang="scss">
.plant {
  margin-bottom: 0;
  position: relative;

  &.is-open {
    &:before {
      background: #F5F5F5;
      border-radius: 3px;
      display: block;
      content: "";
      position: absolute;
      bottom: 0;
      left: -1rem;
      right: -1rem;
      top: -1px;
      z-index: -1;

      // @media screen and (min-width: 821px) {
      //   left: -10px;
      //   right: -10px;
      // }
    }
  }
}

.plant__inner {
  border-bottom: 1px solid #eaeaea;
  padding: 1rem 0;
  position: relative;

  @media screen and (min-width: 821px) {
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    padding: .8rem 0;
  }

  .plant__latin {
    font-weight: bold;
    margin-bottom: .2rem;
  }

  .plant__vernaculaire {
    font-size: .9rem;
    margin-bottom: 0;

    @media screen and (min-width: 421px) {
      flex-basis: 3rem;
    }
  }

  hr {
    border: none;
    border-top: 1px solid $gray75;
    margin: 0 0 1rem;
    height: 1px;
  }
}

.plant__item {
  @media screen and (max-width: 821px) {
    display: flex;
  }

  // All items after the head/name.
  & + .plant__item {
    p {
      hyphens: auto;
      word-break: break-all;
      word-wrap: break-word;
    }

    @media screen and (max-width: 821px) {
      display: none;

      .is-open &.has-value {
        display: flex;
        align-items: flex-start;
      }
    }
  }

  &:not(.has-value) {
    @media screen and (max-width: 821px) {
      display: none;
    }
  }

  h3 {
    color: #777;
    flex: 0 0 40%;
    font-weight: 500;
    font-size: 10px;
    line-height: 1.5;
    margin: .25rem 0 1rem;
    text-transform: uppercase;

    @media screen and (min-width: 421px) {
      flex-basis: 8rem;
    }

    @media screen and (min-width: 821px) {
      display: none;
    }
  }

  p {
    flex: 0 0 60%;
    margin-top: 0;
    margin-bottom: 1rem;

    @media screen and (min-width: 821px) {
      margin-bottom: 0;
      margin-right: 1rem;
    }
  }
}

.plant__item-name {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;

  @media screen and (min-width: 821px) {
    flex-basis: 41%;
  }

  @media screen and (min-width: 1021px) {
    flex-basis: 40%;
  }

  .is-open & {
    @media screen and (max-width: 821px) {
      margin-bottom: 1rem;
    }
  }
}

.plant__item-categorie,
.plant__item-cycle {
  @media screen and (min-width: 821px) {
    flex: 0 0 16%;
  }

  @media screen and (min-width: 1021px) {
    flex-basis: 14%;
  }
}

.plant__item-hauteur,
.plant__item-floraison,
.plant__item-color {
  @media screen and (min-width: 821px) {
    flex: 0 0 9%;
  }

  @media screen and (min-width: 1021px) {
    flex-basis: 8%;
  }
}

.plant__item.plant__item-actions {
  display: block;
  flex: 0 1 0%;

  @media screen and (max-width: 1020px) {
    bottom: 0;
    left: 4rem;
    right: 0;
    top: 0;
    position: absolute;
  }

  @media screen and (min-width: 1021px) {
    flex: 0 0 8%;
    margin-top: 0;
    text-align: right;
  }
}

.plant__header {
  padding-left: 15px;

  @media screen and (min-width: 821px) {
    margin-right: 1rem;
  }
}

.plant__item-image {
  position: relative;
  flex: 0 0 auto;
  height: 60px;
  width: 50px;
}

.plant__images-count {
  background: rgba(#111, .5);
  border-radius: 3px;
  bottom: 3px;
  color: rgba(#fefefe, .8);
  font-size: .875rem;
  right: 3px;
  line-height: 1;
  padding: .1rem .3rem;
  position: absolute;
  pointer-events: none;
  user-select: none;
}

.plant__thumb {
  display: block;
  line-height: 0;
  border-radius: 4px;
  overflow: hidden;

  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: 0 0 0 2px #007aff;
  }

  img {
    max-width: 100%;
  }
}

.plant__thumb-placeholder {
  background: #e5e5e5;
  border-radius: 4px;
  height: 100%;
  width: 100%;
}

// Needs overcibling
// @todo use global disabled class helper
button.plants-toggle-disabled {
  background-color: #dadada;
  color: #a0a0a0;
  cursor: default;

  @media screen and (max-width: 1020px) {
    display: none;
  }
}

.plants-toggle {
  @media screen and (max-width: 1020px) {
    bottom: 0;
    left: 0;
    top: 0;
    width: 100%;
    opacity: 0;
    position: absolute;
  }

  @media screen and (min-width: 1021px) {
    display: inline-block;
    width: auto;
  }

  .is-open & {
    background: #ececec;
    box-shadow: inset 1px 1px 1px rgba(#111, .14);
  }
}

.plant__more {
  margin-bottom: 1rem;

  @media screen and (min-width: 821px) {
    flex: 1 0 100%;
    margin-bottom: 0;
    margin-top: .25rem;
    // padding: 1rem .5rem 0;
    padding-top: 1rem;
    padding-left: 65px;
  }

  // @todo refine behavior.
  display: none;
  .is-open & {
    display: block;
  }
}

.plant__more-item {
  display: flex;
  align-items: flex-start;

  h3 {
    color: #777;
    flex: 0 0 40%;
    font-weight: 500;
    font-size: 10px;
    line-height: 1.5;
    margin: .25rem 0 1rem;
    text-transform: uppercase;

    @media screen and (min-width: 421px) {
      flex-basis: 8rem;
    }
  }

  p {
    flex: 0 0 60%;
    margin-top: 0;
    margin-bottom: 1rem;
  }
}

.plant__more-item--remarques,
.plant__more-item--comestible,
.plant__more-item--medicinale,
.plant__more-item--description {
  @media screen and (max-width: 821px) {
    display: block;
  }
}
</style>

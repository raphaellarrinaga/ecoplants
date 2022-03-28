<template>
  <div class="plant__inner">
    <div
      class="plant__item plant__item-name has-value">
      <picture
        class="plant__thumb"
        v-if="lead.hasOwnProperty('thumbUrl') && lead['thumbUrl']">
        <img :src="lead.thumbUrl">
      </picture>
      <div v-else class="plant__thumb-placeholder"></div>
      <div class="plant__header">
        <p class="plant__latin">
          {{ lead.Nom }}
        </p>
        <p class="plant__vernaculaire">{{ lead.NomVernaculaire }}</p>
      </div>
    </div>
    <div
      class="plant__item has-value">
      <h3><span v-if="lead.hasOwnProperty('Famille') && lead['Famille']">Famille</span></h3>
      <p class="plant__famille">{{ lead.Famille }}</p>
    </div>
    <div
      :class="{ 'has-value' : lead.hasOwnProperty('Cycle') && lead['Cycle'] }"
      class="plant__item">
      <h3>Cycle</h3>
      <p class="plant__cycle">{{ lead.Cycle }}</p>
    </div>
    <div
      :class="{ 'has-value' : lead.hasOwnProperty('Hauteur') && lead['Hauteur'] }"
      class="plant__item">
      <h3>Hauteur</h3>
      <p class="plant__hauteur">{{ lead.Hauteur }}</p>
    </div>
    <div
      :class="{ 'has-value' : lead.hasOwnProperty('Floraison') && lead['Floraison'] }"
      class="plant__item">
      <h3>Floraison</h3>
      <p class="plant__floraison">{{ lead.Floraison }}</p>
    </div>
    <div
      :class="{ 'has-value' : lead.hasOwnProperty('Semis') && lead['Semis'] }"
      class="plant__item">
      <h3>Semis</h3>
      <p class="plant__semis">{{ lead.Semis }}</p>
    </div>
    <div class="plant__item plant__actions">
      <button
        v-if="
          lead.hasOwnProperty('imageUrl') && lead['imageUrl'] ||
          lead.hasOwnProperty('Exposition') && lead['Exposition'] ||
          lead.hasOwnProperty('Biotope') && lead['Biotope'] ||
          lead.hasOwnProperty('Fleur') && lead['Fleur'] ||
          lead.hasOwnProperty('Remarques') && lead['Remarques'] ||
          lead.hasOwnProperty('Comestible') && lead['Comestible']"
        @click="toggleMore"
        class="button plants-toggle">Détail ▾</button>
      <button
        v-else
        class="button plants-toggle-disabled">Détail ▾</button>
    </div>
    <div
      v-if="
        lead.hasOwnProperty('imageUrl') && lead['imageUrl'] ||
        lead.hasOwnProperty('Exposition') && lead['Exposition'] ||
        lead.hasOwnProperty('Biotope') && lead['Biotope'] ||
        lead.hasOwnProperty('Fleur') && lead['Fleur'] ||
        lead.hasOwnProperty('Remarques') && lead['Remarques'] ||
        lead.hasOwnProperty('Comestible') && lead['Comestible']"
      class="plant__more">
      <picture
        class="plant__image"
        v-if="lead.hasOwnProperty('imageUrl') && lead['imageUrl']">
        <img :src="lead.imageUrl">
      </picture>
      <div
        v-if="lead.hasOwnProperty('Exposition') && lead['Exposition']"
        class="plant__more-item">
        <h3>Exposition</h3>
        <p class="plant__exposition">{{ lead.Exposition }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Biotope') && lead['Biotope']"
        class="plant__more-item">
        <h3>Biotope</h3>
        <p class="plant__biotope">{{ lead.Biotope }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Fleur') && lead['Fleur']"
        class="plant__more-item">
        <h3>Fleur</h3>
        <p class="plant__fleur">{{ lead.Fleur }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Remarques') && lead['Remarques']"
        class="plant__more-item">
        <h3>Remarques</h3>
        <p class="plant__remarques">{{ lead.Remarques }}</p>
      </div>
      <div
        v-if="lead.hasOwnProperty('Comestible') && lead['Comestible']"
        class="plant__more-item">
        <h3>Comestible</h3>
        <p class="plant__comestible">{{ lead.Comestible }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lead: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleMore: function(el) {
      this.$el.closest(".plant").classList.toggle('is-open')
    }
  }
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

      @media screen and (min-width: 421px) {
        left: -10px;
        right: -10px;
      }
    }
  }
}

.plant__inner {
  border-bottom: 1px solid #eaeaea;
  padding: 1rem 0;
  display: flex;
  flex-flow: column wrap;

  @media screen and (min-width: 421px) {
    flex-flow: row wrap;
    align-items: flex-start;
    padding: .8rem 0;
  }

  > h3 {
    flex: 0 0 40%;
    font-weight: 500;
    font-size: .8rem;
    line-height: 1.5;
    margin: .25rem 0 1rem;
    text-transform: uppercase;

    @media screen and (min-width: 421px) {
      display: none;
    }
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
}

.plant__item {
  & + .plant__item {
    // All items after the head/name.
    @media screen and (max-width: 420px) {
      display: none;

      &.is-open {
        display: block;
      }
    }
  }

  @media screen and (max-width: 420px) {
    display: flex;
  }

  @media screen and (min-width: 421px) {
    flex: 1 0 10%;
  }

  &:not(.has-value) {
    @media screen and (max-width: 420px) {
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
      display: none;
    }
  }

  p {
    flex: 0 0 60%;
    margin-top: 0;
    margin-bottom: 1rem;

    @media screen and (min-width: 421px) {
      margin-bottom: 0;
    }
  }
}

.plant__header {
  padding-left: 15px;
}

.plant__item-name {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  order: -1;

  @media screen and (min-width: 421px) {
    flex-basis: 40%;
    order: initial;
  }
}

.plant__thumb {
  border-radius: 4px;
  flex: 0 0 auto;
  overflow: hidden;
  height: 60px;
  width: 50px;

  img {
    max-width: 100%;
  }
}

.plant__thumb-placeholder {
  background: #e5e5e5;
  border-radius: 4px;
  flex: 0 0 auto;
  height: 60px;
  width: 50px;
}

.plant__item.plant__actions {
  display: block;
  order: -1;
  margin-top: 1rem;

  @media screen and (min-width: 421px) {
    order: initial;
    text-align: right;
    margin-top: 0;
  }

  .button {
    display: block;
    width: 100%;

    @media screen and (min-width: 421px) {
      display: inline-block;
      width: auto;
    }
  }
}

.plant__more {
  margin-bottom: 1rem;
  margin-top: 1rem;

  @media screen and (min-width: 421px) {
    margin-bottom: 0;
    margin-top: .25rem;
    flex: 1 0 100%;
    padding: 1rem 1rem 0;
  }

  // @todo refine behavior.
  display: none;
  .is-open & {
    display: block;
  }
}

.plant__more-item {
  display: flex;
  flex-flow: row wrap;
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

.plant__image {
  margin-bottom: 1rem;

  img {
    max-width: 200px;
    height: auto;
  }

  @media screen and (min-width: 421px) {
    float: right;
  }
}

// Needs overcibling
// @todo use global disabled class helper
button.plants-toggle-disabled {
  background-color: #dadada;
  color: #a0a0a0;
  cursor: default;
}

.plants-toggle {
  .is-open & {
    background: #ececec;
    box-shadow: inset 1px 1px 1px rgba(#111, .14);
  }
}
</style>

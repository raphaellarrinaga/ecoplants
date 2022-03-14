<template>
  <div class="plant__inner">
    <h3>Nom</h3>
    <p class="plant__latin">{{ lead.Nom }}</p>
    <h3>Nom vernaculaire</h3>
    <p class="plant__vernaculaire">{{ lead.NomVernaculaire }}</p>
    <h3><span v-if="lead.hasOwnProperty('Famille') && lead['Famille']">Famille</span></h3>
    <p class="plant__famille">{{ lead.Famille }}</p>
    <h3><span v-if="lead.hasOwnProperty('Cycle') && lead['Cycle']">Cycle</span></h3>
    <p class="plant__cycle">{{ lead.Cycle }}</p>
    <h3><span v-if="lead.hasOwnProperty('Hauteur') && lead['Hauteur']">Hauteur</span></h3>
    <p class="plant__hauteur">{{ lead.Hauteur }}</p>
    <h3><span v-if="lead.hasOwnProperty('Floraison') && lead['Floraison']">Floraison</span></h3>
    <p class="plant__floraison">{{ lead.Floraison }}</p>
    <h3><span v-if="lead.hasOwnProperty('Semis') && lead['Semis']">Semis</span></h3>
    <p class="plant__semis">{{ lead.Semis }}</p>
    <p class="plant__actions">
      <button
        v-if="
          lead.hasOwnProperty('Exposition') && lead['Exposition'] ||
          lead.hasOwnProperty('Biotope') && lead['Biotope'] ||
          lead.hasOwnProperty('Fleur') && lead['Fleur'] ||
          lead.hasOwnProperty('Remarques') && lead['Remarques'] ||
          lead.hasOwnProperty('Comestible') && lead['Comestible']"
        @click="toggleMore"
        class="button plants-toggle">Détail</button>
      <button
        v-else
        class="button plants-toggle-disabled">Détail</button>
      </p>
    <div
      v-if="
        lead.hasOwnProperty('Exposition') && lead['Exposition'] ||
        lead.hasOwnProperty('Biotope') && lead['Biotope'] ||
        lead.hasOwnProperty('Fleur') && lead['Fleur'] ||
        lead.hasOwnProperty('Remarques') && lead['Remarques'] ||
        lead.hasOwnProperty('Comestible') && lead['Comestible']"
      class="plant__more">
      <dl v-if="lead.hasOwnProperty('Exposition') && lead['Exposition']">
        <dt>Exposition</dt>
        <dd class="plant__exposition">{{ lead.Exposition }}</dd>
      </dl>
      <dl v-if="lead.hasOwnProperty('Biotope') && lead['Biotope']">
        <dt>Biotope</dt>
        <dd class="plant__biotope">{{ lead.Biotope }}</dd>
      </dl>
      <dl v-if="lead.hasOwnProperty('Fleur') && lead['Fleur']">
        <dt>Fleur</dt>
        <dd class="plant__fleur">{{ lead.Fleur }}</dd>
      </dl>
      <dl v-if="lead.hasOwnProperty('Remarques') && lead['Remarques']">
        <dt>Remarques</dt>
        <dd class="plant__remarques">{{ lead.Remarques }}</dd>
      </dl>
      <dl v-if="lead.hasOwnProperty('Comestible') && lead['Comestible']">
        <dt>Comestible</dt>
        <dd class="plant__comestible">{{ lead.Comestible }}</dd>
      </dl>
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
      // @todo refactor.
      // document.getElementsByClassName('is-open').classList.remove('is-open')
      // let elems = document.querySelectorAll(".is-open");

      // [].forEach.call(elems, function(el) {
      //   el.classList.remove("is-open");
      // });

      this.$el.closest(".plant").classList.toggle('is-open')
    }
  }
}
</script>

<style lang="scss">
.plant {
  margin-bottom: 0;

  @media screen and (max-width: 420px) {
    background: #e8ecef;
    border-radius: 3px;
    margin-bottom: 1rem;

    &:nth-child(odd) {
      background: #fefefe;
    }
  }
}

.plant__inner {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  padding: 1rem 1rem .5rem;

  @media screen and (min-width: 421px) {
    border-bottom: 1px solid #ececec;
    border-radius: 0;
    padding: .5rem 0;
  }

  p {
    flex: 0 0 60%;
    margin-top: 0;
    margin-bottom: 1rem;

    @media screen and (min-width: 421px) {
      flex: 1;
      margin-bottom: 0;
      padding-right: .5rem;
    }
  }

  h3 {
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
}

.plant__latin {
  font-weight: bold;
}

// .plant__comestible {
//   color: rgb(124, 124, 124);
//   font-size: .8rem;

//   @media screen and (min-width: 421px) {
//     display: none;
//   }
// }

p.plant__actions {
  padding-right: 0;
  flex: 1 0 100%;

  @media screen and (min-width: 421px) {
    text-align: right;
    flex: 1;
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
  background: #f1f2f3;
  border-radius: 5px;
  flex: 1 0 100%;
  margin-bottom: 1rem;
  margin-top: .25rem;
  padding: .5rem 1rem;

  // @todo refine behavior.
  display: none;
  .is-open & {
    display: block;
  }

  dl {
    display: flex;
  }

  dt {
    flex: 0 0 6rem;
    font-weight: 500;
    font-size: .8rem;
    line-height: 1.5;
    margin-top: .25rem;
    margin-right: .5rem;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
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
    background: #f1f2f3;
    box-shadow: inset 1px 1px 2px rgba(#111, .15);
  }
}
</style>

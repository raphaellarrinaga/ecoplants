<template>
  <div class="plant__inner">
    <h3>Nom</h3>
    <p class="plant__latin">{{ lead.Nom }}</p>
    <h3>Nom vernaculaire</h3>
    <p class="plant__vernaculaire">{{ lead.NomVernaculaire }}</p>
    <h3>Famille</h3>
    <p class="plant__famille">{{ lead.Famille }}</p>
    <h3>Cycle</h3>
    <p class="plant__cycle">{{ lead.Cycle }}</p>
    <h3>Hauteur</h3>
    <p class="plant__hauteur">{{ lead.Hauteur }}</p>
    <h3>Semis</h3>
    <p class="plant__semis">{{ lead.Semis }}</p>
    <h3>Floraison</h3>
    <p class="plant__floraison">{{ lead.Floraison }}</p>
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
.plant__inner {
  border-bottom: 1px solid #ececec;
  padding-bottom: .5rem;
  padding-top: .5rem;

  @media screen and (min-width: 421px) {
    display: flex;
    flex-flow: row wrap;
  }

  p {
    flex: 1;
    padding-right: .5rem;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  h3 {
    margin: 0 0 .5rem;
    font-size: 1rem;

    @media screen and (min-width: 421px) {
      display: none;
    }
  }
}

  .plant:nth-child(even) {
    background-color: #fefefe;
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

.plant__actions {
  @media screen and (min-width: 421px) {
    text-align: right;
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

// Needs overcibling
// @todo use global disabled class helper
button.plants-toggle-disabled {
  background-color: #dadada;
  color: #a0a0a0;
  cursor: default;
}

.plant__more {
  background: #efefef;
  flex: 1 0 100%;
  margin-top: 1rem;
  padding: .5rem 1rem;
  border-radius: 5px;

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
    font-weight: bold;
    margin-right: .5rem;
  }

  dd {
    margin: 0;
  }
}
</style>

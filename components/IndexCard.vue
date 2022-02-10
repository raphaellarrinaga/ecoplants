<template>
  <div class="plant__inner">
    <!-- <p class="plant__latin" v-if="lead.Nom">{{ lead.Nom }}</p> -->
    <p class="plant__latin">{{ lead.Nom }}</p>
    <p class="plant__vernaculaire">{{ lead.NomVernaculaire }}</p>
    <p class="plant__famille">{{ lead.Famille }}</p>
    <p class="plant__semis">{{ lead.Semis }}</p>
    <p class="plant__floraison">{{ lead.Floraison }}</p>
  </div>
</template>

<script>
// Nom
// NomVernaculaire
// Famille
// Frigo
// Mois
// Temperatures
// Floraison
// Semis
// Fleur
// Hauteur
// Exposition
// Biotope
// Photo
// Description
// Observations
// Remarques
export default {
  props: {
    lead: {
      type: Object,
      required: true
    }
  },
}
</script>

<style>
.plant__inner {
  border-bottom: 1px solid #ececec;
  padding-bottom: .5rem;
  padding-top: .5rem;
}
  @media screen and (min-width: 421px) {
    .plant__inner {
      display: flex;
    }
  }

  .plant:nth-child(even) {
    background-color: #fefefe;
  }

  .plant__inner p {
    flex: 1;
    padding-right: .5rem;
    margin-bottom: 0;
    margin-top: 0;
  }
</style>

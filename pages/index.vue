<template>
  <div class="content">
    <div class="page">
      <header class="page-header">
        <h1 class="page-title">Ecoplants</h1>
      </header>

      <div v-if="leads.length">
        <LeadFilter />

        <div class="plants__header">
          <span class="plants__header-latin">Nom latin</span>
          <span class="plants__header-vernaculaire">Nom vernaculaire</span>
          <span class="plants__header-famille">Famille</span>
          <span class="plants__header-semis">Semis</span>
          <span class="plants__header-floraison">Floraison</span>
        </div>
        <div class="plants">
          <article
            v-for="lead in filteredLeads"
            :key="lead.id"
            class="plant">
            <IndexCard :lead="lead" />
          </article>
        </div>
      </div>

      <div v-if="!leads.length">
        <h3>No leads</h3>
      </div>

    </div>
  </div>
</template>

<script>
// const axios = require('axios')
import { mapGetters } from 'vuex'
import LeadFilter from '~/components/leadFilter'
import IndexCard from '~/components/IndexCard'

export default {
  // async asyncData () {
  //   const cgnData = await axios.get('/cgnData.json').then(res => res.data)
  //   const plants = cgnData
  //   return { plants }
  // },
  name: 'IndexPage',
  components: { IndexCard, LeadFilter },
  computed: {
    ...mapGetters({
      'leads': 'leads/getLeads',
      'filteredLeads': 'leads/getFilteredLeads',
      'lead': 'leads/getLead'
    })
  },
  async fetch ({ store }) {
    await store.dispatch('leads/fetchAllLeads')
  },
  mounted () {
    if (!this.leads.length) {
      this.$store.dispatch('leads/fetchAllLeads')
    }
  }
}
</script>


<style lang="scss">

.plants__header {
  border-bottom: 2px solid #dcdcdd;
  display: flex;
  font-weight: bold;
  margin-bottom: 1rem;
}
  .plants__header span {
    flex: 1;
  }

@media screen and (max-width: 420px) {
  .plants__header {
    display: none;
  }
}

.plants {
  margin-bottom: 3rem;
}

</style>

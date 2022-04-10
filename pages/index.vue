<template>
  <div class="content">
    <div class="page">
      <header class="page-header">
        <h1 class="page-title">Ecoplants</h1>
      </header>

      <div v-if="leads.length">
        <LeadFilter />

        <div class="plants__header">
          <span class="plants__header-latin"></span>
          <span class="plants__header-famille">Famille</span>
          <span class="plants__header-cycle">Cycle</span>
          <span class="plants__header-hauteur">Hauteur</span>
          <span class="plants__header-floraison">Floraison</span>
          <span class="plants__header-semis">Semis</span>
          <span class="plants__header-actions"></span>
        </div>
        <div class="plants">
          <div v-if="filteredLeads.length">
            <article
              v-for="lead in filteredLeads"
              :key="lead.id"
              class="plant">
              <IndexCard :lead="lead" />
            </article>
          </div>
          <div v-if="!filteredLeads.length">
            <h4>Pas de résultat pour ce filtre.</h4>
          </div>
        </div>
      </div>

      <div v-if="!leads.length">
        <h3>Il n'y a pas de plante.</h3>
      </div>

    </div>
  </div>
</template>

<script>
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
  border-bottom: 1px solid #eaeaea;
  font-weight: bold;
  margin-bottom: .5rem;
  padding-bottom: .5rem;
  display: none;

  @media screen and (min-width: 821px) {
    display: flex;
  }

  span {
    color: #777;
    flex: 0 0 12%;
    font-size: 10px;
    font-weight: 500;
    padding-right: 1rem;
    text-transform: uppercase;
  }

  .plants__header-latin {
    @media screen and (min-width: 821px) {
      flex-basis: 41%;
    }
    @media screen and (min-width: 1021px) {
      flex-basis: 40%;
    }
  }

  .plants__header-famille,
  .plants__header-cycle {
    @media screen and (min-width: 821px) {
      flex: 0 0 16%;
    }

    @media screen and (min-width: 1021px) {
      flex-basis: 14%;
    }
  }

  .plants__header-hauteur,
  .plants__header-floraison,
  .plants__header-semis {
    @media screen and (min-width: 821px) {
      flex: 0 0 9%;
    }

    @media screen and (min-width: 1021px) {
      flex-basis: 8%;
    }
  }
}

span.plants__header-actions {
  flex-basis: 0%;
  padding-right: 0;

  @media screen and (min-width: 1021px) {
    flex: 0 0 8%;
  }
}

.plants {
  margin-bottom: 3rem;
}
</style>

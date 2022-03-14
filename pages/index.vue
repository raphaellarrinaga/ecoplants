<template>
  <div class="content">
    <div class="page">
      <header class="page-header">
        <h1 class="page-title">Ecoplants</h1>
      </header>

      <div v-if="leads.length">
        <LeadFilter />

        <div class="plants__header">
          <span class="plants__header-latin">Nom scientifique</span>
          <span class="plants__header-vernaculaire">Nom vernaculaire</span>
          <span class="plants__header-famille">Famille</span>
          <span class="plants__header-cycle">Cycle</span>
          <span class="plants__header-hauteur">Hauteur</span>
          <span class="plants__header-floraison">Floraison</span>
          <span class="plants__header-semis">Semis</span>
          <span class="plants__header-actions"></span>
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

// import { google } from 'googleapis';

// import fs = require('fs')
// import readline = require('readline')
// import {google} = require('googleapis')

export default {
  created: async function() {
    // const scopes = [
    //   'token' = '1234'
    // ];
    const scopes = {
      'token': '1234'
    }
    // this.ExampleModule();
    // const { google } = require('googleapis');

    // const scopes = [
    //   'https://www.googleapis.com/auth/drive'
    // ];

    // const credentials = require('./credentials.json');

    // const auth = new google.auth.JWT(
    //   credentials.client_email, null,
    //   credentials.private_key, scopes
    // );

    // const drive = google.drive({ version: "v3", auth });

    // drive.files.list({}, (err, res) => {
    //   if (err) throw err;
    //   const files = res.data.files;
    //   if (files.length) {
    //   files.map((file) => {
    //     console.log(file);
    //   });
    //   } else {
    //     console.log('No files found');
    //   }
    // });
  },
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
    // console.log(this.leads.length);
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

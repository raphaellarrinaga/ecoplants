<template>
  <div class="content">
    <div class="page">
      <header class="page-header">
        <h1 class="page-title"><a href="/">Ecoplants</a></h1>
        <MainNavigation />
      </header>
      <div v-if="plants.length" class="woody-content">
        <ul class="woody-list">
          <li
            v-for="plant in plants"
            :key="plant.id"
            class="woody">
            <p class="woody-name-s">{{ plant.Nom }}</p>
            <p class="woody-name-v">{{ plant.NomVernaculaire }}</p>
          </li>
        </ul>
      </div>
      <div v-if="!plants.length">
        <h3>Il n'y a pas de plante.</h3>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavigation from '~/components/MainNavigation'
const axios = require('axios')

export default {
  name: 'Ligneux',
  components: { MainNavigation },
  async asyncData () {
    const plants = await axios.get('/woodyData.json').then(res => res.data)
    return { plants }
  },
}
</script>

<style lang="scss">
.woody-content {
  margin-bottom: 2rem;
}

.woody-list {
  columns: 2;
  margin: 0;
  padding: 0;
}

.woody {
  display: flex;
}

.woody-name-v,
.woody-name-s {
  margin: 0;
}

.woody-name-s {
  flex: 1;
  margin-right: 1rem;
}

.woody-name-v {
  color: #666;
}
</style>

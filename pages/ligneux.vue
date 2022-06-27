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
            <p class="woody-name-s"><span>{{ plant.Nom }}</span></p>
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
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (min-width: 421px) {
    columns: 2;
  }
}

.woody {
  margin-bottom: 1rem;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    // background: green;
    position: absolute;
    left: 0;
    bottom: 4px;
    border-bottom: 1px dashed #cacaca;
    z-index: -1;
  }

  @media screen and (min-width: 821px) {
    display: flex;
  }
}

.woody-name-v,
.woody-name-s {
  margin: 0;
}

.woody-name-s {
  flex: 0 0 12rem;
  margin-right: 1rem;

  span {
    background: #f8f9fd;
    display: inline-block;
    padding-right: .3rem;
  }
}

.woody-name-v {
  background: #f8f9fd;
  color: #666;
  flex: 1 1 auto;
}
</style>

<template>
  <div class="form">
    <div class="form-filter">
      <div class="form-item form-item--search">
        <input
          :value="search"
          type="search"
          class="input-search"
          placeholder="Nom scientifique ou vernaculaire"
          aria-label="Rechercher"
          @input="handleSearch"
        >
      </div>

      <div class="form-item form-item--dropdown">
        <p
          v-click-outside="closeFamilyDropDown"
          class="dropdown-toggle button button--form"
          :class="{ 'is-active' : status !== 'all' }"
          @click="FamilyOpen = !FamilyOpen"
        >
          💐
          <span v-if="status === 'all'">Famille</span>
          <span v-else>{{ status }}</span>
          ▾
        </p>
        <ul v-show="FamilyOpen" class="dropdown">
          <li
            @click="handleStatusFilter('all')"
          >
            Tout
          </li>
          <li
            v-for="family in familyValues"
            :key="family.id"
            :class="{ 'is-active' : status === family }"
            @click="handleStatusFilter(family)">
            {{ family }}
          </li>
        </ul>
      </div>

      <div class="form-item form-item--dropdown">
        <p
          v-click-outside="closeColorDropDown"
          class="dropdown-toggle button button--form"
          :class="{ 'is-active' : color !== 'all' }"
          @click="ColorOpen = !ColorOpen"
        >
          🌈
          <span v-if="color === 'all'">Fleur</span>
          <span v-else>{{ color }}</span>
          ▾
        </p>
        <ul v-show="ColorOpen" class="dropdown">
          <li
            @click="handleColorFilter('all')"
          >
            Tout
          </li>
          <li
            v-for="colorValue in colorValues"
            :key="colorValue.id"
            :class="{ 'is-active' : color === colorValue }"
            @click="handleColorFilter(colorValue)">
            {{ colorValue }}
          </li>
        </ul>
      </div>

      <div class="form-item form-item--dropdown">
        <p
          v-click-outside="closeBloomDropDown"
          class="dropdown-toggle button button--form"
          :class="{ 'is-active' : bloom !== 'all' }"
          @click="bloomOpen = !bloomOpen"
        >
          🌼
          <span v-if="bloom === 'all'">Floraison</span>
          <span v-else>{{ bloom }}</span>
          ▾
        </p>
        <ul v-show="bloomOpen" class="dropdown">
          <li
            @click="handleBloomFilter('all')"
          >
            Tout
          </li>
          <li
            v-for="month in months"
            :key="month.id"
            :class="{ 'is-active' : bloom === month }"
            @click="handleBloomFilter(month)">
            {{ month }}
          </li>
        </ul>
      </div>

      <div class="form-item form-item--dropdown">
        <p
          v-click-outside="closeSowDropDown"
          class="dropdown-toggle button button--form"
          :class="{ 'is-active' : sow !== 'all' }"
          @click="sowOpen = !sowOpen"
        >
          📆
          <span v-if="sow === 'all'">Semis</span>
          <span v-else>{{ sow }}</span>
          ▾
        </p>
        <ul v-show="sowOpen" class="dropdown">
          <li
            @click="handleSowFilter('all')"
          >
            Tout
          </li>
          <li
            v-for="month in months"
            :key="month.id"
            :class="{ 'is-active' : sow === month }"
            @click="handleSowFilter(month)">
            {{ month }}
          </li>
        </ul>
      </div>

      <div
        :class="{ 'is-active' : comestibleChecked === true }"
        class="form-item form-item--checkbox button">
        <input
          type="checkbox"
          value="isComestible"
          id="isComestible"
          v-model="comestibleChecked"
          @change="handleComestibleFilter(comestibleChecked)"
        >
        <label for="isComestible">Comestible</label>
      </div>

      <div
        :class="{ 'is-active' : medicinaleChecked === true }"
        class="form-item form-item--checkbox button">
        <input
          type="checkbox"
          value="isMedicinale"
          id="isMedicinale"
          v-model="medicinaleChecked"
          @change="handleMedicinaleFilter(medicinaleChecked)"
        >
        <label for="isMedicinale">Medicinale</label>
      </div>

      <div
        :class="{ 'is-active' : ecotypeChecked === true }"
        class="form-item form-item--checkbox button">
        <input
          type="checkbox"
          value="isEcotype"
          id="isEcotype"
          v-model="ecotypeChecked"
          @change="handleEcotypeFilter(ecotypeChecked)"
        >
        <label for="isEcotype">Ecotype</label>
      </div>

      <div
        :class="{ 'is-active' : hasPhotoChecked === true }"
        class="form-item form-item--checkbox button">
        <input
          type="checkbox"
          value="hasPhoto"
          id="hasPhoto"
          v-model="hasPhotoChecked"
          @change="handlePhotoFilter(hasPhotoChecked)"
        >
        <label for="hasPhoto">Photo</label>
      </div>
    </div>

    <div class="form-count">{{ filteredLeads.length }} résultats</div>

    <div class="form-order">
      <div class="form-item form-item--dropdown">
        <p
          v-click-outside="closeOrderDropDown"
          class="dropdown-toggle"
          @click="orderOpen = !orderOpen"
        >
          <span class="dropdown__label">⩦ Trier par</span>
          <!-- <span v-show="orderChanged" class="dropdown__current">{{ orderText }}</span> -->
          <span class="dropdown__current">{{ orderText }}</span>
        </p>
        <ul v-show="orderOpen" class="dropdown">
          <li
            class=""
            :class="{ '' : order === 'Nom' }"
            @click="handleFilterOrder('Nom')"
          >
            Nom scientifique
          </li>
          <li
            class=""
            :class="{ '' : order === 'NomVernaculaire' }"
            @click="handleFilterOrder('NomVernaculaire')"
          >
            Nom vernaculaire
          </li>
          <li
            class=""
            :class="{ '' : order === 'Famille' }"
            @click="handleFilterOrder('Famille')"
          >
            Famille
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import { debounce } from '~/helpers/index'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  data () {
    return {
      hasPhotoChecked: false,
      ecotypeChecked: false,
      medicinaleChecked: false,
      comestibleChecked: false,
      orderOpen: false,
      orderChanged: false,
      sowOpen: false,
      sowChanged: false,
      bloomOpen: false,
      bloomChanged: false,
      FamilyOpen: false,
      familyValues: [],
      ColorOpen: false,
      colorValues: [],
      months: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
    }
  },
  computed: {
    medicinale () {
      return this.$store.state.leads.filter.medicinale
    },
    comestible () {
      return this.$store.state.leads.filter.comestible
    },
    ecotype () {
      return this.$store.state.leads.filter.ecotype
    },
    hasPhoto () {
      return this.$store.state.leads.filter.hasPhoto
    },
    search () {
      return this.$store.state.leads.filter.search
    },
    status () {
      return this.$store.state.leads.filter.status
    },
    color () {
      return this.$store.state.leads.filter.color
    },
    sow () {
      return this.$store.state.leads.filter.sow
    },
    bloom () {
      return this.$store.state.leads.filter.bloom
    },
    order () {
      return this.$store.state.leads.filter.order
    },
    orderText () {
      switch (this.order) {
        case 'NomVernaculaire':
          return 'Nom vernaculaire'
        case 'Famille':
          return 'Famille'
        default:
          return 'Nom scientifique'
      }
    },
    ...mapGetters({
      'leads': 'leads/getLeads',
      'filteredLeads': 'leads/getFilteredLeads',
    })
  },
  methods: {
    handleComestibleFilter (comestible) {
      this.$store.dispatch('leads/filterComestible', comestible)
    },
    handleMedicinaleFilter (medicinale) {
      this.$store.dispatch('leads/filterMedicinale', medicinale)
    },
    handleEcotypeFilter (ecotype) {
      this.$store.dispatch('leads/filterEcotype', ecotype)
    },
    handlePhotoFilter (hasPhoto) {
      this.$store.dispatch('leads/filterPhoto', hasPhoto)
    },
    handleStatusFilter (status) {
      this.$store.dispatch('leads/filterStatus', status)
    },
    handleSowFilter (sow) {
      this.sowOpen = false
      this.sowChanged = true
      this.$store.dispatch('leads/filterSow', sow)
    },
    closeSowDropDown (e) {
      this.sowOpen = false
    },
    handleBloomFilter (bloom) {
      this.bloomOpen = false
      this.bloomChanged = true
      this.$store.dispatch('leads/filterBloom', bloom)
    },
    closeBloomDropDown (e) {
      this.bloomOpen = false
    },
    closeFamilyDropDown (e) {
      this.familyOpen = false
    },
    closeColorDropDown (e) {
      this.colorOpen = false
    },
    handleColorFilter (color) {
      this.$store.dispatch('leads/filterColor', color)
    },
    handleSearch: debounce(function (e) {
      this.$store.dispatch('leads/filterSearch', e.target.value)
    }, 500),
    handleFilterOrder (orderBy) {
      this.orderOpen = false
      this.orderChanged = true
      this.$store.dispatch('leads/filterOrder', orderBy)
    },
    closeOrderDropDown (e) {
      this.orderOpen = false
    },
  },
  async fetch ({ store }) {
    await store.dispatch('leads/fetchAllLeads')
  },
  mounted () {
    if (!this.leads.length) {
      this.$store.dispatch('leads/fetchAllLeads')
    }

    // Set family filter.
    // Fill new array with all Famille terms.
    let allFamilyValues = this.leads.map((el)=> el.Famille);
    // Remove duplicates, remove empty values and sort.
    this.familyValues = [...new Set(allFamilyValues)].filter((a) => a).sort();

    // Set color filter.
    // Fill new array with all Fleur terms.
    const colors = []
    for (let i = 0; i < this.leads.length; i++) {
      const colorString = this.leads[i].Fleur;
      if (colorString !== undefined && colorString !== '') {
        colors.push(...colorString.split(","));
      }
    }

    // Remove duplicates, remove spaces and sort.
    this.colorValues = [...new Set(colors.map(a => a.trim()).sort())];
  }
}

</script>

<style lang="scss">
.form {
  @media screen and (min-width: 821px) {
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
  }
}

.form-filter {
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  margin-bottom: 1rem;
}

.form-count {
  font-weight: 500;
  flex: 0 0 auto;
  margin-left: auto;
  padding: 0.45rem 0 0.4rem;

  @media screen and (max-width: 820px) {
    margin-bottom: 1rem;
  }
}

.form-order {
  flex: 1 0 100%;
}

.form-item {
  margin-bottom: 1rem;
}

.form-item--search {
  flex: 1 0 100%;
  position: relative;

  @media screen and (min-width: 821px) {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 16rem;
    margin-right: 2rem;
    max-width: 22rem;
  }

  &:before {
    content: "🔎";
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
}

.input-search {
  border-radius: 20px;
  border: 1px solid #dbdbdb;
  display: block;
  font-size: .88rem;
  line-height: 1.5;
  padding: .45rem .8rem .4rem 2.4rem;
  width: 100%;
  box-shadow: rgba(#111, .06) 0 1px 1px;

  @media screen and (min-width: 821px) {
    display: inline-block;
  }
}

.button {
  background: #fcfcfc;
  border-radius: 3px;
  border: 1px solid #dbdbdb;
  color: #0a2336;
  font-size: .88rem;
  line-height: 1.5;
  padding: .3rem .6rem .2rem;
  cursor: pointer;
  box-shadow: rgba(#111, .06) 0 1px 1px;

  &:hover {
    border-color: darken(#dbdbdb, 10%);
    box-shadow: rgba(#111, .06) 0 2px 2px;
  }
}

.form-item--buttons {
  button {
    margin: 0 .5rem .5rem 0;

    &:hover {
      background: #ced9e0;
    }

    &.is-active {
      background: #a2b4c2;
    }
  }
}

.form-item--checkbox {
  border-color: #e9e9e9;
  margin-right: 1rem;
  padding: 0;
  position: relative;

  &:hover {
    background: #fefefe;
    border: 1px solid #e9e9e9;
  }

  label {
    display: block;
    padding: .45rem .55rem .4rem 1.8rem;
    cursor: pointer;
  }

  input {
    border: 1px solid #e9e9e9;
    border-radius: 2px;
    display: block;
    height: 14px;
    width: 14px;
    position: absolute;
    left: .6rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    user-select: none;
    appearance: none;
    -webkit-appearance: none;

    display: grid;
    place-content: center;

    &::before {
      content: "";
      width: 0.55em;
      height: 0.55em;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      /* Windows High Contrast Mode */
      background-color: rgb(237, 238, 253);
    }


    &:checked {
      background: rgb(78, 87, 188);

      &::before {
        transform: scale(1);
      }
    }
  }

  &.is-active {
    border-color: rgb(78, 87, 188);
    background: rgb(237, 238, 253);
  }
}

.form-item--dropdown {
  position: relative;
}

.dropdown {
  background: white;
  border-radius: 3px;
  position: absolute;
  list-style: none;
  left: 0;
  top: 100%;
  margin: .5rem 0 0;
  max-height: 50vh;
  overflow: scroll;
  padding: .2rem;
  z-index: 10;
  box-shadow: rgba(33, 0, 153, 0.144) 1px 1px 3px;
  width: auto;
  min-width: 9rem;

  li {
    cursor: pointer;
    padding: .5rem .8rem;
    border-radius: 3px;

    &:hover {
      background: #f1f1f1;
    }

    &.is-active {
      font-weight: bold;
    }
  }
}

.dropdown__current {
  font-weight: bold;
}

.dropdown-toggle {
  display: inline-block;
  cursor: pointer;
  margin: 0;

  .form-filter & {
    background: #fefefe;
    border: 1px solid #e9e9e9;
    margin: 0 1rem 0 0;
  }

  &.is-active {
    border-color: rgb(78, 87, 188);
    background: rgb(237, 238, 253);
  }
}

.button--form {
  padding-bottom: .4rem;
  padding-top: .45rem;
}
</style>

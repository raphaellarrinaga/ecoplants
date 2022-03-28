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
          v-click-outside="closeSowDropDown"
          class="dropdown-toggle button button--form"
          @click="sowOpen = !sowOpen"
        >
          <span class="mr-1">📆 Date de semis ▾</span>
        </p>
        <ul v-show="sowOpen" class="dropdown">
          <li
            @click="handleSowFilter('all')"
          >
            Tout
          </li>
          <li
            @click="handleSowFilter('Janvier')"
          >
            Janvier
          </li>
          <li
            @click="handleSowFilter('Février')"
          >
            Février
          </li>
          <li
            @click="handleSowFilter('Mars')"
          >
            Mars
          </li>
          <li
            @click="handleSowFilter('Avril')"
          >
            Avril
          </li>
          <li
            @click="handleSowFilter('Mai')"
          >
            Mai
          </li>
          <li
            @click="handleSowFilter('Juin')"
          >
            Juin
          </li>
          <li
            @click="handleSowFilter('Juillet')"
          >
            Juillet
          </li>
          <li
            @click="handleSowFilter('Août')"
          >
            Août
          </li>
          <li
            @click="handleSowFilter('Septembre')"
          >
            Septembre
          </li>
          <li
            @click="handleSowFilter('Octobre')"
          >
            Octobre
          </li>
          <li
            @click="handleSowFilter('Novembre')"
          >
            Novembre
          </li>
          <li
            @click="handleSowFilter('Décembre')"
          >
            Décembre
          </li>
        </ul>
      </div>

      <div class="form-item form-item--dropdown">
        <p
          v-click-outside="closeFamilyDropDown"
          class="dropdown-toggle button button--form"
          @click="FamilyOpen = !FamilyOpen"
        >
          <span class="mr-1">🌼 Famille ▾</span>
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

      <!-- <div class="form-item form-item--buttons">
        <button
          class="button"
          :class="{ 'is-active' : status === 'Apiaceae' }"
          @click="handleStatusFilter('Apiaceae')"
        >
          Apiaceae
        </button>

        <button
          class="button button-reset"
          @click="handleStatusFilter('all')"
        >
          🔄 Réinitialiser
        </button>

      </div> -->

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
          <span v-show="orderChanged" class="dropdown__current">{{ orderText }}</span>
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
      orderOpen: false,
      orderChanged: false,
      sowOpen: false,
      sowChanged: false,
      FamilyOpen: false,
      familyValues: []
    }
  },
  computed: {
    search () {
      return this.$store.state.leads.filter.search
    },
    status () {
      return this.$store.state.leads.filter.status
    },
    sow () {
      return this.$store.state.leads.filter.sow
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
          return 'Nom'
      }
    },
    ...mapGetters({
      'leads': 'leads/getLeads',
      'filteredLeads': 'leads/getFilteredLeads',
    })
  },
  methods: {
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
    closeFamilyDropDown (e) {
      this.familyOpen = false
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
    }
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
  }
}

</script>

<style lang="scss">
.form {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
}

.form-filter {
  flex: 1;

  @media screen and (min-width: 420px) {
    display: flex;
  }
}

.form-count {
  font-weight: 500;
  flex: 0 0 auto;
  margin-left: auto;
}

.form-order {
  flex: 1 0 100%;
  margin-top: 2rem;
}

.form-item {
  margin-bottom: 1rem;
}

@media screen and (min-width: 420px) {
  .form-item {
    margin-bottom: 0;
  }
}

.form-item--search {
  flex: 1;
  margin-right: 2rem;
  max-width: 28rem;
  position: relative;

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

  @media screen and (min-width: 420px) {
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

.form-item--buttons .button {
  margin: 0 .5rem .5rem 0;
}

.form-item--buttons .button:hover {
  background: #ced9e0;
}

.form-item--buttons .button.is-active {
  background: #a2b4c2;
}

.form-item--dropdown {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 60%;
  left: 0;
  background: white;
  border-radius: 3px;
  list-style: none;
  margin-left: 0;
  padding: .2rem;
  z-index: 10;
  box-shadow: rgba(33, 0, 153, 0.144) 1px 1px 3px;
}
  .dropdown li {
    cursor: pointer;
    padding: .5rem .8rem;
    border-radius: 3px;
  }
  .dropdown li:hover {
    background: #f1f1f1;
  }

.dropdown__current {
  font-weight: bold;
}

.dropdown-toggle {
  display: inline-block;
  cursor: pointer;
  margin: 0;
}

.button--form {
  padding-bottom: .4rem;
  padding-top: .45rem;
}

.form-filter .dropdown-toggle {
  background: #fefefe;
  border: 1px solid #e9e9e9;
  margin: 0 1rem 0 0;
}

</style>

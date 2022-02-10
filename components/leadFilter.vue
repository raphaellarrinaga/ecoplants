<template>
  <div class="form">
    <div class="form-filter">
      <div class="form-item">
        <input
          :value="search"
          type="search"
          class="input-search"
          placeholder="Entrer un nom"
          aria-label="Rechercher"
          @input="handleSearch"
        >
      </div>

      <div class="form-item form-item--dropdown">
        <p
          v-click-outside="closeSowDropDown"
          class="dropdown-toggle button"
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

      <div class="form-item form-item--buttons">
        <button
          class="button"
          :class="{ 'is-active' : status === 'Asteraceae' }"
          @click="handleStatusFilter('Asteraceae')"
        >
          Asteraceae
        </button>

        <button
          class="button"
          :class="{ 'is-active' : status === 'Brassicaceae' }"
          @click="handleStatusFilter('Brassicaceae')"
        >
          Brassicaceae
        </button>

        <button
          class="button button-reset"
          @click="handleStatusFilter('all')"
        >
          🔄 Réinitialiser
        </button>

      </div>

    </div>

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
            Nom
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

export default {
  name: 'IndexPage',
  data () {
    return {
      orderOpen: false,
      orderChanged: false,
      sowOpen: false,
      sowChanged: false
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
    }
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
  }
}

</script>

<style>
.form-filter {
  display: flex;
}

.form-item:first-child {
  margin-right: auto;
}

.form-filter {
  margin-bottom: 2em;
}

.form-order {
  margin-bottom: 2em;
}

.input-search {
  border-radius: 15px;
  border: 1px solid #cae0f1;
  line-height: 1.5;
  padding: .4rem .8rem;
}

.button {
  background: #d7e0e7;
  border-radius: 5px;
  /* border: 1px solid #7e7e7e; */
  border: none;
  color: #0a2336;
  font-size: .9rem;
  line-height: 1.5;
  padding: .3rem .6rem .2rem;
  cursor: pointer;
}
  .button + .button {
    margin-left: .5rem;
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

.form-filter .dropdown-toggle {
  background: #fefefe;
  border: 1px solid #e9e9e9;
  margin: 0 3rem 0 0;
}
</style>

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

      <div class="form-group-toggle">
        <button
          @click="ToggleFilter = !ToggleFilter"
          class="button button--form">Filtrer ▾</button>
      </div>

      <div
        :class="{ 'js-open' : ToggleFilter }"
        class="form-group">
        <div class="form-group__inner">

          <div
            v-click-outside="closeCategoryDropDown"
            class="form-item form-item--dropdown">
            <p
              class="dropdown-toggle button button--form"
              :class="{ 'is-active' : category.length !== 0 }"
              @click="categoryOpen = !categoryOpen"
            >
              🌴
              <span v-if="category.length === 0">Catégorie</span>
              <span v-else-if="category.length === 1">
                {{ category[0] }}
              </span>
              <span v-else>Multiple</span>
              ▾
            </p>
           <ul v-show="categoryOpen" class="dropdown dropdown--multiple">
              <li
                @click="handleCategoryFilter('all')"
                :class="{ 'is-active' : category.length === 0 }"
              >
                Tout
              </li>
              <li
                v-for="categoryValue in categoryValues"
                :key="categoryValue.id"
                :class="{ 'is-active' : category.includes(categoryValue) }"
                @click="handleCategoryFilter(categoryValue)"
              >
                {{ categoryValue }}
              </li>
            </ul>
          </div>

          <!-- <div class="form-item form-item--dropdown">
            <p
              v-click-outside="closeCategoryDropDown"
              class="dropdown-toggle button button--form"
              :class="{ 'is-active' : category !== 'all' }"
              @click="categoryOpen = !categoryOpen"
            >
              🌴
              <span v-if="category === 'all'">Catégorie</span>
              <span v-else>{{ category }}</span>
              ▾
            </p>
            <ul v-show="categoryOpen" class="dropdown">
              <li
                @click="handleCategoryFilter('all')"
              >
                Tout
              </li>
              <li
                v-for="categoryValue in categoryValues"
                :key="categoryValue.id"
                :class="{ 'is-active' : category === categoryValue }"
                @click="handleCategoryFilter(categoryValue)">
                {{ categoryValue }}
              </li>
            </ul>
          </div> -->

          <div class="form-item form-item--dropdown">
            <p
              v-click-outside="closeTypeDropDown"
              class="dropdown-toggle button button--form"
              :class="{ 'is-active' : type.length !== 0 }"
              @click="typeOpen = !typeOpen"
            >
              ☘️
              <span v-if="type.length === 0">Type</span>
              <span v-else-if="type.length === 1">
                {{ type[0] }}
              </span>
              <span v-else>Multiple</span>
              ▾
            </p>
            <ul v-show="typeOpen" class="dropdown dropdown--multiple">
              <li
                @click="handleTypeFilter('all')"
                :class="{ 'is-active' : type.length === 0 }"
              >
                Tout
              </li>
              <li
                v-for="typeValue in typeValues"
                :key="typeValue.id"
                :class="{ 'is-active' : type.includes(typeValue) }"
                @click="handleTypeFilter(typeValue)">
                {{ typeValue }}
              </li>
            </ul>
          </div>

          <div class="form-item form-item--dropdown">
            <p
              v-click-outside="closeFamilyDropDown"
              class="dropdown-toggle button button--form"
              :class="{ 'is-active' : family !== 'all' }"
              @click="familyOpen = !familyOpen"
            >
              💐
              <span v-if="family === 'all'">Famille</span>
              <span v-else>{{ family }}</span>
              ▾
            </p>
            <ul v-show="familyOpen" class="dropdown">
              <li
                @click="handleFamilyFilter('all')"
              >
                Tout
              </li>
              <li
                v-for="familyValue in familyValues"
                :key="familyValue.id"
                :class="{ 'is-active' : family === familyValue }"
                @click="handleFamilyFilter(familyValue)">
                {{ familyValue }}
              </li>
            </ul>
          </div>

          <div class="form-item form-item--dropdown">
            <p
              v-click-outside="closeColorDropDown"
              class="dropdown-toggle button button--form"
              :class="{ 'is-active' : colors.length !== 0 }"
              @click="colorOpen = !colorOpen"
            >
              🌈
              <span v-if="colors.length === 0">Fleur</span>
              <span v-else-if="colors.length === 1">
                {{ colors[0] }}
              </span>
              <span v-else>Multiple</span>
              ▾
            </p>
            <ul v-show="colorOpen" class="dropdown dropdown--multiple">
              <li
                @click="handleColorFilter('all')"
                :class="{ 'is-active' : colors.length === 0 }"
              >
                Tout
              </li>
              <li
                v-for="colorValue in colorValues"
                :key="colorValue.id"
                :class="{ 'is-active' : colors.includes(colorValue) }"
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
              v-click-outside="closeExposureDropDown"
              class="dropdown-toggle button button--form"
              :class="{ 'is-active' : exposure !== 'all' }"
              @click="exposureOpen = !exposureOpen"
            >
              ☀️
              <span v-if="exposure === 'all'">Exposition</span>
              <span v-else>{{ exposure }}</span>
              ▾
            </p>
            <ul v-show="exposureOpen" class="dropdown">
              <li
                @click="handleExposureFilter('all')"
              >
                Tout
              </li>
              <li
                v-for="exposureValue in exposureValues"
                :key="exposureValue.id"
                :class="{ 'is-active' : exposure === exposureValue }"
                @click="handleExposureFilter(exposureValue)">
                {{ exposureValue }}
              </li>
            </ul>
          </div>

          <div class="form-item form-item--dropdown">
            <p
              v-click-outside="closeHeightDropDown"
              class="dropdown-toggle button button--form"
              :class="{ 'is-active' : !arrayEquals(heightRange, heightRangeInitial) }"
              @click="HeightOpen = !HeightOpen"
            >
              ⬆️
              <span v-if="arrayEquals(heightRange, heightRangeInitial)">Taille</span>
              <span v-else>{{ heightRange }}</span>
              ▾
            </p>
            <div v-show="HeightOpen" class="dropdown dropdown--large">
              <div class="dropdown__content">
                <vue-slider
                  :min="0"
                  :max="heightMax"
                  :interval="10"
                  :duration="0.2"
                  :enableCross="false"
                  :tooltipPlacement="'bottom'"
                  :tooltip-formatter="'{value}cm'"
                  :lazy="true"
                  @change="handleHeightFilter(heightRange)"
                  v-model="heightRange"></vue-slider>
              </div>
            </div>
          </div>

          <div class="form-item form-item--dropdown">
            <p
              v-click-outside="closeOriginDropDown"
              class="dropdown-toggle button button--form"
              :class="{ 'is-active' : origin !== 'all' }"
              @click="originOpen = !originOpen"
            >
              🇧🇪
              <span v-if="origin === 'all'">Origine</span>
              <span v-else>{{ origin }}</span>
              ▾
            </p>
            <ul v-show="originOpen" class="dropdown">
              <li
                @click="handleOriginFilter('all')"
              >
                Tout
              </li>
              <li
                v-for="originValue in originValues"
                :key="originValue.id"
                :class="{ 'is-active' : origin === originValue }"
                @click="handleOriginFilter(originValue)">
                {{ originValue }}
              </li>
            </ul>
          </div>

          <!-- <div class="form-item form-item--dropdown">
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
          </div> -->

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
            :class="{ 'is-active' : invasiveChecked === true }"
            class="form-item form-item--checkbox button">
            <input
              type="checkbox"
              value="isInvasive"
              id="isInvasive"
              v-model="invasiveChecked"
              @change="handleInvasiveFilter(invasiveChecked)"
            >
            <label for="isInvasive">Invasive</label>
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
      </div>
    </div>

    <div class="form-count">{{ filteredLeads.length }} résultats</div>

    <div class="form-order-group">
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

      <div class="form-layout">
        <!-- ⧻⫢⧄≡⊞⊟⊠ -->
        <a
          class="button"
          :class="{ 'button--unchecked' : layout === 'grid' }"
          @click="handleLayoutChange('table')">⫢ Tableau</a>
        <a
          class="button"
          :class="{ 'button--unchecked' : layout === 'table' }"
          @click="handleLayoutChange('grid')">⊞ Grille</a>
      </div>
    </div>

  </div>

</template>

<script>
import { debounce } from '~/helpers/index'
import { mapGetters } from 'vuex'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'IndexPage',
  components: {
    VueSlider
  },
  data () {
    return {
      ToggleFilter: false,
      hasPhotoChecked: false,
      medicinaleChecked: false,
      invasiveChecked: false,
      comestibleChecked: false,
      orderOpen: false,
      orderChanged: false,
      sowOpen: false,
      sowChanged: false,
      bloomOpen: false,
      familyOpen: false,
      familyValues: [],
      categoryOpen: false,
      categoryValues: [],
      categoryValuesSelected: [],
      selectedCategories: [],
      typeOpen: false,
      typeValues: [],
      originOpen: false,
      originValues: [],
      colorOpen: false,
      colorValues: [],
      exposureOpen: false,
      exposureValues: [],
      months: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
      HeightOpen: false,
      heightRangeInitial: [],
      heightRange: [0, 100],
      heightMax: 10000,
    }
  },
  computed: {
    medicinale () {
      return this.$store.state.leads.filter.medicinale
    },
    invasive () {
      return this.$store.state.leads.filter.invasive
    },
    comestible () {
      return this.$store.state.leads.filter.comestible
    },
    hasPhoto () {
      return this.$store.state.leads.filter.hasPhoto
    },
    search () {
      return this.$store.state.leads.filter.search
    },
    category () {
      return this.$store.state.leads.filter.category
    },
    type () {
      return this.$store.state.leads.filter.type
    },
    origin () {
      return this.$store.state.leads.filter.origin
    },
    family () {
      return this.$store.state.leads.filter.family
    },
    colors () {
      return this.$store.state.leads.filter.colors
    },
    exposure () {
      return this.$store.state.leads.filter.exposure
    },
    sow () {
      return this.$store.state.leads.filter.sow
    },
    bloom () {
      return this.$store.state.leads.filter.bloom
    },
    height () {
      return this.$store.state.leads.filter.height
    },
    order () {
      return this.$store.state.leads.filter.order
    },
    layout () {
      return this.$store.state.leads.layout
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
  async fetch ({ store }) {
    await store.dispatch('leads/fetchAllLeads')
  },
  methods: {
    handleLayoutChange(layoutView) {
      this.$store.commit('leads/setLayout', layoutView);
    },
    handleCategoryFilter(categoryLast) {
      if (categoryLast === 'all') {
        this.$store.commit('leads/setCategory', [])
      } else if(this.category.includes(categoryLast)) {
        this.$store.commit('leads/removeCategory', categoryLast)
      } else {
        this.$store.commit('leads/addCategory', categoryLast)
      }
      this.$store.dispatch('leads/filterCategory', this.category)
    //   this.categoryOpen = false
    //   this.$store.dispatch('leads/filterCategory', category)
    },
    closeCategoryDropDown (e) {
      this.categoryOpen = false
    },
    handleTypeFilter (typeLast) {
      if (typeLast === 'all') {
        this.$store.commit('leads/setType', [])
      } else if(this.type.includes(typeLast)) {
        this.$store.commit('leads/removeType', typeLast)
      } else {
        this.$store.commit('leads/addType', typeLast)
      }
      this.$store.dispatch('leads/filterType', this.type)
      // this.typeOpen = false
      // this.$store.dispatch('leads/filterType', type)
    },
    closeTypeDropDown (e) {
      this.typeOpen = false
    },
    handleOriginFilter (origin) {
      this.originOpen = false
      this.$store.dispatch('leads/filterOrigin', origin)
    },
    closeOriginDropDown (e) {
      this.originOpen = false
    },
    handleFamilyFilter (family) {
      this.familyOpen = false
      this.$store.dispatch('leads/filterFamily', family)
    },
    closeFamilyDropDown (e) {
      this.familyOpen = false
    },
    handleColorFilter (colorLast) {
      if (colorLast === 'all') {
        this.$store.commit('leads/setColors', [])
      } else if(this.colors.includes(colorLast)) {
        this.$store.commit('leads/removeColors', colorLast)
      } else {
        this.$store.commit('leads/addColors', colorLast)
      }
      this.$store.dispatch('leads/filterColors', this.colors)
    },
    closeColorDropDown (e) {
      this.colorOpen = false
    },
    handleExposureFilter (exposure) {
      this.exposureOpen = false
      this.$store.dispatch('leads/filterExposure', exposure)
    },
    closeExposureDropDown (e) {
      this.exposureOpen = false
    },
    handleBloomFilter (bloom) {
      this.bloomOpen = false
      this.$store.dispatch('leads/filterBloom', bloom)
    },
    closeBloomDropDown (e) {
      this.bloomOpen = false
    },
    handleSowFilter (sow) {
      this.sowOpen = false
      this.sowChanged = true
      this.$store.dispatch('leads/filterSow', sow)
    },
    closeSowDropDown (e) {
      this.sowOpen = false
    },
    handleHeightFilter(height) {
      // setTimeout(() => { this.$store.dispatch('leads/filterHeight', height) }, 500);
      this.$store.dispatch('leads/filterHeight', height)
    },
    closeHeightDropDown (e) {
      this.heightOpen = false
    },
    handleComestibleFilter (comestible) {
      this.$store.dispatch('leads/filterComestible', comestible)
    },
    handleMedicinaleFilter (medicinale) {
      this.$store.dispatch('leads/filterMedicinale', medicinale)
    },
    handleInvasiveFilter (invasive) {
      this.$store.dispatch('leads/filterInvasive', invasive)
    },
    handlePhotoFilter (hasPhoto) {
      this.$store.dispatch('leads/filterPhoto', hasPhoto)
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
    arrayEquals(a, b) {
      return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
    }
  },
  mounted () {
    if (!this.leads.length) {
      this.$store.dispatch('leads/fetchAllLeads')
    }

    // Set category filter.
    // Fill new array with all Categorie terms.
    let allCategoryValues = this.leads.map((el)=> el.Categorie);
    // Remove duplicates, remove empty values and sort.
    this.categoryValues = [...new Set(allCategoryValues)].filter((a) => a).sort();

    // Set type filter.
    // Fill new array with all Type terms.
    const types = []
    for (let i = 0; i < this.leads.length; i++) {
      const typeString = this.leads[i].Type;
      if (typeString !== undefined && typeString !== '') {
        types.push(...typeString.split(","));
      }
    }

    // Remove duplicates, remove spaces and sort.
    this.typeValues = [...new Set(types.map(a => a.trim()).sort())];

    // Set origin filter.
    // Fill new array with all Fleur terms.
    const origins = []
    for (let i = 0; i < this.leads.length; i++) {
      const originString = this.leads[i].Origine;
      if (originString !== undefined && originString !== '') {
        origins.push(...originString.split(","));
      }
    }

    // Remove duplicates, remove spaces and sort.
    this.originValues = [...new Set(origins.map(a => a.trim()).sort())];

    // Set family filter.
    // Fill new array with all Famille terms.
    let allFamilyValues = this.leads.map((el)=> el.Famille);
    // Remove duplicates, remove empty values and sort.
    this.familyValues = [...new Set(allFamilyValues)].filter((a) => a).sort();

    // Set color filter.
    // Fill new array with all Fleur terms.
    const fieldsColors = []
    for (let i = 0; i < this.leads.length; i++) {
      const colorString = this.leads[i].Fleur;
      if (colorString !== undefined && colorString !== '') {
        fieldsColors.push(...colorString.split(","));
      }
    }

    // Remove duplicates, remove spaces and sort.
    this.colorValues = [...new Set(fieldsColors.map(a => a.trim()).sort())];

    // Set exposure filter.
    // Fill new array with all Exposition terms.
    const exposures = []
    for (let i = 0; i < this.leads.length; i++) {
      const exposureString = this.leads[i].Exposition;
      if (exposureString !== undefined && exposureString !== '') {
        exposures.push(...exposureString.split(","));
      }
    }

    // Remove duplicates, remove spaces and sort.
    this.exposureValues = [...new Set(exposures.map(a => a.trim()).sort())];

    // Set heights filter.
    let heights = []
    for (let i = 0; i < this.leads.length; i++) {
      const heightString = this.leads[i].Hauteur;
      if (heightString !== undefined && heightString !== '') {
        heights.push(...heightString.split("-"));
      }
    }

    // Set height filter defaults.
    const heightMax = Math.max(...heights)
    this.heightMax = heightMax
    this.heightRange = [0, heightMax]
    this.heightRangeInitial = [0, heightMax]
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

  @media screen and (min-width: 421px) {
    margin-bottom: 1rem;
  }
}

.form-group-toggle {
  @media screen and (min-width: 421px) {
    display: none;
  }
}

.form-group {
  // overflow-x: scroll;
  @media screen and (max-width: 420px) {
    display: none;

    &.js-open {
      display: block;
    }
  }
}

.form-group__inner {
  display: flex;
  flex-flow: row wrap;
}

.form-count {
  // font-weight: 500;
  flex: 0 0 auto;
  margin-left: auto;
  padding: 0.45rem 0 0.4rem;

  @media screen and (max-width: 820px) {
    margin-bottom: 1rem;
  }
}

.form-order-group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  flex: 1 0 100%;

  .dropdown-toggle {
    &:hover {
      color: $link-color;
    }
  }
}

.form-layout {
  margin-bottom: 1rem;
}

.form-item {
  margin-bottom: 1rem;
}

.form-item--search {
  flex: 1 0;
  margin-right: 1rem;
  position: relative;

  @media screen and (min-width: 421px) {
    flex: 1 0 100%;
  }

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
    padding: .5rem .6rem;
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

.dropdown__content {
  padding: .25rem .5rem .25rem;
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

.dropdown--large {
  min-width: 12rem;
  // Removed to make le slider tooltip visible.
  overflow: visible;
}

.dropdown--multiple {
  li {
    display: flex;
    align-items: center;

    &.is-active {
      &:before {
        border-color: $link-color;
        background: $link-color;
        box-shadow: inset 0 0 0 1px $white;
      }
    }

    &:before {
      @include el(.7rem, .7rem, inline-block);
      border: 1px solid $gray75;
      border-radius: 2px;
      margin-right: .5rem;
      vertical-align: middle;
    }
  }
}

.button--form {
  padding-bottom: .4rem;
  padding-top: .45rem;
}
</style>

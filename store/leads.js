import * as Filters from '~/helpers/filters'
// import * as FireStore from '~/repositories/leads'
const axios = require('axios')

export const state = () => ({
  leads: [],
  filteredLeads: [],
  lead: {},
  filter: {
    category: 'all',
    type: 'all',
    origin: 'all',
    medicinale: 'false',
    comestible: 'false',
    search: '',
    family: 'all',
    color: 'all',
    exposure: 'all',
    sow: 'all',
    bloom: 'all',
    height: 'all',
    order: 'gsheetNom' // Default is createdAt.
  }
})

export const actions = {
  async fetchAllLeads ({ commit }) {
    const leads = await axios.get('/cgnData.json').then(res => res.data)
    await commit('setLeads', leads)
    await commit('setFilteredLeads', leads)
  },

  // For filterStatus, filterSearch, and filterOrder we first commit a mutation
  // to store them in the filter object we just created. This way, when we can
  // maintain a single source of truth when calling the filterLeads method.
  async filterOrder ({ commit }, order) {
    await commit('setOrder', order)
    await commit('orderLeads')
  },
  async filterCategory ({ commit, dispatch }, category) {
    await commit('setFilterCategory', category)
    dispatch('filterLeads')
  },
  async filterType ({ commit, dispatch }, type) {
    await commit('setFilterType', type)
    dispatch('filterLeads')
  },
  async filterOrigin ({ commit, dispatch }, origin) {
    await commit('setFilterOrigin', origin)
    dispatch('filterLeads')
  },
  async filterFamily ({ commit, dispatch }, family) {
    await commit('setFilterFamily', family)
    dispatch('filterLeads')
  },
  async filterColor ({ commit, dispatch }, color) {
    await commit('setFilterColor', color)
    dispatch('filterLeads')
  },
  async filterExposure ({ commit, dispatch }, exposure) {
    await commit('setFilterExposure', exposure)
    dispatch('filterLeads')
  },
  async filterSow ({ commit, dispatch }, sow) {
    await commit('setFilterSow', sow)
    dispatch('filterLeads')
  },
  async filterBloom ({ commit, dispatch }, bloom) {
    await commit('setFilterBloom', bloom)
    dispatch('filterLeads')
  },
  async filterSearch ({ commit, dispatch }, search) {
    await commit('setFilterSearch', search)
    dispatch('filterLeads')
  },
  async filterComestible ({ commit, dispatch }, comestible) {
    await commit('setFilterComestible', comestible)
    dispatch('filterLeads')
  },
  async filterHeight ({ commit, dispatch }, height) {
    await commit('setFilterHeight', height)
    dispatch('filterLeads')
  },
  async filterMedicinale ({ commit, dispatch }, medicinale) {
    await commit('setFilterMedicinale', medicinale)
    dispatch('filterLeads')
  },
  async filterEcotype ({ commit, dispatch }, ecotype) {
    await commit('setFilterEcotype', ecotype)
    dispatch('filterLeads')
  },
  async filterPhoto ({ commit, dispatch }, hasPhoto) {
    await commit('setFilterPhoto', hasPhoto)
    dispatch('filterLeads')
  },
  // Since we want to make all of our filters be maintained no matter which
  // value we change the final filterLeads action will first narrow down
  // our list to what we want and then order our new list.
  async filterLeads ({ commit }) {
    await commit('filterLeads')
    await commit('orderLeads')
  },
}

export const mutations = {
  setLeads (state, leads) { state.leads = leads },
  // setFilteredLeads (state, leads) { state.filteredLeads = leads },
  setLead (state, lead) { state.lead = lead },

  // setFilteredLeads gets called after applying a new filter
  // so our Vue component shows only the leads we want to see, without losing our initial list.
  setFilteredLeads (state, leads) { state.filteredLeads = leads },

  // setFilterStatus, setFilterSearch, and setOrder are only responsible
  // for changing the respective value on the filter object.
  setFilterCategory (state, category) { state.filter.category = category },
  setFilterType (state, type) { state.filter.type = type },
  setFilterOrigin (state, origin) { state.filter.origin = origin },
  setFilterFamily (state, family) { state.filter.family = family },
  setFilterColor (state, color) { state.filter.color = color },
  setFilterExposure (state, exposure) { state.filter.exposure = exposure },
  setFilterSow (state, sow) { state.filter.sow = sow },
  setFilterBloom (state, bloom) { state.filter.bloom = bloom },
  setFilterSearch (state, search) { state.filter.search = search },
  setFilterComestible (state, comestible) { state.filter.comestible = comestible },
  setFilterHeight (state, height) { state.filter.height = height },
  setFilterMedicinale (state, medicinale) { state.filter.medicinale = medicinale },
  setFilterEcotype (state, ecotype) { state.filter.ecotype = ecotype },
  setFilterPhoto (state, hasPhoto) { state.filter.hasPhoto = hasPhoto },
  setOrder (state, order) { state.filter.order = order },

  // filterLeads first makes a local copy of all leads. We reset our filteredLeads
  // list to include all leads. Finally, we call our filter method and store this new list on the state.
  filterLeads (state) {
    const leads = [...state.leads]
    state.filteredLeads = leads
    state.filteredLeads = Filters.filterLeads(state.filter, leads)
  },
  // Similarly, orderLeads grabs this new list of filteredLeads,
  // passes it on to our ordering method, and saves our new list.
  orderLeads (state) {
    const leads = [...state.filteredLeads]
    state.filteredLeads = Filters.orderLeads(state.filter.order, leads)
  }
}

export const getters = {
  getLeads (state) { return state.leads },
  getFilteredLeads (state) { return state.filteredLeads },
  getLead (state) { return state.lead }
}

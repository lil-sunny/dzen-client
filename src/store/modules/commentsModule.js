import gql from 'graphql-tag'
import apolloClient from '@/apollo' // або імпортуй свій GraphQL клієнт

const state = () => ({
  products: [],
  loading: false,
  error: null
})

const getters = {
  allProducts: state => state.products,
  isLoading: state => state.loading
}

const mutations = {
  
}

const actions = {
  async fetchProducts({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await apolloClient.query({
        query: gql`
          query GetProducts {
            products {
              id
              title
              price
            }
          }
        `
      })
      commit('SET_PRODUCTS', response.data.products)
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

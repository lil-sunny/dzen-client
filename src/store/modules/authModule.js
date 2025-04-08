import gql from 'graphql-tag'
import apolloClient  from '@/apollo'

const state = () => ({
  user: null
})

const getters = {
  getUser: (state) => {return state.user}
}

const mutations = {
  
}

const actions = {
    
    async login(user) {
        const {data} = await apolloClient.mutate({
            mutation: gql`
                mutation Login {
                    login(loginDto: { password: $username, username: $password })
                }
            `,
            variables: {
                username: user.username,
                password: user.password
            }
        });

        const token = data.login.token

        localStorage.setItem('access-token', token);

        console.log(localStorage.getItem('access-token'));
    },

    async register(user) {
        await apolloClient.mutate({
            mutation: gql`
            mutation Register {
                register(loginDto: { password: $username, username: $password })
            }
            `,
            variables: {
                username: user.username,
                password: user.password
            }
        })
    }

//   async fetchProducts({ commit }) {
//     commit('SET_LOADING', true)
//     try {
//       const response = await apolloClient.query({
//         query: gql`
//           query GetProducts {
//             products {
//               id
//               title
//               price
//             }
//           }
//         `
//       })
//       commit('SET_PRODUCTS', response.data.products)
//     } catch (error) {
//       commit('SET_ERROR', error)
//     } finally {
//       commit('SET_LOADING', false)
//     }
//   },

//   async addProduct({ dispatch }, product) {
//     await apolloClient.mutate({
//       mutation: gql`
//         mutation CreateProduct($input: ProductInput!) {
//           createProduct(input: $input) {
//             id
//           }
//         }
//       `,
//       variables: {
//         input: product
//       }
//     })
//     dispatch('fetchProducts')
//   },

//   async updateProduct({ dispatch }, product) {
//     await apolloClient.mutate({
//       mutation: gql`
//         mutation UpdateProduct($id: ID!, $input: ProductInput!) {
//           updateProduct(id: $id, input: $input) {
//             id
//           }
//         }
//       `,
//       variables: {
//         id: product.id,
//         input: {
//           title: product.title,
//           price: product.price
//         }
//       }
//     })
//     dispatch('fetchProducts')
//   },

//   async deleteProduct({ dispatch }, id) {
//     await apolloClient.mutate({
//       mutation: gql`
//         mutation DeleteProduct($id: ID!) {
//           deleteProduct(id: $id)
//         }
//       `,
//       variables: {
//         id
//       }
//     })
//     dispatch('fetchProducts')
//   }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

import gql from 'graphql-tag'
import apolloClient from '@/apollo'
import { jwtDecode } from 'jwt-decode'

const state = () => ({
  user: null,
})

const getters = {
  getUser: (state) => {
    return state.user
  },
}

const mutations = {}

const actions = {
  async login(_, user) {
    try {
      await apolloClient
        .mutate({
          mutation: gql`
            mutation Login($loginDto: LoginDto!) {
              login(loginDto: $loginDto)
            }
          `,
          variables: {
            loginDto: {
              username: user.username,
              password: user.password,
            },
          },
        })
        .then((response) => {
          const token = response.data.login
          console.log(token)
          if (token) {
            const decoded = jwtDecode(token)
            console.log(JSON.stringify(decoded))
            localStorage.setItem('user', JSON.stringify(decoded))
          }
          localStorage.setItem('access_token', token)
        })
    } catch (err) {
      throw err
    }
  },

  async register(_, user) {
    try {
      await apolloClient
        .mutate({
          mutation: gql`
            mutation Register($loginDto: LoginDto!) {
              register(loginDto: $loginDto)
            }
          `,
          variables: {
            loginDto: {
              username: user.username,
              password: user.password,
            },
          },
        })
        .then(({ data }) => {
          const token = data.register

          if (token) {
            const decoded = jwtDecode(token)
            localStorage.setItem('user', JSON.stringify(decoded))
          }
          localStorage.setItem('access_token', token)
        })
    } catch (err) {
      throw err
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}

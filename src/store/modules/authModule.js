import gql from 'graphql-tag'
import apolloClient from '@/apollo'

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
    const { data } = await apolloClient.mutate({
      mutation: gql`
        mutation Login($loginDto: LoginDto!) {
          login(loginDto: $loginDto) {
            access_token
          }
        }
      `,
      variables: {
        loginDto: {
          username: user.username,
          password: user.password,
        },
      },
    })

    const token = data.login.access_token
    localStorage.setItem('access-token', token)
    console.log('Access token:', token)
  },

  async register(user) {
    console.log({ user })
    try {
      let { data } = await apolloClient.mutate({
        mutation: gql`
          mutation Register({$username: String, $password: String}) {
            register(loginDto: { username: $username, password: $password })
          }
        `,
        variables: {
          username: user.username,
          password: user.password,
        },
      })

      const token = data

      console.log(data)

      localStorage.setItem('access-token', token)

      console.log(localStorage.getItem('access-token'))
    } catch (err) {
      console.log(err)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}

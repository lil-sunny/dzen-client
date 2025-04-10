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

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

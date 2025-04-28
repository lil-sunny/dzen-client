import gql from 'graphql-tag'
import apolloClient from '@/apollo'

const token = localStorage.getItem('access_token')

export default {
  state: {
    posts: [],
  },

  getters: {
    getPosts: (state) => {
      return state.posts
    },
  },

  mutations: {
    GET_ALL_POSTS: (state, data) => {
      state.posts = data
    },
  },

  actions: {
    async getAllPosts({ commit }) {
      try {
        const response = await apolloClient.query({
          query: gql`
            query GetPost {
              getPost {
                author_id
                createdAt
                description
                id
                image_path
                title
                updatedAt
              }
            }
          `,
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
              'Content-Type': 'application/json',
            },
          },
        })

        console.log(response.data.getPost.length)
        commit('GET_ALL_POSTS', response.data.getPost)
      } catch (err) {
        console.error('Error fetching posts:', err)
      }
    },
  },
}

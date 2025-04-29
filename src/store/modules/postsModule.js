import gql from 'graphql-tag'
import apolloClient from '@/apollo'

const token = localStorage.getItem('access_token')

export default {
  state: {
    posts: [],
    post: null
  },

  getters: {
    getPosts: (state) => {
      return state.posts
    },
    getPost: (state) => {
      return state.post
    },
  },

  mutations: {
    GET_ALL_POSTS: (state, data) => {
      state.posts = data
    },

    GET_POST: (state, data) => {
      state.post = data
    },
  },

  actions: {
    async getAllPosts({ commit }) {
      try {
        const response = await apolloClient.query({
          query: gql`
            query GetPosts {
              getPosts {
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

        console.log(response.data.getPosts.length)
        commit('GET_ALL_POSTS', response.data.getPosts)
      } catch (err) {
        console.error('Error fetching posts:', err)
        throw err
      }
    },

    async getOnePost({ commit }, post_id) { 
      post_id = Number(post_id)
      console.log(typeof post_id) 
      try {
        const response = await apolloClient.query({
          query: gql`
            query GetPost($post_id: Int!) {
              getPost(post_id: $post_id) {
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
          variables: {
            post_id
          },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          },
        });

        commit('GET_POST', response.data.getPost)
      } catch (err) {
        console.error('Error fetching posts:', err)
        throw err
      }
    },
  },
}

import gql from 'graphql-tag'
import apolloClient from '@/apollo' // або імпортуй свій GraphQL клієнт
import axios from 'axios'

const state = () => ({
  reply_comment: null,
  comments: [],
  loading: false,
  error: null,
})

const getters = {
  getReplyComment: (state) => state.reply_comment,
  getComments: (state) => state.comments,
  isLoading: (state) => state.loading,
}

const mutations = {
  SET_COMMENTS: (state, data) => {
    state.comments = data
  },

  SET_REPLIED_COMMENT(state, data) {
    state.reply_comment = data
    console.log(state.reply_comment)
  },

  REMOVE_REPLIED_COMMENT(state) {
    state.reply_comment = null
  },

  ADD_COMMENT: (state, data) => {
    if (state.reply_comment) {
      const index = state.comments.findIndex((comment) => comment.id === state.reply_comment.id)
      console.log(state.comments[index].user)

      if (index !== -1) {
        state.comments = [
          ...state.comments.slice(0, index),
          { ...state.comments[index], replies: [...(state.comments[index].replies || []), data] },
          ...state.comments.slice(index + 1),
        ]
      }
    } else {
      state.comments = [...state.comments, data]
    }
  },

  ADD_FILE: (state, data) => {
    if (state.reply_comment) {
      const index = state.comments.findIndex((comment) => comment.id === state.reply_comment.id)

      if (index !== -1) {
        state.comments = [
          ...state.comments.slice(0, index),
          { ...state.comments[index], replies: [...(state.comments[index].replies || []), data] },
          ...state.comments.slice(index + 1),
        ]
      }
    } else {
      state.comments = [...state.comments, data]
    }
  }
}

const actions = {
  async getCommentsOnPost({ commit }, postId) {
    try {
      const response = await apolloClient.query({
        query: gql`
          query GetCommentsOnPost($post_id: Int!) {
            getCommentsOnPost(post_id: $post_id) {
              additional_file_path
              author_id
              createdAt
              id
              post_id
              reply_to_comment_id
              text
              updatedAt
              replies {
                additional_file_path
                author_id
                id
                post_id
                reply_to_comment_id
                text
                updatedAt
                user {
                  avatar_path
                  id
                  username
                }
              }
              user {
                avatar_path
                id
                username
              }
            }
          }
        `,
        variables: {
          post_id: Number(postId),
        },
      })

      // Комітуємо отримані коментарі в state
      commit('SET_COMMENTS', response.data.getCommentsOnPost)
    } catch (error) {
      console.log(error)
    } finally {
    }
  },


  async addComment({ commit }, data) {
    let { text, file, reply_to_comment_id, post_id } = data

    if (!reply_to_comment_id) {
      reply_to_comment_id = null
    }

    try {
      const response = await apolloClient.mutate({
        mutation: gql`
          mutation AddComment(
            $text: String!
            $author_id: Int!
            $post_id: Int!
            $reply_to_comment_id: Int
          ) {
            addComment(
              commentDto: {
                author_id: $author_id
                post_id: $post_id
                text: $text
                reply_to_comment_id: $reply_to_comment_id
              }
            ) {
              id
              author_id
              post_id
              text
              additional_file_path
              reply_to_comment_id
              createdAt
              updatedAt
              user {
                avatar_path
                id
                username
              }
            }
          }
        `,
        variables: {
          text,
          author_id: 1,
          post_id: Number(post_id),
          reply_to_comment_id: reply_to_comment_id,
        },
      })

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('commentId', response.data.id)

        const fileResult = axios
          .post(`http://localhost:5050/comment/upload-file`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            commit('ADD_FILE', res.data)
          })
          .catch((error) => {
            console.error('File upload failed', error)
          })
      }

      commit('ADD_COMMENT', response.data)

      console.log(response.data)
    } catch (err) {
      console.log('Помилка в мутації:', err)
    }
  },

  setRepliedComment({ commit }, data) {
    commit('SET_REPLIED_COMMENT', data)
  },

  removeRepliedComment({ commit }) {
    commit('REMOVE_REPLIED_COMMENT')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}

// mutation AddComment(
//   $text: String!
//   $author_id: Int!
//   $post_id: Int!
//   $reply_to_comment_id: Int
// ) {
//   addComment(
//     commentDto: {
//       author_id: $author_id
//       post_id: $post_id
//       text: $text
//       reply_to_comment_id: $reply_to_comment_id
//     }
//   ) {
//     id
//     author_id
//     post_id
//     text
//     additional_file_path
//     reply_to_comment_id
//     createdAt
//     updatedAt
//   }
// }

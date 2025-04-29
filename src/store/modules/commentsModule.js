import gql from 'graphql-tag'
import apolloClient from '@/apollo'
import axios from 'axios'

const token = localStorage.getItem('access_token')

const storedUser = localStorage.getItem('user')
const parsedUser = JSON.parse(storedUser)

console.log(parsedUser)

function buildCommentTree(comments) {
  const map = {}
  const tree = []

  const clonedComments = comments.map((comment) => ({ ...comment, children: [] }))

  clonedComments.forEach((comment) => {
    map[comment.id] = comment
  })

  clonedComments.forEach((comment) => {
    if (comment.reply_to_comment_id) {
      const parent = map[comment.reply_to_comment_id]
      if (parent) {
        parent.children.push(comment)
      }
    } else {
      tree.push(comment)
    }
  })

  return tree
}

const filterTagsFromText = (text) => {
  const allowedTags = ['i', 'b', 'code']
  const tagRegex = /<(\/)?([a-zA-Z0-9]+)([^>]*)>/g
  let newText = text
  let match

  const tags = []
  while ((match = tagRegex.exec(newText)) !== null) {
    const fullTag = match[0]
    const tagName = match[2].toLowerCase()

    if (allowedTags.includes(tagName)) {
      tags.push(fullTag)
    } else {
      newText = newText.replace(fullTag, '')
    }
  }

  return newText
}

const state = () => ({
  reply_comment: null,
  comments: [],
  tree: [],
  loading: false,
  error: null,
})

const getters = {
  getReplyComment: (state) => state.reply_comment,
  getComments: (state) => state.comments,
  isLoading: (state) => state.loading,
  commentTree: (state) => state.tree,
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
    const clonedComments = [...state.comments, data]
    let newTree = buildCommentTree(clonedComments)
    state.comments = clonedComments
    state.tree = newTree
    state.reply_comment = null
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
  },

  setComments(state, comments) {
    state.comments = comments
    state.tree = buildCommentTree(comments)
    console.log('comments' + state.comments.length)
    console.log('comments in tree' + state.tree.length)
  },
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
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        },
      })

      commit('setComments', response.data.getCommentsOnPost)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  async fetchComments({ commit }, postId) {
    commit('setLoading', true)
    commit('setError', null)
    try {
      const res = await axios.get(`/api/comments/${postId}`)
      commit('setComments', res.data)
    } catch (err) {
      commit('setError', err)
    } finally {
      commit('setLoading', false)
    }
  },

  async addComment({ commit }, data) {
    let { text, file, reply_to_comment_id, post_id } = data

    if (!reply_to_comment_id) {
      reply_to_comment_id = null
    }

    text = filterTagsFromText(text) 

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
          author_id: Number(parsedUser.user_id),
          post_id: Number(post_id),
          reply_to_comment_id,
        },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        },
      })

      console.log({ resposne: response })

      const commentId = response.data.addComment.id

      console.log(commentId)

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('commentId', commentId)

        await axios
          .post('http://localhost:5050/comment/upload-file', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(async () => {
            // Після завантаження файлу виконати мутацію для оновлення коментаря
            const updatedComment = await apolloClient.mutate({
              mutation: gql`
                mutation GetComment($id: Int!) {
                  getComment(comment_id: $id) {
                    id
                    author_id
                    post_id
                    text
                    additional_file_path
                    reply_to_comment_id
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
                id: Number(commentId),
              },
              context: {
                headers: {
                  Authorization: token ? `Bearer ${token}` : '',
                  'Content-Type': 'application/json',
                },
              },
            })
            console.log(updatedComment.data.getComment)
            commit('ADD_COMMENT', updatedComment.data.getComment)
          })
          .catch((err) => {
            console.log('Помилка при завантаженні файлу:', err)
            throw err
          })
      } else {
        console.log(response.data.addComment)
        commit('ADD_COMMENT', response.data.addComment)
      }
    } catch (err) {
      console.log('Помилка в мутації:', err)
      throw err
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

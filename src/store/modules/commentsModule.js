import gql from 'graphql-tag'
import apolloClient from '@/apollo' // або імпортуй свій GraphQL клієнт

const state = () => ({
  comments: [],
  loading: false,
  error: null
})

const getters = {
  getComments: state => state.comments,
  isLoading: state => state.loading
}

const mutations = {
  SET_COMMENTS: (state, data) => {
    state.comments = data;
  }
}

const actions = {
  async getCommentsOnPost({ commit }, postId) {

    try {
      const response = await apolloClient.query({
        query: gql`
          query GetCommentsOnPost($post_id: Int!) {
            getCommentsOnPost(post_id: $post_id) {
              id
              post_id
              reply_to_comment_id
              text
              createdAt
              updatedAt
              additional_file_path
              replies {
                id
                post_id
                reply_to_comment_id
                text
                createdAt
                updatedAt
                additional_file_path
              }
            }
          }
        `,
        variables: {
          post_id: postId
        }
      });

      console.log(response);

      // Комітуємо отримані коментарі в state
      commit('SET_COMMENTS', response.data.getCommentsOnPost);
    } catch (error) {
    } finally {
    }
  },

  async addComment({ commit }, data) {
    const { text, file } = data;
  
    try {
      const response = await apolloClient.mutate({
        mutation: gql`
          mutation AddComment($text: String!) {
            addComment(commentDto: { author_id: 1, post_id: 2, text: $text }) {
              id
              author_id
              post_id
              text
              additional_file_path
              reply_to_comment_id
              createdAt
              updatedAt
              __typename
            }
          }
        `,
        variables: {
          text: text,
          author_id: 1,
          post_id: 2,
        },
      });
  
      console.log(response.data);
    } catch (err) {
      console.log('Помилка в мутації:', err);
    }
  }
  
  

}

export default {
  state,
  getters,
  mutations,
  actions
}

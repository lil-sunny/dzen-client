<script>
import CommentItem from '@/components/Feed/CommentItem.vue'
import CaptchaItem from '@/components/Feed/CaptchaItem.vue'
import { useRouter } from 'vue-router'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    CommentItem,
    CaptchaItem
  },
  data() {
    return {
      text: '',
      file: null,
      fileName: '',
      reply_to_comment_id: null,
      isCaptchaValid: false
    }
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  computed: {
    ...mapGetters(['getComments', 'getReplyComment', 'commentTree', 'getPost']),
    postId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    try {
      console.log(this.postId)
      try {
        await this.getOnePost(this.postId)
      }
      catch (err) {
        console.log(err)
      }

      await this.getCommentsOnPost(this.postId)

    } catch (err) {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions(['addComment', 'getCommentsOnPost', 'removeRepliedComment', 'getOnePost']),

    onCaptchaSuccess(status) {
      this.isCaptchaValid = status
    },

    async sendComment() {
      if (this.isCaptchaValid) {
        if (this.getReplyComment) {
          this.reply_to_comment_id = this.getReplyComment.id
        }

        this.addComment({ text: this.text, file: this.file, post_id: this.postId, reply_to_comment_id: this.reply_to_comment_id })

        this.text = '';
        this.file = null;
        this.fileName = '';
        this.reply_to_comment_id = null;
      }
      else {
        alert('Captcha is not valid')
        this.$refs.captchaRef.resetCaptcha();
      }
    },

    handleFileChange(event) {
      this.file = event.target.files[0];
      this.fileName = this.file ? this.file.name : '';
    },

    replyOnComment(reply_to_comment_id, text) {
      this.reply_comment.id = reply_to_comment_id;
      this.reply_comment.text = text;
    }
  }
}
</script>

<template>
  <div class="bg-gray-800 min-h-screen">
    <div class="container max-w-[1024px] mx-auto">
      <article class="p-4">
        <div class="image_wrapper w-full rounded-4 overflow-hidden relative mb-4">
          <img :src="getPost?.image_path" class="w-full rounded-[25px]" />
          <div class="absolute gradient w-full h-64 md:h-80 rounded-lg z-10"></div>
          <div class="absolute left-0 right-0 bottom-0 p-4 z-30">
            <h1 class="font-bold text-white leading-tight sm:mb-2 group-hover:underline text-2xl md:text-3xl">
              {{ getPost?.title }}
            </h1>
            <div class="text-xs text-white hidden sm:block">
              <div class="flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" class="h-3 mr-1"
                  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z">
                  </path>
                </svg>
                <span class="text-xs text-white">{{ getPost?.createdAt }}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="text-md lg:text-lg text-gray-300">
          {{ getPost?.description }}
        </p>
        <hr class="border-2 my-4 bg-gray-100" />
        <h2 class="text-white font-bold text-lg md:text-xl leading-tight transition group-hover:underline mb-4">
          Comments
        </h2>
        <div class="comments-area-wrapper">


          <!-- comments -->

          <comment-item v-for="comment in commentTree" :key="comment.id" :id="comment.id" :text="comment.text"
            :name="comment.user.username" :avatar_path="comment.user.avatar_path" :children="comment.children"
            :additionalFilePath="comment.additional_file_path" :depth=0 />



          <!-- message area -->
          <div class="message-area p-2 rounded-md bg-[#181a2c]">
            <div class="text-lg text-white mb-3">Add comment</div>

            <div class="p-2 rounded-md bg-[#2b2e47] mb-4" v-if="getReplyComment != null">
              <div class="text-white text-sm flex justify-between items-center">
                <span>Reply to</span>
                <button @click="removeRepliedComment">
                  <span class="material-icons text-gray-500 text-xl">cancel</span>
                </button>
              </div>
              <hr class="text-yellow-100 mt-3">
              <div class="comment-wrapper flex items-center py-2">
                <div class="rounded-[50%] overflow-hidden w-[40px] h-[40px] mr-3">
                  <img :src="getReplyComment.avatar_path" alt="">
                </div>
                <div class="text-gray-300 text">
                  {{ getReplyComment.text }}
                </div>
              </div>
            </div>

            <div class="flex">
              <textarea v-model="text" class="flex-11/12 border-1 border-gray-500 rounded-md p-2 text-white"
                rows="5"></textarea>
              <div class="actions-bar flex-1/12 relative flex flex-col justify-center items-center">
                <input type="file" id="fileInput" class="hidden" @change="handleFileChange" />
                <label for="fileInput"
                  class="cursor-pointer p-2 rounded hover:bg-gray-100 transition flex items-center justify-center">
                  <span class="material-icons text-gray-500 text-xl">upload</span>
                </label>

                <div v-if="fileName" class="text-white mt-2">{{ fileName }}</div>

                <captcha-item ref="captchaRef" @captcha-success="onCaptchaSuccess" />

                <button @click="sendComment"
                  class="button-send bg-blue-400 rounded-[50%] p-4 mt-2 flex items-center justify-center">
                  <span class="material-icons text-white"> send </span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </article>
    </div>
  </div>
</template>

<style scoped></style>

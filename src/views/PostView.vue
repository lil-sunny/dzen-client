<script>
import CommentItem from '@/components/Feed/CommentItem.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    CommentItem,
  },
  data() {
    return {
      text: '',
      file: null, 
    }
  },
  computed: {
    ...mapGetters(['getComments']),
    userId() {
      return this.$route.params.id; 
    },
  },
  mounted() {
    this.getCommentsOnPost(this.userId);
  },
  methods: {
    ...mapActions(['addComment', 'getCommentsOnPost']),

    async sendComment() {
      console.log('Відправляю коментар...')

      this.addComment({ text: this.text, file: this.file })
    },

    handleFileChange(event) {
      this.file = event.target.files[0]
    },
  },
}
</script>

<template>
  <div class="bg-gray-800 min-h-screen">
    <div class="container max-w-[1024px] mx-auto">
      <article class="p-4">
        <div class="image_wrapper w-full rounded-4 overflow-hidden relative mb-4">
          <img
            src="https://images.unsplash.com/photo-1480694313141-fce5e697ee25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=602&h=320q=80"
            class="w-full rounded-[25px]"
          />
          <div class="absolute gradient w-full h-64 md:h-80 rounded-lg z-10"></div>
          <div class="absolute left-0 right-0 bottom-0 p-4 z-30">
            <h1
              class="font-bold text-white leading-tight sm:mb-2 group-hover:underline text-2xl md:text-3xl"
            >
              The technology helping keep women safe on the streets
            </h1>
            <div class="text-xs text-white hidden sm:block">
              <div class="flex items-center">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="clock"
                  class="h-3 mr-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                  ></path>
                </svg>
                <span class="text-xs text-white">20h | Stephen Ainsworth</span>
              </div>
            </div>
          </div>
        </div>
        <h2
          class="text-white font-bold text-lg md:text-xl leading-tight transition group-hover:underline mb-4"
        >
          Google issues warning to location-sharing apps
        </h2>
        <p class="text-md lg:text-lg text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ducimus asperiores officiis
          illum in harum nostrum, vitae natus doloremque autem nobis sit, quos voluptatum sint qui
          eligendi cumque placeat praesentium!
        </p>
        <hr class="border-2 my-4 bg-gray-100" />
        <h2
          class="text-white font-bold text-lg md:text-xl leading-tight transition group-hover:underline mb-4"
        >
          Comments
        </h2>
        <div class="comments-area-wrapper">
          <!-- comment -->
          <!-- <div class="comment-wrapper flex">
            <div class="image-wrapper mr-2">
              <div class="avatar rounded-full overflow-hidden w-[45px] h-[45px]">
                <img
                  src="https://www.tryparrotai.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fparrot-prod-21b3c.appspot.com%2Fo%2Fcommunity%252FcoverPhotos%252F14992f96-5d18-48e3-96c4-7997996cd039%3Falt%3Dmedia%26token%3D76a86f97-01df-4ebf-ac76-0af5bb045616&w=828&q=75"
                  alt=""
                />
              </div>
            </div>
            <div class="message-wrapper flex w-full">
              <div class="triagle-wrapper relative w-[12px] pt-2">
                <div class="triagle top-0 w-[12px]">
                  <svg viewBox="0 0 80 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 51L80 0V92L0 51Z" fill="#209ad3" />
                  </svg>
                </div>
              </div>
              <div class="message w-full overflow-hidden rounded-[10px] shadow-2xl">
                <div class="message-header bg-[#209ad3] py-1 px-3">
                  <span class="text-md text-white">Stephen Ainsworth</span>
                </div>
                <div class="message-text bg-[#27354e] py-2 px-3">
                  <span class="text-md text-white">Stephen Ainsworth</span>
                </div>
              </div>
            </div>
          </div> -->

          <comment-item
            v-for="comment in getComments"
            :key="comment.id"
            :comment="comment"
          ></comment-item>
          
          <!-- answer -->
          <!-- <div class="pl-[50px] my-[30px] comment-wrapper flex">
            <div class="image-wrapper mr-2">
              <div class="avatar rounded-full overflow-hidden w-[45px] h-[45px]">
                <img
                  src="https://www.tryparrotai.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fparrot-prod-21b3c.appspot.com%2Fo%2Fcommunity%252FcoverPhotos%252F14992f96-5d18-48e3-96c4-7997996cd039%3Falt%3Dmedia%26token%3D76a86f97-01df-4ebf-ac76-0af5bb045616&w=828&q=75"
                  alt=""
                />
              </div>
            </div>
            <div class="message-wrapper flex w-full">
              <div class="triagle-wrapper relative w-[12px] pt-2">
                <div class="triagle top-0 w-[12px]">
                  <svg viewBox="0 0 80 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 51L80 0V92L0 51Z" fill="#209ad3" />
                  </svg>
                </div>
              </div>
              <div class="message w-full overflow-hidden rounded-[10px] shadow-2xl">
                <div class="message-header bg-[#209ad3] py-1 px-3">
                  <span class="text-md text-white">Stephen Ainsworth</span>
                </div>
                <div class="message-text bg-[#27354e] py-2 px-3">
                  <span class="text-md text-white">Stephen Ainsworth</span>
                </div>
              </div>
            </div>
          </div> -->
          <!-- message area -->
          <div class="message-area p-2 rounded-md bg-[#181a2c]">
            <div class="text-lg text-white mb-3">Add comment</div>
            <div class="flex">
              <textarea
                v-model="text"
                class="flex-11/12 border-1 border-gray-500 rounded-md p-2 text-white"
                rows="5"
              ></textarea>
              <div class="actions-bar flex-1/12 relative flex flex-col justify-center items-center">
                <input type="file" id="fileInput" class="hidden" @change="handleFileChange" />
                <label
                  for="fileInput"
                  class="cursor-pointer p-2 rounded hover:bg-gray-100 transition flex items-center justify-center"
                >
                  <span class="material-icons text-gray-500 text-xl">upload</span>
                </label>
                <button
                  @click="sendComment"
                  class="button-send bg-blue-400 rounded-[50%] p-4 mt-2 flex items-center justify-center"
                >
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

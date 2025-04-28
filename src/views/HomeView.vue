<script>
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  data() {
    return {
        bigPosts: null,
        smallPostsLeft: null,
        smallPostsRigth: null
    }
  },
  computed: {
    ...mapGetters(['getPosts']),
  },
  methods: {
    ...mapActions(['getAllPosts']),
  },
  async mounted() {
    await this.getAllPosts();
  },
});
</script>

<!-- <template>
    <main>
      <div class="bg-gray-800 min-h-screen">
        <div class="max-w-screen-xl mx-auto p-4">
          <div class="flex flex-col md:flex-row -mx-1.5 px-4 pt-4">
            <a
              href="https://www.bbc.co.uk/news/technology-59520815"
              target="_blank"
              class="h-64 md:h-80 w-full md:w-1/2 mx-1.5 mb-4 md:mb-0 group"
              v-for="(i, key) in bigPosts"
              :key="key"
            >
              <div class="h-64 md:h-80 relative">
                <img
                  v-if="bigPosts[key]?.image_path"
                  :src="bigPosts[key].image_path"
                  class="min-h-[100%]"
                  alt="Image"
                />
                <div class="absolute gradient w-full h-64 md:h-80 rounded-lg z-10"></div>
                <div class="absolute left-0 right-0 bottom-0 p-4 z-30">
                  <h1 class="font-bold text-white leading-tight sm:mb-2 group-hover:underline text-2xl md:text-3xl">
                    {{ bigPosts[key]?.title }}
                  </h1>
                </div>
              </div>
            </a>
          </div>
          <div class="flex flex-col md:flex-row -mx-1.5 p-4">
            <div class="w-full md:w-1/2 mx-1.5">
              <a
                v-for="(i, key) in smallPostsLeft"
                :key="'left-' + key"
                href="https://www.bbc.co.uk/news/technology-59609996"
                target="_blank"
                class="flex items-center group mb-3 pb-3 border-b border-gray-800"
              >
                <img
                  v-if="smallPostsLeft[key]?.image_path"
                  :src="smallPostsLeft[key].image_path"
                  class="rounded-md object-cover mr-3 h-24 w-24"
                  alt="Image"
                />
                <div class="flex-1">
                  <h2 class="text-white font-bold text-lg md:text-xl leading-tight transition group-hover:underline mb-2">
                    {{ smallPostsLeft[key]?.title }}
                  </h2>
                </div>
              </a>
            </div>
            <div class="w-full md:w-1/2 mx-1.5">
              <a
                v-for="(i, key) in smallPostsRight"
                :key="'right-' + key"
                href="https://www.bbc.co.uk/news/world-asia-india-59627124"
                target="_blank"
                class="flex items-center group mb-3 pb-3 border-b border-gray-800"
              >
                <img
                  v-if="smallPostsRight[key]?.image_path"
                  :src="smallPostsRight[key].image_path"
                  class="rounded-md object-cover mr-3 h-24 w-24"
                  alt="Image"
                />
                <div class="flex-1">
                  <h2 class="text-white font-bold text-lg md:text-xl leading-tight transition group-hover:underline mb-2">
                    {{ smallPostsRight[key]?.title }}
                  </h2>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template> -->
  

<template>
    <main>
    <div class="bg-gray-800 min-h-screen">
        <div class="max-w-screen-xl mx-auto p-4">
          <div class="grid grid-cols-2 gap-4">
            <a href="https://www.bbc.co.uk/news/technology-59520815" target="_blank" class="" v-for="post in getPosts" :key="post.id">
              <div class="h-64 md:h-80 relative">
                <img :src="post.image_path" class="absolute z-0 object-cover w-full h-64 md:h-80 rounded-lg">
                <div class="absolute gradient w-full h-64 md:h-80 rounded-lg z-10"></div>
                <div class="absolute left-0 right-0 bottom-0 p-4 z-30">
                  <h1 class="font-bold text-white leading-tight sm:mb-2 group-hover:underline text-2xl md:text-3xl">{{post.title}}</h1>
                  <div class="text-xs text-white hidden sm:block">
                    <div class="flex items-center">
                      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" class="h-3 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
                      </svg>
                      <span class="text-xs text-white">{{post.createdAt}} | Stephen Ainsworth</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            
          </div>
        </div>
      </div>
  </main>
</template>

<style scoped>

</style>

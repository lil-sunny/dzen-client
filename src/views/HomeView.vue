<script>
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import ProfilePanel from '@/components/Auth/ProfilePanel.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ProfilePanel
  },
  data() {
    return {
      bigPosts: null,
      smallPostsLeft: null,
      smallPostsRigth: null,
    }
  },
  computed: {
    ...mapGetters(['getPosts']),
  },
  methods: {
    ...mapActions(['getAllPosts']),
  },
  setup() {
    const router = useRouter()
  },
  async mounted() {
    try {
      await this.getAllPosts();
    }
    catch (err) {
      this.$router.push('/login');
    }
  },
});
</script>

<template>
  <main>
    <div class="bg-gray-800 min-h-screen">
      <div class="max-w-screen-xl mx-auto p-4">
        <div class="grid grid-cols-2 gap-4">
          <RouterLink v-for="post in getPosts" :key="post.id" :to="`/post/${post.id}`" target="_blank">
            <div class="h-64 md:h-80 relative">
              <img :src="post.image_path" class="absolute z-0 object-cover w-full h-64 md:h-80 rounded-lg">
              <div class="absolute gradient w-full h-64 md:h-80 rounded-lg z-10"></div>
              <div class="absolute left-0 right-0 bottom-0 p-4 z-30">
                <h1 class="font-bold text-white leading-tight sm:mb-2 group-hover:underline text-2xl md:text-3xl">
                  {{ post.title }}</h1>
                <div class="text-xs text-white hidden sm:block">
                  <div class="flex items-center">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" class="h-3 mr-1"
                      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z">
                      </path>
                    </svg>
                    <span class="text-xs text-white">{{ post.createdAt }}</span>
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

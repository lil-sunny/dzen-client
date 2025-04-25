<script>
import { mapActions } from 'vuex';

export default {
  name: 'CommentItem',
  data() {
    return {
      showLightbox: false,
    }
  },
  props: {
    id: Number,
    name: String,
    text: String,
    avatar_path: String,
    additionalFilePath: String,
    children: {
      type: Array,
      default: () => []
    },
    depth: Number,
  },
  methods: {
    ...mapActions(['setRepliedComment']),
    replyOn() {
      this.$emit('replyOn', (this.id, this.text));
    }
  },
  computed: {
    isImageFile() {
      const ext = this.additionalFilePath?.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg'].includes(ext);
    }
  }
}
</script>

<template>
  <div class="comment_area" :style="{ paddingLeft: `${depth * 20}px` }">
    <div class="comment-wrapper flex my-3">
      <div class="image-wrapper mr-2">
        <div class="avatar rounded-full overflow-hidden w-[45px] h-[45px]">
          <img :src="avatar_path" alt="" />
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
          <div class="message-header bg-[#209ad3] py-1 px-3 flex justify-between">
            <span class="text-md text-white">{{ name }}</span>
            <button class="reply-btn text-white" @click="setRepliedComment({ id, text, avatar_path })">
              <span class="material-icons"> reply </span>
            </button>
          </div>
          <div class="message-text bg-[#27354e] py-2 px-3">
            <div class="text-md text-white">{{ text }}</div>
            <div class="additional-file mt-8" v-if="additionalFilePath">
              <img v-if="isImageFile" :src="'http://localhost:5050' + additionalFilePath"
                alt="Click to open in lightbox" @click="showLightbox = true"
                class="cursor-pointer w-[100px] rounded-lg" />

              <a v-else :href="'http://localhost:5050' + additionalFilePath" target="_blank"
                class="text-blue-400 underline hover:text-blue-600">
                📄 Переглянути файл
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>


    <comment-item v-for="child in children" :key="child.id" :id="child.id" :text="child.text"
      :additionalFilePath="child.additional_file_path" :name="child.user.username" :avatar_path="child.user.avatar_path"
      :children="child.children" :depth="this.depth + 1" />

    <div class="lightbox additional-file" v-if="showLightbox" @click="showLightbox = false">
      <img class="cursor-pointer rounded-lg w-[50%] lg:w-[30%] animate-scale-in"
        :src="'http://localhost:5050' + additionalFilePath" />
    </div>
  </div>
</template>

<style scoped>
.lightbox {
  position: fixed;
  background: rgba(5, 9, 31, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9999;
}

/* Додамо анімацію */
.lightbox img {
  animation: scaleIn 0.3s ease forwards;
  transform: scale(0.8);
  /* Початковий стан */
  opacity: 0;
}

@keyframes scaleIn {
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
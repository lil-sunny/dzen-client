<script>
import { mapActions } from 'vuex';

export default {
  name: 'CommentItem',
  props: {
    id: Number,
    name: String,
    text: String,
    avatar_path: String,
  },
  computed: {
  },
  methods: {
    ...mapActions(['setRepliedComment']),

    replyOn() {
      this.$emit('replyOn', (this.id, this.text));   
    }
  }
}
</script>

<template>
  <div class="comment_area">
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
            <button class="reply-btn text-white" @click="setRepliedComment({id, text, avatar_path})">
              <span class="material-icons"> reply </span>
            </button>
          </div>
          <div class="message-text bg-[#27354e] py-2 px-3">
            <span class="text-md text-white">{{ text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

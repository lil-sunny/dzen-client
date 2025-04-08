<script>
import LoginForm from '@/components/Auth/LoginForm.vue';

export default {
    components: {
        LoginForm
    }
}
</script>

<template>
    <div class="login h-[100vh] flex items-center justify-center">
        <div class="image-wrapper w-full h-full flex items-center justify-center">
            <div class="bg-[#ffffffa8] backdrop-blur-md sm:w-[100%] lg:w-[600px] h-full flex items-center justify-center">
                <login-form />
            </div>
        </div>
    </div>
  </template>
  
  <style scoped>
    .image-wrapper {
        background: url('https://plus.unsplash.com/premium_photo-1681400745727-c69f8e47f524?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFic3RyYWN0fGVufDB8fDB8fHww') no-repeat;
        background-size: cover;
    }
  </style>
  
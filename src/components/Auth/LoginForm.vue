<script>
import { mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      v$: null,
    };
  },
  validations() {
    return {
      formData: {
        username: { required },
        password: { required, minLength: minLength(8) },
      },
    };
  },
  created() {
    this.v$ = useVuelidate();
  },
  methods: {
    ...mapActions(['login']), // Use the namespaced module here
    submitForm() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        let errorMessage = 'Please fill out all required fields correctly.\n';

        if (this.v$.formData.username.$invalid) {
          errorMessage += 'Username is required.\n';
        }

        if (this.v$.formData.password.$invalid) {
          const errors = this.v$.formData.password.$errors;
          for (const err of errors) {
            if (err.$validator === 'required') {
              errorMessage += 'Password is required.\n';
            }
            if (err.$validator === 'minLength') {
              errorMessage += 'Password must be at least 8 characters long.\n';
            }
          }
        }

        alert(errorMessage);
      } else {
        try {
          this.login({
            username: this.formData.username,
            password: this.formData.password,
          });
          alert('Login success!');
        } catch (err) {
          alert('Login error: ' + err.message);
        }
      }
    },
  },
};
</script>

<template>
  <div class="login-form-wrapper min-w-[260px]">
    <form class="mb-4 text-[14px]" action="/" method="post">
      <div class="my-3">
        <label for="username" class="font-bold block text-xs mb-1">Username<span class="ml-1 text-red-700">*</span></label>
        <input
          v-model="formData.username"
          class="w-full border rounded p-1 outline-none focus:shadow-outline"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          :class="{'border-red-500': v$.username?.$invalid && v$.username?.$touched}"
        />
      </div>
      <div class="my-3">
        <label for="password" class="font-bold block text-xs mb-1">Password <span class="ml-1 text-red-700">*</span></label>
        <input
          v-model="formData.password"
          class="w-full border rounded p-1 outline-none focus:shadow-outline"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="btn-wrapper flex flex-col items-center justify-center">
        <button
          @click.prevent="submitForm"
          class="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded mx-auto"
        >
          Login
        </button>
        <a class="text-green-700 text-center">
            Haven't account? 
            <router-link to="register">Register</router-link>
        </a>
      </div>
    </form>
  </div>
</template>

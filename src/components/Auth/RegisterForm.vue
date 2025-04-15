<script>
import { required, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        repassword: ''
      }
    };
  },
  validations() {
    return {
      formData: {
        username: { required },
        password: { required, minLength: minLength(8) },
        repassword: { required }
      }
    };
  },
  methods: {
    ...mapActions(['register']), 
    async submitForm() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        let errorMessage = "Please fill out all required fields correctly.\n";

        if (this.v$.formData.username.$invalid) {
          errorMessage += "Username is required.\n";
        }

        if (this.v$.formData.password.$invalid) {
          const errors = this.v$.formData.password.$errors;
          for (const err of errors) {
            if (err.$validator === 'required') {
              errorMessage += "Password is required.\n";
            }
            if (err.$validator === 'minLength') {
              errorMessage += "Password must be at least 8 characters long.\n";
            }
          }
        }

        if (this.formData.password !== this.formData.repassword) {
            errorMessage += "Passwords do not match.\n";
        }

        alert(errorMessage);
      } else {
        try {
          await this.register({
            username: this.formData.username,
            password: this.formData.password
          });
          alert("Register successful!");
        } catch (err) {
          alert("Login failed: " + err.message);
          console.log(err);
        }
      }
    }
  },
  setup() {
    return {
      v$: useVuelidate()
    };
  }
};
</script>


<template>
  <div class="login-form-wrapper min-w-[260px]">
    <form class="mb-4 text-[14px]" action="/" method="post">
      <div class="my-3">
        <label for="username" class="block text-xs mb-1">Username <span class="ml-1 text-red-700">*</span></label>
        <input
          class="w-full border rounded p-1 outline-none focus:shadow-outline"
          type="text"
          name="username"
          id="username"
          placeholder="Username or username"
          v-model="formData.username"
          :class="{'border-red-500': v$.password?.$invalid && v$.password?.$touched}"

        />
      </div>
      <div class="my-3">
        <label for="password" class="block text-xs mb-1">Password <span class="ml-1 text-red-700">*</span></label>
        <input
          class="w-full border rounded p-1 outline-none focus:shadow-outline"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
           v-model="formData.password"
          :class="{'border-red-500': v$.password?.$invalid && v$.password?.$touched}"

        />
      </div>
      <div class="my-3">
        <label for="password" class="block text-xs mb-1">re-Password <span class="ml-1 text-red-700">*</span></label>
        <input
          class="w-full border rounded p-1 outline-none focus:shadow-outline"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          v-model="formData.repassword"
          :class="{'border-red-500': formData.password !== formData.repassword}"

        />
      </div>
      <div class="btn-wrapper flex flex-col items-center justify-center">
        <button
          class="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded mx-auto"
          @click.prevent="submitForm"
        >
          Register
        </button>
        <span class="text-black text-center mt-3">
            Have an account? 
            <router-link class="text-green-700 text-center" to="login">Login</router-link>
        </span>
      </div>
    </form>
  </div>
</template>

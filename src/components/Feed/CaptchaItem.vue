<script>
export default {
    data() {
        return {
            num1: null,
            num2: null,
            result: null,
        }
    },
    mounted() {
        this.num1 = Math.floor(Math.random() * 10) + 1
        this.num2 = Math.floor(Math.random() * 10) + 1
    },
    methods: {
        checkCaptcha() {
            if (this.result == this.num1 + this.num2) {
                this.$emit('captcha-success', true)
            }
        },
        resetCaptcha() {
            this.num1 = Math.floor(Math.random() * 10) + 1;
            this.num2 = Math.floor(Math.random() * 10) + 1;
            this.result = null;
        }
    },
    emits: ['captcha-success'],
}
</script>

<template>
    <div class="captcha flex text-white">
        <p>{{ num1 }} + {{ num2 }} = </p>
        <input class="w-[24px] ml-2" v-model.number="result" @input="checkCaptcha" placeholder="?" />
    </div>
</template>
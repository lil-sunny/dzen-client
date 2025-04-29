<script>
export default {}
</script>

<template>
    <div class="profile-pannel-wrapper fixed top-2 right-2">
        <div class="relative">
            <div class="w-[50px] h-[50px] rounded-[50%] bg-amber-200"></div>
            <div class="panel rounded bg-white p-4 w-[420px] max-w-[420px] absolute left-0 bottom-0">
                <div class="my-3">
                    <label for="password" class="font-bold block text-xs mb-1">Change avatar<span
                            class="ml-1 text-red-700">*</span></label>
                    <input class="w-full border rounded p-1 outline-none focus:shadow-outline" type="password"
                        name="password" id="password" placeholder="Password"
                    />
                </div>
                <button class="btn bg-green-600 text-white p-2 rounded ">
                    Confirm avatar
                </button>
            </div>
        </div>
    </div>
</template>
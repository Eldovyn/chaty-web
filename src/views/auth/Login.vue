<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AiOutlineEye } from 'vue-icons-lib/ai'
import { ref } from "vue"
import { AiOutlineEyeInvisible } from 'vue-icons-lib/ai'

const showPassword = ref(false)

function togglePassword() {
    showPassword.value = !showPassword.value
}
</script>

<template>
    <section class="login h-screen bg-[#f5f5f5] flex justify-center items-center">
        <div class="flex flex-col w-[30%] p-10 bg-white rounded-md text-black">
            <h1 class="text-3xl font-bold text-center">Welcome Back To Chaty</h1>
            <p class="text-sm text-center">Sign in to your account</p>
            <br>
            <br>
            <form action="" class="flex flex-col p-5 gap-5">
                <div class="input-email w-full flex flex-col gap-1">
                    <Label for="email">Email</Label>
                    <Input type="email" placeholder="your email" />
                </div>
                <div class="input-password w-full flex flex-col gap-1 mb-5">
                    <Label for="password">Password</Label>
                    <div class="relative">
                        <Input id="password" :type="showPassword ? 'text' : 'password'" placeholder="your password"
                            class="pr-10" />
                        <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500">
                            <AiOutlineEye @click="togglePassword" v-if="!showPassword" class="w-4 h-4" />
                            <AiOutlineEyeInvisible @click="togglePassword" v-else class="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <Button type="submit" class="bg-blue-600 hover:bg-blue-700 cursor-pointer">Sign In</Button>
                <div class="flex flex-row items-center justify-center w-[42%] mx-auto gap-5">
                    <Separator />
                    <p class="px-2">or</p>
                    <Separator />
                </div>
                <div class="flex flex-row gap-5 justify-center w-[95%] mx-auto">
                    <Button type="submit"
                        class="bg-black hover:bg-black flex justify-center items-center w-1/2 cursor-pointer">
                        <img src="/icon-google.png" alt="" class="w-8">
                        <p>Sign In With Google</p>
                    </Button>
                    <Button type="submit"
                        class="bg-white hover:bg-white flex justify-center items-center w-1/2 border border-black cursor-pointer">
                        <img src="/icon-github.png" alt="" class="w-6">
                        <p class="text-black">Sign In With Github</p>
                    </Button>
                </div>
            </form>
        </div>
    </section>
</template>
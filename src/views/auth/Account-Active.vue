<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref } from "vue"
import { useMutation } from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import { axiosInstance } from '@/lib/axios'
import { toast } from 'vue-sonner'
import {
    PinInput,
    PinInputGroup,
    PinInputSeparator,
    PinInputSlot,
} from "@/components/ui/pin-input"
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from '@/composables/useCookies'

const cookies = useCookies()

const value = ref<string[]>([])
const handleComplete = (e: string[]) => mutate(e.join(""))

const router = useRouter()
const route = useRoute()

const token = route.query.token

const goToHome = async () => {
    router.push('/')
}

const isSubmitting = ref(false)

const apiVerification = async (input: string) => {
    const response = await axiosInstance.post(`/auth/account-active/activation/${token}`, { otp: input })
    return response.data
}

const { mutate } = useMutation({
    mutationFn: async (input: string) => {
        const response = apiVerification(input)
        return response
    },
    onError: (error) => {
        const err = error as AxiosError<ErrorResponse>;
        toast.error((err.response?.data?.message as string) || '');
        return;
    },
    onSuccess: async (data) => {
        toast.success(data.message);
        cookies.set('access_token', data.token.access_token);
        goToHome();
    },
})

function onSubmit() {
    isSubmitting.value = true
    const otp = value.value.join("")
    mutate(otp)
    isSubmitting.value = false
}
</script>

<template>
    <section class="login h-screen bg-[#f5f5f5] flex justify-center items-center">
        <div class="flex flex-col w-[30%] p-10 bg-white rounded-md text-black">
            <h1 class="text-3xl font-bold text-center">Welcome Back To Chaty</h1>
            <p class="text-sm text-center">Please enter your verification code</p>
            <br>
            <form @submit.prevent="onSubmit" class="flex flex-col p-5">
                <PinInput id="pin-input" v-model="value" placeholder="○" class="mx-auto mb-5"
                    @complete="handleComplete">
                    <PinInputGroup class="gap-1">
                        <template v-for="(id, index) in 4" :key="id">
                            <PinInputSlot class="rounded-md border" :index="index" />
                            <template v-if="index !== 3">
                                <PinInputSeparator />
                            </template>
                        </template>
                    </PinInputGroup>
                </PinInput>
                <Button type="submit"
                    class="bg-blue-600 hover:bg-blue-700 cursor-pointer mb-3 w-50 mx-auto">Verification</Button>
            </form>
        </div>
    </section>
</template>
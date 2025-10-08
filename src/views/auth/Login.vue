<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AiOutlineEye } from 'vue-icons-lib/ai'
import { ref, reactive, computed } from "vue"
import { AiOutlineEyeInvisible } from 'vue-icons-lib/ai'
import { useMutation } from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import { axiosInstance } from '@/lib/axios'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { useCookies } from '@/composables/useCookies'

const cookies = useCookies()

const router = useRouter()

const goToHome = async () => {
    router.push('/')
}

const showPassword = ref(false)

function togglePassword() {
    showPassword.value = !showPassword.value
}

const inputFormLogin = reactive<LoginInput>({
    email: '',
    password: '',
    provider: ''
})

const formErrors = reactive<FormErrorsRegister>({
    email: [],
    password: [],
});

const isEmailError = computed(() => {
    return (formErrors.email ?? []).length > 0;
});
const isPasswordError = computed(() => {
    return (formErrors.password ?? []).length > 0;
});

const emailErrorMessage = computed(() => {
    const err = formErrors.email?.[0];
    switch (err) {
        case 'IS_REQUIRED':
            return 'email is required';
        case 'IS_INVALID':
            return 'invalid email';
        default:
            return 'invalid email';
    }
});

const passwordErrorMessage = computed(() => {
    const err = formErrors.password?.[0];
    switch (err) {
        case 'IS_REQUIRED':
            return 'password is required';
        case 'IS_INVALID':
            return 'invalid password';
        default:
            return 'invalid password';
    }
});

const isSubmitting = ref(false)

const handleValidation = (errors: FormErrorsRegister) => {
    formErrors.email = errors.email || []
    formErrors.username = errors.username || []
    formErrors.password = errors.password || []
    formErrors.confirm_password = errors.confirm_password || []
    formErrors.password_security = errors.password_security || []
    formErrors.password_match = errors.password_match || []
};

const clearValidation = () => {
    formErrors.email = []
    formErrors.username = []
    formErrors.password = []
    formErrors.confirm_password = []
    formErrors.password_security = []
    formErrors.password_match = []
}

const clearForm = () => {
    inputFormLogin.email = ''
    inputFormLogin.password = ''
    inputFormLogin.provider = ''
}

const apiLogin = async (input: LoginInput) => {
    const response = await axiosInstance.post('/auth/login', input)
    return response.data
}

const { mutate } = useMutation({
    mutationFn: async (input: LoginInput) => {
        input.provider = 'auth_internal'
        const response = apiLogin(input)
        return response
    },
    onError: (error) => {
        const err = error as AxiosError<ErrorResponse>;
        if (err.response?.status === 400 && err.response.data.errors) {
            handleValidation({
                email: err.response?.data?.errors?.email ?? [],
                password: err.response?.data?.errors?.password ?? [],
                username: err.response?.data?.errors?.username ?? [],
                confirm_password: err.response?.data?.errors?.confirm_password ?? [],
                password_security: err.response?.data?.errors?.password_security ?? [],
                password_match: err.response?.data?.errors?.password_match ?? [],
            });
            toast.error(err.response?.data?.message);
            return;
        }
        if (err.response?.status === 403) {
            clearValidation();
            clearForm();
            toast.error('check your email for verification');
            return;
        }
        toast.error((err.response?.data?.message as string) || '');
        return;
    },
    onSuccess: async (data) => {
        toast.success(data.message);
        clearForm();
        clearValidation();
        cookies.set('access_token', data.token.access_token);
        goToHome();
    },
})

function onSubmit() {
    isSubmitting.value = true
    mutate({ ...inputFormLogin })
    isSubmitting.value = false
}
</script>

<template>
    <section class="login h-screen bg-[#f5f5f5] flex justify-center items-center">
        <div class="flex flex-col w-[30%] p-10 bg-white rounded-md text-black">
            <h1 class="text-3xl font-bold text-center">Welcome Back To Chaty</h1>
            <p class="text-sm text-center">Sign in to your account</p>
            <br>
            <br>
            <form @submit.prevent="onSubmit" class="flex flex-col p-5">
                <div class="input-email w-full flex flex-col gap-1 mb-5">
                    <Label for="email">Email</Label>
                    <Input type="text" v-model="inputFormLogin.email" placeholder="your email"
                        :class="{ 'border border-red-500': isEmailError }" />
                    <p v-if="isEmailError" class="text-[10px] text-right me-3 text-[#C10007]">
                        {{ emailErrorMessage }}
                    </p>
                </div>
                <div class="input-password w-full flex flex-col gap-1 mb-5">
                    <Label for="password">Password</Label>
                    <div class="relative">
                        <Input id="password" v-model="inputFormLogin.password"
                            :type="showPassword ? 'text' : 'password'" placeholder="your password"
                            :class="{ 'border border-red-500': isPasswordError }" />
                        <button type="button"
                            class="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer">
                            <AiOutlineEye @click="togglePassword" v-if="!showPassword" class="w-4 h-4" />
                            <AiOutlineEyeInvisible @click="togglePassword" v-else class="w-4 h-4" />
                        </button>
                    </div>
                    <p v-if="isPasswordError" class="text-[10px] text-right me-3 text-[#C10007]">
                        {{ passwordErrorMessage }}
                    </p>
                </div>
                <Button type="submit" class="bg-blue-600 hover:bg-blue-700 cursor-pointer mb-3">Sign In</Button>
                <p class="text-[12px] text-right mb-5">dont have an account? <router-link to="/register"
                        class="text-blue-600 underline">sign up</router-link>
                </p>
                <div class="flex flex-row items-center justify-center w-[42%] mx-auto gap-5 mb-5">
                    <Separator />
                    <p class="px-2">or</p>
                    <Separator />
                </div>
                <div class="flex flex-row gap-5 justify-center w-[95%] mx-auto">
                    <Button type="button"
                        class="bg-black hover:bg-black flex justify-center items-center w-1/2 cursor-pointer">
                        <img src="/icon-google.png" alt="" class="w-8">
                        <p>Sign In With Google</p>
                    </Button>
                    <Button type="button"
                        class="bg-white hover:bg-white flex justify-center items-center w-1/2 border border-black cursor-pointer">
                        <img src="/icon-github.png" alt="" class="w-6">
                        <p class="text-black">Sign In With Github</p>
                    </Button>
                </div>
            </form>
        </div>
    </section>
</template>
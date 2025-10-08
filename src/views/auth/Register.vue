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

const router = useRouter()

const goToLogin = async () => {
    router.push('/login')
}

const inputFormRegister = reactive<RegisterInput>({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    provider: ''
})

const formErrors = reactive<FormErrorsRegister>({
    email: [],
    password: [],
    username: [],
    password_security: [],
    password_match: [],
    confirm_password: [],
});

const isEmailError = computed(() => {
    return (formErrors.email ?? []).length > 0;
});
const isUsernameError = computed(() => {
    return (formErrors.username ?? []).length > 0;
})
const isPasswordError = computed(() => {
    return (formErrors.password ?? []).length > 0;
});
const isConfirmPasswordError = computed(() => {
    return (formErrors.confirm_password ?? []).length > 0;
});
const isPasswordSecurityError = computed(() => {
    return (formErrors.password_security ?? []).length > 0;
});
const isPasswordMatchError = computed(() => {
    return (formErrors.password_match ?? []).length > 0;
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

const usernameErrorMessage = computed(() => {
    const err = formErrors.username?.[0];
    switch (err) {
        case 'IS_REQUIRED':
            return 'username is required';
        case 'IS_INVALID':
            return 'invalid username';
        default:
            return 'invalid username';
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

const confirmPasswordErrorMessage = computed(() => {
    const err = formErrors.confirm_password?.[0];
    switch (err) {
        case 'IS_REQUIRED':
            return 'confirm password is required';
        case 'IS_INVALID':
            return 'invalid confirm password';
        default:
            return 'invalid confirm password';
    }
});

const passwordSecurityErrorMessage = computed(() => {
    const err = formErrors.password_security?.[0];
    switch (err) {
        case 'NO_CAPITAL':
            return 'at least one capital letter';
        case 'NO_NUMBER':
            return 'at least one number';
        case 'NO_SYMBOL':
            return 'at least one symbol';
        case 'NO_LOWERCASE':
            return 'at least one lowercase letter';
        case 'TOO_SHORT':
            return 'password too short';
        case 'TOO_LONG':
            return 'password too long';
        case "NO_LETTER":
            return 'at least one letter';
        default:
            return 'invalid password security';
    }
});

const passwordMatchErrorMessage = computed(() => {
    const err = formErrors.password_match?.[0];
    switch (err) {
        case "IS_MISMATCH":
            return 'password not match';
        default:
            return 'invalid password match';
    }
});

const isSubmitting = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)

function togglePassword() {
    showPassword.value = !showPassword.value
}

function toggleConfirmPassword() {
    showConfirmPassword.value = !showConfirmPassword.value
}

const handleValidation = (errors: FormErrorsRegister) => {
    formErrors.email = errors.email || []
    formErrors.username = errors.username || []
    formErrors.password = errors.password || []
    formErrors.confirm_password = errors.confirm_password || []
    formErrors.password_security = errors.password_security || []
    formErrors.password_match = errors.password_match || []
};

const apiRegister = async (input: RegisterInput) => {
    const response = await axiosInstance.post('/auth/register', input)
    return response.data
}

const { mutate } = useMutation({
    mutationFn: async (input: RegisterInput) => {
        input.provider = 'auth_internal'
        const response = apiRegister(input)
        return response
    },
    onError: (error) => {
        const err = error as AxiosError<ErrorResponse>;
        console.log(err.response?.data);
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
        toast.error((err.response?.data?.message as string) || '');
        return;
    },
    onSuccess: async (data) => {
        toast.success(data.message)
        inputFormRegister.email = ''
        inputFormRegister.username = ''
        inputFormRegister.password = ''
        inputFormRegister.confirm_password = ''
        inputFormRegister.provider = ''
        goToLogin()
    },
})

function onSubmit() {
    isSubmitting.value = true
    mutate({ ...inputFormRegister })
    isSubmitting.value = false
}
</script>

<template>
    <section class="login h-screen bg-[#f5f5f5] flex justify-center items-center">
        <div class="flex flex-col w-[30%] p-10 bg-white rounded-md text-black">
            <h1 class="text-3xl font-bold text-center">Welcome Back To Chaty</h1>
            <p class="text-sm text-center">Sign up to your account</p>
            <br>
            <br>
            <form @submit.prevent="onSubmit" class="flex flex-col p-5">
                <div
                    :class="{ 'input-email w-full flex flex-col gap-1': true, 'mb-5': !isEmailError, 'mb-3': isEmailError }">
                    <Label for="email">Email</Label>
                    <Input type="text" v-model="inputFormRegister.email" placeholder="your email"
                        :class="{ 'border border-red-500': isEmailError }" />
                    <p v-if="isEmailError" class="text-[10px] text-right me-3 text-[#C10007]">
                        {{ emailErrorMessage }}
                    </p>
                </div>
                <div
                    :class="{ 'input-username w-full flex flex-col gap-1': true, 'mb-5': !isUsernameError, 'mb-3': isUsernameError }">
                    <Label for="username">Username</Label>
                    <Input type="text" v-model="inputFormRegister.username" placeholder="your usernme"
                        :class="{ 'border border-red-500': isUsernameError }" />
                    <p v-if="isUsernameError" class="text-[10px] text-right me-3 text-[#C10007]">
                        {{ usernameErrorMessage }}
                    </p>
                </div>
                <div
                    :class="{ 'input-password w-full flex flex-col gap-1': true, 'mb-5': !isPasswordError, 'mb-3': isPasswordError }">
                    <Label for="password">Password</Label>
                    <div class="relative">
                        <Input id="password" v-model="inputFormRegister.password"
                            :type="showPassword ? 'text' : 'password'" placeholder="your password"
                            :class="{ 'border border-red-500': isPasswordError || isPasswordMatchError || isPasswordSecurityError }" />
                        <button type="button"
                            class="absolute inset-y-0 right-3 flex items-center text-gray-500 cusror-pointer">
                            <AiOutlineEye @click="togglePassword" v-if="!showPassword"
                                :class="{ 'w-4 h-4 cursor-pointer': true, 'text-red-500': isPasswordError || isPasswordMatchError || isPasswordSecurityError }" />
                            <AiOutlineEyeInvisible @click="togglePassword" v-else
                                :class="{ 'w-4 h-4 cursor-pointer': true, 'text-red-500': isPasswordError || isPasswordMatchError || isPasswordSecurityError }" />
                        </button>
                    </div>
                    <p v-if="isPasswordError" class="text-[10px] text-right me-3 text-[#C10007]">
                        {{ passwordErrorMessage }}
                    </p>
                </div>
                <div
                    :class="{ 'input-confirm-password w-full flex flex-col gap-1': true, 'mb-5': !isPasswordError, 'mb-3': isPasswordError }">
                    <Label for="confimPassword">Confirm Password</Label>
                    <div class="relative">
                        <Input id="confimPassword" v-model="inputFormRegister.confirm_password"
                            :type="showConfirmPassword ? 'text' : 'password'" placeholder="your password"
                            :class="{ 'border border-red-500': isConfirmPasswordError || isPasswordMatchError || isPasswordSecurityError }" />
                        <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500">
                            <AiOutlineEye @click="toggleConfirmPassword" v-if="!showConfirmPassword"
                                :class="{ 'w-4 h-4 cursor-pointer': true, 'text-red-500': isConfirmPasswordError || isPasswordMatchError || isPasswordSecurityError }" />
                            <AiOutlineEyeInvisible @click="toggleConfirmPassword" v-else
                                :class="{ 'w-4 h-4 cursor-pointer': true, 'text-red-500': isConfirmPasswordError || isPasswordMatchError || isPasswordSecurityError }" />
                        </button>
                    </div>
                    <p v-if="isConfirmPasswordError" class="text-[10px] text-right me-3 text-[#C10007]">
                        {{ confirmPasswordErrorMessage }}
                    </p>
                    <p v-if="isPasswordSecurityError && !isConfirmPasswordError"
                        class="text-[10px] text-right me-3 text-[#C10007]">
                        {{ passwordSecurityErrorMessage }}
                    </p>
                    <p v-if="!isPasswordSecurityError && !isConfirmPasswordError && isPasswordMatchError"
                        class="text-[10px] text-right me-3 text-[#C10007]">
                        {{ passwordMatchErrorMessage }}
                    </p>
                </div>
                <Button type="submit" class="bg-blue-600 hover:bg-blue-700 cursor-pointer mb-3">Sign Up</Button>
                <div class="flex justify-between">
                    <p class="text-[12px] text-right">already have an account? <router-link to="/login"
                            class="text-blue-600 underline">sign
                            In</router-link>
                    </p>
                    <router-link to="/auth/login" class="text-blue-600 underline text-[12px]">forgot
                        password</router-link>
                </div>
                <div class="flex flex-row items-center justify-center w-[42%] mx-auto gap-5 mb-5 mt-5">
                    <Separator />
                    <p class="px-2">or</p>
                    <Separator />
                </div>
                <div class="flex flex-row gap-5 justify-center w-[95%] mx-auto">
                    <Button type="button"
                        class="bg-black hover:bg-black flex justify-center items-center w-1/2 cursor-pointer">
                        <img src="/icon-google.png" alt="" class="w-8">
                        <p>Sign Up With Google</p>
                    </Button>
                    <Button type="button"
                        class="bg-white hover:bg-white flex justify-center items-center w-1/2 border border-black cursor-pointer">
                        <img src="/icon-github.png" alt="" class="w-6">
                        <p class="text-black">Sign Up With Github</p>
                    </Button>
                </div>
            </form>
        </div>
    </section>
</template>
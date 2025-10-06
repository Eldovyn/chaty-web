<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
</script>

<template>
    <section class="login h-screen bg-[#f5f5f5] flex justify-center items-center">
        <div class="flex flex-col w-[30%] p-10 bg-white rounded-md text-black">
            <h1 class="text-3xl font-bold text-center">Welcome Back To Chaty</h1>
            <p class="text-sm text-center">Sign up to your account</p>
            <br>
            <br>
            <form action="" class="flex flex-col p-5 gap-5">
                <div class="input-email w-full flex flex-col gap-1">
                    <Label for="email">Email</Label>
                    <Input type="email" placeholder="your email" />
                </div>
                <div class="input-username w-full flex flex-col gap-1">
                    <Label for="username">Username</Label>
                    <Input type="usernme" placeholder="your usernme" />
                </div>
                <div class="input-password w-full flex flex-col gap-1">
                    <Label for="password">Password</Label>
                    <Input type="password" placeholder="your password" />
                </div>
                <div class="input-password w-full flex flex-col gap-1">
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input type="password" placeholder="your password" />
                </div>
                <Button type="submit" class="bg-blue-600 hover:bg-blue-700 cursor-pointer">Sign Up</Button>
                <div class="flex flex-row items-center justify-center w-[42%] mx-auto gap-5">
                    <Separator />
                    <p class="px-2">or</p>
                    <Separator />
                </div>
                <div class="flex flex-row gap-5 justify-center w-[95%] mx-auto">
                    <Button type="submit"
                        class="bg-black hover:bg-black flex justify-center items-center w-1/2 cursor-pointer">
                        <img src="/icon-google.png" alt="" class="w-8">
                        <p>Sign Up With Google</p>
                    </Button>
                    <Button type="submit"
                        class="bg-white hover:bg-white flex justify-center items-center w-1/2 border border-black cursor-pointer">
                        <img src="/icon-github.png" alt="" class="w-6">
                        <p class="text-black">Sign Up With Github</p>
                    </Button>
                </div>
            </form>
        </div>
    </section>
</template>
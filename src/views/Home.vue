<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
    <div class="flex flex-row-reverse gap-5 me-5">
        <Button type="submit" class="bg-blue-600 hover:bg-blue-700 cursor-pointer w-20">Sign In</Button>
        <Button type="submit" class="bg-blue-600 hover:bg-blue-700 cursor-pointer w-20">Sign Up</Button>
    </div>
    <div class="flex flex-col gap-5 items-center justify-center h-screen">
        <h1 class="text-3xl font-bold text-center">Welcome Back To Chaty</h1>
        <Textarea class="w-[60%]" placeholder="ask me anything" />
    </div>
</template>
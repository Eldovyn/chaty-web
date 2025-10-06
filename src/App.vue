<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useRoute } from 'vue-router'
import { ref } from "vue"

const isLogin = ref(false)

const route = useRoute()
</script>

<template>
  <SidebarProvider>
    <AppSidebar v-if="route.meta.sidebar && isLogin" />
    <main class="flex-1">
      <SidebarTrigger v-if="route.meta.sidebar && isLogin" />
      <RouterView />
    </main>
  </SidebarProvider>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <SidebarProvider>
    <AppSidebar v-if="route.meta.sidebar" />
    <main class="flex-1">
      <SidebarTrigger v-if="route.meta.sidebar" />
      <RouterView />
    </main>
  </SidebarProvider>
</template>

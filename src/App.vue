<template>
  <RouterView v-slot="{Component, route}">
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </RouterView>
  <GlobalDialog />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GlobalDialog from '@/components/common/GlobalDialog.vue'
</script>

<style lang="scss">
@use "@/styles/common/component.scss";
</style>

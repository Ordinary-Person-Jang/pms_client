<template>
  <RouterView v-slot="{Component, route}">
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style lang="scss">
@use "@/styles/common/component.scss";
</style>

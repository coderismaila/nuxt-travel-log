<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="hero bg-base-200 container mx-auto mt-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Travel Log
        </h1>
        <p class="py-6">
          Keep trak of your travels and adventures with this simple travel log app. Add locations, places and notes to create a digital journal of your journeys.
        </p>
        <AuthButton v-if="!authStore.user" />
      </div>
    </div>
  </div>
</template>

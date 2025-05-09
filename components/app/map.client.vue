<script lang="ts" setup>
import { CENTER_NIGERIA } from "~/lib/contants";

const colorMode = useColorMode();
const style = computed(() => colorMode.value === "dark"
  ? "/styles/dark.json"
  : "https://tiles.openfreemap.org/styles/liberty");
const zoom = 5;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_NIGERIA"
    :zoom="zoom"
  >
    <mgl-navigation-control />
  </MglMap>
</template>

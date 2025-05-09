<script lang="ts" setup>
import { CENTER_NIGERIA } from "~/lib/contants";

const colorMode = useColorMode();
const style = computed(() => colorMode.value === "dark"
  ? "/styles/dark.json"
  : "https://tiles.openfreemap.org/styles/liberty");
const zoom = 5;

const mapStore = useMapStore();

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_NIGERIA"
    :zoom="zoom"
  >
    <MglNavigationControl />
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div class="tooltip tooltip-top" :data-tip="point.label">
          <Icon
            name="tabler:map-pin-filled"
            size="24"
            class="text-secondary"
          />
        </div>
      </template>
    </MglMarker>
  </MglMap>
</template>

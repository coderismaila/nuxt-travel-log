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
        <div
          class="tooltip tooltip-top hover:cursor-pointer"
          :data-tip="point.name"
          :class="{ 'tooltip-open': mapStore.selectedPoint === point }"
          @mouseenter="mapStore.selectedPointWithoutFlyTo(point)"
          @mouseleave="mapStore.selectedPointWithoutFlyTo(null)"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="24"
            :class="mapStore.selectedPoint === point ? 'text-accent' : 'text-secondary'"
          />
        </div>
      </template>
      <MglPopup>
        <h3 class="text-2xl">
          {{ point.name }}
        </h3>
        <p v-if="point.description">
          {{ point.description }}
        </p>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>

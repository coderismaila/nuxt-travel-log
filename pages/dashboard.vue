<script lang="ts" setup>
const route = useRoute();
const isSidebarOpen = ref(true);
const sidebarStore = useSidebarStore();
const locationsStore = useLocationStore();

onMounted(() => {
  isSidebarOpen.value = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");
  if (route.path !== "/dashboard") {
    locationsStore.refresh();
  }
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen.value));
}
</script>

<template>
  <div class="flex-1 flex">
    <div
      class="bg-base-100 transition-all duration-300"
      :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="{ 'justify-end': isSidebarOpen, 'justify-center': !isSidebarOpen }"
        @click="toggleSidebar"
      >
        <Icon
          :name="isSidebarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'"
          size="32"
        />
      </div>
      <div class="flex flex-col">
        <SidebarButton
          href="/dashboard"
          :show-label="isSidebarOpen"
          label="Locations"
          icon="tabler:map"
        />

        <SidebarButton
          href="/dashboard/add"
          :show-label="isSidebarOpen"
          label="Add Location"
          icon="tabler:circle-plus-filled"
        />

        <div v-if="sidebarStore.loading || sidebarStore.sidebarItems.length" class="divider" />

        <ClientOnly>
          <div v-if="sidebarStore.loading" class="px-4">
            <div class="skeleton h-4 w-full" />
          </div>
        </ClientOnly>

        <div v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length" class="flex flex-col">
          <SidebarButton
            v-for="item in sidebarStore.sidebarItems"
            :key="item.id"
            :show-label="isSidebarOpen"
            :label="item.label"
            :icon="item.icon"
            :href="item.href"
          />
        </div>

        <div class="divider" />

        <SidebarButton
          href="/sign-out"
          :show-label="isSidebarOpen"
          label="Sign Out"
          icon="tabler:logout-2"
        />
      </div>
    </div>
    <div class="flex-1 flex flex-col overflow-auto bg-base-200">
      <NuxtPage />
      <AppMap class="flex-1" />
    </div>
  </div>
</template>

import type { MapPoint } from "~/lib/types";

export type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
  location?: MapPoint | null;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const loading = ref(false);
  const sidebarItems = ref<SidebarItem[]>([]);
  return {
    loading,
    sidebarItems,
  };
});

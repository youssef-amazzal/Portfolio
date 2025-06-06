import { ref, readonly } from 'vue'

export const useSidebar = () => {
  const isOpen = ref(false)

  const toggleSidebar = () => {
    isOpen.value = !isOpen.value
  }

  const openSidebar = () => {
    isOpen.value = true
  }

  const closeSidebar = () => {
    isOpen.value = false
  }

  // Close sidebar when clicking outside (for mobile)
  const handleOutsideClick = (event, sidebarRef) => {
    if (process.client && sidebarRef.value && !sidebarRef.value.contains(event.target)) {
      closeSidebar()
    }
  }

  return {
    isOpen: readonly(isOpen),
    toggleSidebar,
    openSidebar,
    closeSidebar,
    handleOutsideClick
  }
}

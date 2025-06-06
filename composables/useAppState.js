import { ref, readonly } from 'vue'

// Global app state
const globalState = {
  activeSection: ref('about'),
  isModalOpen: ref(false),
  selectedTestimonial: ref(null),
  isSidebarOpen: ref(false)
}

export const useAppState = () => {
  const setActiveSection = (section) => {
    globalState.activeSection.value = section
    // Scroll to top when changing sections
    if (process.client) {
      window.scrollTo(0, 0)
    }
  }

  const openModal = (testimonial) => {
    globalState.selectedTestimonial.value = testimonial
    globalState.isModalOpen.value = true
    
    // Prevent body scroll when modal is open
    if (process.client) {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeModal = () => {
    globalState.isModalOpen.value = false
    globalState.selectedTestimonial.value = null
    
    // Restore body scroll
    if (process.client) {
      document.body.style.overflow = ''
    }
  }

  const toggleSidebar = () => {
    globalState.isSidebarOpen.value = !globalState.isSidebarOpen.value
  }

  const isActiveSection = (section) => {
    return globalState.activeSection.value === section
  }

  return {
    // Readonly state
    activeSection: readonly(globalState.activeSection),
    isModalOpen: readonly(globalState.isModalOpen),
    selectedTestimonial: readonly(globalState.selectedTestimonial),
    isSidebarOpen: readonly(globalState.isSidebarOpen),
    
    // Actions
    setActiveSection,
    openModal,
    closeModal,
    toggleSidebar,
    isActiveSection
  }
}

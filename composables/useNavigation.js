import { ref, readonly } from 'vue'

export const useNavigation = () => {
  const activeSection = ref('about')

  const setActiveSection = (section) => {
    activeSection.value = section
    // Scroll to top when changing sections
    if (process.client) {
      window.scrollTo(0, 0)
    }
  }

  const isActiveSection = (section) => {
    return activeSection.value === section
  }

  return {
    activeSection: readonly(activeSection),
    setActiveSection,
    isActiveSection
  }
}

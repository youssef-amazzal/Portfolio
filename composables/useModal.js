import { ref, readonly } from 'vue'

export const useModal = () => {
  const isOpen = ref(false)
  const selectedItem = ref(null)

  const openModal = (item) => {
    selectedItem.value = item
    isOpen.value = true
    
    // Prevent body scroll when modal is open
    if (process.client) {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeModal = () => {
    isOpen.value = false
    selectedItem.value = null
    
    // Restore body scroll
    if (process.client) {
      document.body.style.overflow = ''
    }
  }

  const toggleModal = () => {
    if (isOpen.value) {
      closeModal()
    } else {
      openModal(selectedItem.value)
    }
  }

  return {
    isOpen: readonly(isOpen),
    selectedItem: readonly(selectedItem),
    openModal,
    closeModal,
    toggleModal
  }
}

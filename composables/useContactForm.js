import { ref, computed, reactive, readonly } from 'vue'

export const useContactForm = () => {
  const formData = reactive({
    name: '',
    email: '',
    message: ''
  })

  const isSubmitting = ref(false)
  const submitStatus = ref(null) // 'success', 'error', or null

  const isFormValid = computed(() => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.message.trim() !== '' &&
           isValidEmail(formData.email)
  })

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const resetForm = () => {
    formData.name = ''
    formData.email = ''
    formData.message = ''
    submitStatus.value = null
  }

  const submitForm = async () => {
    if (!isFormValid.value) return

    isSubmitting.value = true
    submitStatus.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate success
      submitStatus.value = 'success'
      resetForm()
    } catch (error) {
      submitStatus.value = 'error'
      console.error('Form submission error:', error)
    } finally {
      isSubmitting.value = false
    }
  }

  const clearStatus = () => {
    submitStatus.value = null
  }

  return {
    formData,
    isSubmitting: readonly(isSubmitting),
    submitStatus: readonly(submitStatus),
    isFormValid,
    submitForm,
    resetForm,
    clearStatus,
    isValidEmail
  }
}

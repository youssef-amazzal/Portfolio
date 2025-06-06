import { ref, computed, readonly } from 'vue'

export const usePortfolioFilter = (items = []) => {
  const selectedFilter = ref('all')
  const isSelectOpen = ref(false)
  const filteredItems = computed(() => {
    // Ensure items.value is an array before filtering
    const itemsArray = Array.isArray(items.value) ? items.value : []
    if (selectedFilter.value === 'all') {
      return itemsArray
    }
    return itemsArray.filter(item => item.category === selectedFilter.value)
  })

  const setFilter = (filter) => {
    selectedFilter.value = filter
    closeSelect()
  }

  const toggleSelect = () => {
    isSelectOpen.value = !isSelectOpen.value
  }

  const closeSelect = () => {
    isSelectOpen.value = false
  }

  const isActiveFilter = (filter) => {
    return selectedFilter.value === filter
  }  // Get unique categories from items
  const categories = computed(() => {
    // Ensure items.value exists and is an array before mapping
    if (!items.value || !Array.isArray(items.value) || items.value.length === 0) {
      return ['all']
    }
    const cats = new Set(items.value.map(item => item.category))
    return ['all', ...Array.from(cats)]
  })

  return {
    selectedFilter: readonly(selectedFilter),
    filteredItems,
    isSelectOpen: readonly(isSelectOpen),
    categories,
    setFilter,
    toggleSelect,
    closeSelect,
    isActiveFilter
  }
}

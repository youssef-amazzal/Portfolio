import { ref, onMounted } from 'vue'

/**
 * Composable for managing portfolio project data
 * Handles fetching, caching, and error states for portfolio projects
 */
export const usePortfolioData = () => {
    // Reactive state
    const projects = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    const lastFetchTime = ref(null)

    // Cache duration (5 minutes)
    const CACHE_DURATION = 5 * 60 * 1000

    /**
     * Fetch project data from JSON file
     * Includes caching logic to avoid unnecessary requests
     */
    const fetchProjects = async (forceRefresh = false) => {
        // Check if we need to fetch (no cache or cache expired or forced refresh)
        const now = Date.now()
        const shouldFetch = forceRefresh || 
            !lastFetchTime.value || 
            (now - lastFetchTime.value) > CACHE_DURATION ||
            projects.value.length === 0

        if (!shouldFetch) {
            return projects.value
        }        try {
            isLoading.value = true
            error.value = null

            // Use $fetch to call our API endpoint which works properly in both SSR and client-side
            const data = await $fetch('/api/projects')
            
            // Handle both array format and object format with projects property
            const projectData = Array.isArray(data) ? data : data.projects || []
              // Validate project data structure
            const validatedProjects = projectData.filter(project => {
                const hasRequiredFields = project.id && project.title && project.category && project.image
                if (!hasRequiredFields) {
                    console.warn('Invalid project data:', project)
                }
                
                // Normalize tools array to handle both string and object formats
                if (project.tools && Array.isArray(project.tools)) {
                    project.tools = project.tools.map(tool => {
                        if (typeof tool === 'string') {
                            return { name: tool, icon: null }
                        }
                        return tool
                    })
                }
                
                return hasRequiredFields
            })

            projects.value = validatedProjects
            lastFetchTime.value = now

            return projects.value        } catch (err) {
            error.value = err.message
            console.error('Error fetching projects:', err)
            
            // Don't clear existing projects on error (keep cache)
            if (projects.value.length === 0) {
                projects.value = []
            }
            
            // Don't re-throw error to prevent unhandled promise rejection
            return projects.value
        } finally {
            isLoading.value = false
        }
    }    /**
     * Refresh project data (force fetch)
     */
    const refreshProjects = () => {
        return fetchProjects(true)
    }    // Auto-fetch data when composable is first used
    if (projects.value.length === 0 && !isLoading.value) {
        fetchProjects().catch(err => {
            console.error('Auto-fetch failed:', err)
        })
    }

    /**
     * Get project by ID
     */
    const getProjectById = (id) => {
        return projects.value.find(project => project.id === id)
    }

    /**
     * Get projects by category
     */
    const getProjectsByCategory = (category) => {
        if (category === 'all') return projects.value
        return projects.value.filter(project => project.category === category)
    }

    /**
     * Get all unique categories
     */
    const getCategories = () => {
        const categories = ['all']
        const uniqueCategories = [...new Set(projects.value.map(project => project.category))]
        return categories.concat(uniqueCategories.sort())
    }

    return {
        // Reactive state
        projects,
        isLoading,
        error,
        lastFetchTime,

        // Methods
        fetchProjects,
        refreshProjects,
        getProjectById,
        getProjectsByCategory,
        getCategories
    }
}
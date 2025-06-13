export const useSocialActivities = () => {
    const activities = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchActivities = async () => {
        loading.value = true;
        error.value = null;
        
        try {
            const response = await fetch('/data/social-activities.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch social activities: ${response.status}`);
            }
            const data = await response.json();
            activities.value = data;
        } catch (err) {
            error.value = err.message;
            console.error('Error loading social activities:', err);
        } finally {
            loading.value = false;
        }
    };

    const getActivityById = (id) => {
        return activities.value.find(activity => activity.id === id);
    };

    const getActivitiesByCategory = (category) => {
        if (category === 'all') return activities.value;
        return activities.value.filter(activity => activity.category === category);
    };

    const getActivitiesByTag = (tag) => {
        return activities.value.filter(activity => 
            activity.tags && activity.tags.includes(tag)
        );
    };

    const getActivitiesByOrganization = (orgName) => {
        return activities.value.filter(activity => 
            activity.organizations && 
            activity.organizations.some(org => 
                org.name.toLowerCase().includes(orgName.toLowerCase())
            )
        );
    };

    const getAllTags = () => {
        const allTags = activities.value.reduce((tags, activity) => {
            if (activity.tags) {
                tags.push(...activity.tags);
            }
            return tags;
        }, []);
        return [...new Set(allTags)];
    };

    const getAllCategories = () => {
        const categories = activities.value.map(activity => activity.category);
        return [...new Set(categories)];
    };

    const getActivitiesByYear = (year) => {
        return activities.value.filter(activity => 
            activity.date && activity.date.includes(year.toString())
        );
    };

    return {
        activities: readonly(activities),
        loading: readonly(loading),
        error: readonly(error),
        fetchActivities,
        getActivityById,
        getActivitiesByCategory,
        getActivitiesByTag,
        getActivitiesByOrganization,
        getAllTags,
        getAllCategories,
        getActivitiesByYear
    };
};

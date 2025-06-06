<template>
    <div class="project-meta">
        <div class="meta-item">
            <h4 class="h4">Category</h4>
            <p>{{ getDisplayName(project.category) }}</p>
        </div>

        <div class="meta-item" v-if="project.date">
            <h4 class="h4">Date</h4>
            <p>{{ project.date }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})

// Create display-friendly filter names
const filterDisplayNames = {
    'development': 'Development',
    'design': 'Design'
}

const getDisplayName = (category) => {
    return filterDisplayNames[category] || category
}
</script>

<style scoped>
.project-meta {
    display: grid;
    gap: 20px;
}

.meta-item h4 {
    color: var(--primary-color);
    margin-bottom: 8px;
    font-size: var(--fs-7);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.meta-item p {
    color: var(--light-gray);
    font-size: var(--fs-6);
}
</style>

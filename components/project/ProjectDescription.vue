<template>
    <div class="project-description">
        <h3 class="h3">Project Overview</h3>
        <p>{{ project.description }}</p>
    </div>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.project-description h3 {
    margin-bottom: 15px;
    color: var(--white-2);
}

.project-description p {
    color: var(--light-gray);
    line-height: 1.6;
    font-size: var(--fs-6);
}
</style>
